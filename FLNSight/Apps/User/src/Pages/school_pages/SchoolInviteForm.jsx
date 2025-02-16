import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
// import { auth } from "../../firebase"; // Make sure Firebase is configured correctly
import toast from "react-hot-toast";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { auth } from "../../firebase";
import NotifyModal from "@/components/modals/NotifyModal";
import DynamicDrop from "@/components/ui/DynamicDrop";
import NoUserModal from "@/components/modals/NoUserModal";


function SchoolInviteForm() {
  const token = Cookies.get("token");
  const [formData, setFormData] = useState({
    schoolName: "",
    UDISECode: "",
    district:"",
    block: "",
    locality:"",
    user: "",
  });
  const [errors, setErrors] = useState({
    schoolName: "",
    UDISECode: "",
    district:"",
    block: "",
    locality:"",
    user: "",
    });
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  const [file, setFile] = useState(null);
  const [openDropdown,setOpenDropDown]=useState(false)
  const [loading, setLoading] = useState(false); // Loading state
  const roles=["Super Admin","State Admin","District Admin","Block Admin","School Admin","Mentors","Teachers","admin"]
  const [block,setBlock]=useState([])
  const [userMailExists,setUserMailExists]=useState(false)
  const [userExists,setUserExists]=useState(false)
    const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


const getAllZones = async () => {
  const {data}=await axios.get(
    "https://us-central1-firecmsdemo.cloudfunctions.net/settingdetails/block-zone",
    {
      headers: {
        Authorization: `Bearer ${token}`, // Token in Authorization header
      },
    })
    const names = data.reduce((acc, item) => {
      acc[item.name] = item._id; // Assuming `item.name` and `item.id` exist in each object
      return acc;
    }, {});
    console.log(names)
    setBlock(names); // Optional: To verify the extracted names
  }

      useEffect(() => {
        getAllZones()
      }, [])

      const getBlockById = async (id) => {
        const {data}=await axios.get(
          `https://us-central1-firecmsdemo.cloudfunctions.net/settingdetails/block-zone/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Token in Authorization header
            },
          })
          setFormData({...formData,district:data?.districtId?.name})
          console.log(formData.district)
 
        }

        useEffect(() => {
          getBlockById(block[formData.block])
          console.log(block[formData.block])
        }, [formData.block])
        
  
 
  
  const handleSingleInvite = async () => {
    console.log(formData);
  
    setLoading(true); // Start loading
  
    try {
      let firebaseUID;
  
      try {
        // Create user in Firebase
        const tempPassword = "Temp@12345"; // Temporary password
        const userCredential = await createUserWithEmailAndPassword(auth, formData.user, tempPassword);
        await sendPasswordResetEmail(auth, formData.user);
  
        // Retrieve UID from Firebase response
        firebaseUID = userCredential?.user?.uid;
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          console.log("User already exists in Firebase, checking sign-in methods...");
          const signInMethods = await fetchSignInMethodsForEmail(auth, formData.user);
  
          if (signInMethods.length > 0) {
            console.log("User exists, proceeding with API call...");
            const user = auth.currentUser; // Get the currently authenticated user
            firebaseUID = user?.uid; // Retrieve the UID from the authenticated user
          } else {
            throw new Error("User exists but no valid sign-in methods found.");
          }
        } else {
          throw error; // Re-throw other Firebase errors
        }
      }
  
      // Call API to send invitation
      const response = await axios.post(
        "https://us-central1-firecmsdemo.cloudfunctions.net/userinvitation/school/create",
        {
          schoolName: formData.schoolName,
          UDISECode: formData.UDISECode,
          Locality: formData.locality,
          BlockId: block[formData.block],
          email: formData.user,
          mobile: 1234567890,
          role: "School Admin",
          name: "testuser",
          firebaseUID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token in Authorization header
          },
        }
      );
      console.log(response)
      if(response.data.userStatus=="New user created successfully."){
        setUserExists(true)
      }else if(response.data.userStatus=="User already exists in the system."){
        setUserMailExists(true)
      }
      console.log("Single user created:", formData);
      toast.success(response.data.userStatus);
      // navigate("/schools");
    } catch (error) {
      console.log("Error inviting user:", error.message);
      if (error.code === "auth/email-already-in-use") {
        setUserMailExists(true)
        
        toast.error("Email already exists in Firebase, but invitation has been sent.");
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false); // End loading
    }
  };
  

  const handleBulkInvite = async () => {
    // if (!file) {
    //   alert("Please upload a CSV file.");
    //   return;
    // }
    // setLoading(true); // Start loading
  
    // const reader = new FileReader();
  
    // reader.onload = async (e) => {
    //   const text = e.target.result;
    //   const rows = text
    //     .split("\n")
    //     .map((row) => row.trim())
    //     .filter((row) => row !== "");
    //   const headers = rows[0]
    //     .split(",")
    //     .map((header) => header.trim().toLowerCase());
  
    //   const requiredFields = ["name", "email", "role"];
    //   const missingFields = requiredFields.filter(
    //     (field) => !headers.includes(field)
    //   );
  
    //   if (missingFields.length > 0) {
    //     alert(
    //       `The following required fields are missing: ${missingFields.join(", ")}`
    //     );
    //     setLoading(false); // End loading
    //     return;
    //   }
  
    //   const dataRows = rows
    //     .slice(1)
    //     .map((row) => {
    //       const columns = row
    //         .split(",")
    //         .map((col) => col.trim())
    //         .filter((col) => col !== "");
    //       if (columns.length !== headers.length) {
    //         console.error(
    //           `Row length mismatch. Expected ${headers.length} columns but got ${columns.length}`
    //         );
    //         return null;
    //       }
  
    //       return columns;
    //     })
    //     .filter((row) => row !== null);
  
    //   const users = dataRows.map((row) => {
    //     const user = {};
    //     row.forEach((col, index) => {
    //       user[headers[index]] = col;
    //     });
    //     return user;
    //   });
  
    //   console.log("Users to be invited:", users);
  
    //   const usersWithFirebaseUIDs = [];
  
    //   try {
    //     for (const user of users) {
    //       const { email, name, role } = user;
  
    //       if (!email || !name || !role) {
    //         console.error("Invalid user data:", user);
    //         continue;
    //       }
  
    //       // Create user in Firebase
    //       const tempPassword = "Temp@12345"; // Temporary password
    //       const userCredential = await createUserWithEmailAndPassword(auth, email, tempPassword);
  
    //       // Get Firebase UID
    //       const firebaseUID = userCredential.user.uid;
  
    //       // Send password reset email
    //       await sendPasswordResetEmail(auth, email);
  
    //       // Add Firebase UID to user data
    //       usersWithFirebaseUIDs.push({ ...user, firebaseUID });
  
    //       console.log("Bulk user created in Firebase:", user);
    //     }
  
    //     // Send bulk user data with Firebase UIDs to backend API
    //     await axios.post(
    //       "https://us-central1-firecmsdemo.cloudfunctions.net/userinvitation/bulkinvite",
    //       usersWithFirebaseUIDs
    //     );
  
    //     alert("All invitations sent successfully!");
    //   } catch (error) {
    //     console.error("Error inviting bulk users:", error.message);
    //     alert(`Failed to invite bulk users: ${error.message}`);
    //   } finally {
    //     setLoading(false); // End loading
    //   }
    // };
  
    // reader.onerror = (error) => {
    //   console.error("Error reading file:", error);
    //   alert("There was an error reading the file.");
    //   setLoading(false); // End loading
    // };
  
    // reader.readAsText(file);
  };
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current && !buttonRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
        setOpenDropDown(false);
     
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const validateForm = () => {
    let formErrors = { ...errors };
    let isValid = true;
  
    // Validate name (no spaces or special characters)
    if (!formData.name) {
      formErrors.name = "Name is required";
      isValid = false;
    } else if (/\s/.test(formData.name)) {
      formErrors.name = "Name cannot contain spaces";
      isValid = false;
    }else if (/[^a-zA-Z ]/.test(formData.name)) {
      formErrors.name = "Name cannot contain numbers or special characters";
      isValid = false;
    } else {
      formErrors.name = "";
    }
  
    // Validate email
    if (!formData.email) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      formErrors.email = "Email is not valid";
      isValid = false;
    } else {
      formErrors.email = "";
    }
  
    // Validate mobile number
    if (!formData.mobile) {
      formErrors.mobile = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      formErrors.mobile = "Phone number must be 10 digits";
      isValid = false;
    } else {
      formErrors.mobile = "";
    }
  
    // Validate role
    if (!formData.role) {
      formErrors.role = "Role is required";
      isValid = false;
    } else {
      formErrors.role = "";
    }
  
    setErrors(formErrors);
    return isValid;
  };
  

  return (
    <div className="kumbhsans">
      {/* <DeleteModal/>
      <NoUserModal/>
      <NotifyModal/> */}
    {userMailExists && <NotifyModal open={userMailExists} setOpen={setUserMailExists}  name={formData.user.split("@")[0].trim()} email={formData.user}/>}
   {userExists && <NoUserModal open={userExists} setOpen={setUserExists}/>}
      <div className="flex items-center gap-2.5 pt-5 pb-3  border-neutral-100 border-t">
        <h1 className="text-sm font-medium text-gray-800">Bulk Invite</h1>
        <div
          className={`flex items-center justify-center w-16 h-8 rounded-full cursor-pointer transition-colors duration-300 ${
            toggle ? "bg-[#C8EE48]" : "bg-[#EFEFEF]"
          }`}
          onClick={() => setToggle(!toggle)}
        >
          <div
            className={`w-6 h-6  rounded-full shadow-md transform transition-transform duration-300 ${
              toggle ? "translate-x-4 bg-white " : "-translate-x-4 bg-[#DBDBDB]"
            }`}
          />
        </div>
      </div>

      {!toggle ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if(validateForm()) handleSingleInvite();
          }}
          className="flex flex-col"
        >
          <header className="w-full min-h-0 bg-neutral-100  max-md:max-w-full " />
          <section className="flex  flex-col min-h-[252px] max-md:max-w-full">
          
            <div className="flex flex-wrap gap-5 items-start w-full text-sm flex-col font-medium max-md:max-w-full">
             <div className="flex w-full gap-10">
                <div className="flex flex-col grow shrink justify-center min-w-[240px] max-w-[398px] ">
                  <label className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap tracking-widess">
                    School Name
                  </label>
                  <input
                    type="text"
                    name="schoolName"
                    placeholder="Enter School Name"
                    value={formData.schoolName}
                    onChange={handleChange}
                    className="gap-6 focus:outline-none focus:border-zinc-600 !py-3 px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                    aria-label="Enter Invitee Name"
                  />
                  {errors.schoolName && <p className="text-red-500 text-xs mt-1">{errors.schoolName}</p>}
                </div>
                <div className="flex flex-col grow shrink justify-center min-w-[240px] max-w-[398px]">
                  <label className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap">
                  UDISE/AWC Code
                  </label>
                  <input
                    type="number"
                    name="UDISECode"
                    placeholder="Enter UDISE/AWC Code"
                    value={formData.UDISECode}
                    onChange={handleChange} 
                    className="gap-6 focus:outline-none focus:border-zinc-600 !py-3 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                    aria-label="Select Invitee Role"
                  />
                  {errors.UDISECode && <p className="text-red-500 text-xs mt-1">{errors.UDISECode}</p>}
                </div>
             </div>
              
             <div className="flex w-full gap-10">
                <div className="flex flex-col grow shrink justify-center min-w-[240px] max-w-[398px]">
                  <label className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap">
                  District
                  </label>
                  <div >
                  <input
                    type="text"
                    name="district"
                    placeholder="Select District"
                    disabled
                    value={formData.district}
                    onChange={handleChange}
                    className="gap-6 focus:outline-none focus:border-zinc-600 !py-3 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                    aria-label="Select Invitee Role"
                  />
                              
                                {/* {openDropdown && <div ref={dropdownRef} className={` flex flex-col rounded-xl bg-white absolute top-14 text-start left-0 text-xs box-shadow transition-all duration-500 delay-100 w-full z-[100]`}>
                                  {roles.map((item,index)=><button onClick={()=>setFormData({...formData,role:item})} className={`${index !== roles.length - 1 ? 'border-b' : ''} p-2 w-full text-start`} >{item}</button>)}
                                  
                                </div>} */}
                                    {/* <select
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    className="w-full mt-0 px-4 py-3 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600  text-sm text-[#78778B]  font-medium "
                                  >
                                    {roles.map((type) => (
                                      <option value={type}>
                                        {type}
                                      </option>
                                    ))}
                                  </select> */}
                              </div>
                              {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                  
                </div>
                <div className="flex flex-col grow shrink justify-center min-w-[240px] max-w-[398px]">
                  <label className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap">
                    Block
                  </label>
                  <div >
                            
                              
                                {/* {openDropdown && <div ref={dropdownRef} className={` flex flex-col rounded-xl bg-white absolute top-14 text-start left-0 text-xs box-shadow transition-all duration-500 delay-100 w-full z-[100]`}>
                                  {roles.map((item,index)=><button onClick={()=>setFormData({...formData,role:item})} className={`${index !== roles.length - 1 ? 'border-b' : ''} p-2 w-full text-start`} >{item}</button>)}
                                  
                                </div>} */}
                                    <select
                                    name="block"
                                    value={formData.block}
                                    onChange={handleChange}
                                    className="w-full mt-0 px-4 py-3 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600  text-sm text-[#78778B]  font-medium "
                                  >
                                    {Object.keys(block).map((type) => (
                                      <option value={type}>
                                        {type}
                                      </option>
                                    ))}
                                  </select>
                              </div>
                              {errors.block && <p className="text-red-500 text-xs mt-1">{errors.block}</p>}
                  
                </div>
                
                
                
             </div>
             <div className="flex w-full gap-10">
                <div className="flex flex-col grow shrink justify-center min-w-[240px] max-w-[398px] ">
                  <label className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap tracking-widess">
                  Locality
                  </label>
                  <input
                    type="text"
                    name="locality"
                    placeholder="Enter Locality"
                    value={formData.locality}
                    onChange={handleChange}
                    className="gap-6 focus:outline-none focus:border-zinc-600 !py-3 px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                    aria-label="Enter Invitee Name"
                  />
                  {errors.locality && <p className="text-red-500 text-xs mt-1">{errors.locality}</p>}
                </div>
                <div className="flex flex-col grow shrink justify-center min-w-[240px] max-w-[398px]">
                  <label className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap">
                  School/AWC Admin
                  </label>
                  {/* <input
                    type="text"
                    name="user"
                    placeholder="Enter User Email"
                    value={formData.user}
                    onChange={handleChange}
                    className="gap-6 !py-3 focus:outline-none focus:border-zinc-600 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                    aria-label="Enter Invitee Email"
                  /> */}
                  <DynamicDrop url={"https://us-central1-firecmsdemo.cloudfunctions.net/userdetails/search?query="} setData={(i)=>setFormData({...formData,user:i})}/>
                  {errors.user && <p className="text-red-500 text-xs mt-1">{errors.user}</p>}
                </div>
             </div>
            </div>
            
          </section>
          <div className=" w-full border border-solid bg-neutral-100 border-neutral-100 min-h-[1px] max-md:max-w-full" />
          <button
            type="submit"
            className="gap-2.5 hover:bg-orange-300 self-stretch p-1 py-3 mt-8 max-w-full font-[600] leading-loose text-black whitespace-nowrap bg-[#C8EE44] rounded-xl w-[126px]"
            disabled={loading}
            onClick={handleSingleInvite}
          >
            {loading ? "Sending..." : "Invite"}
          </button>
        </form>
      ) : (
        <main className="flex flex-col rounded-none ">
          <header className="w-full min-h-0 border border-solid bg-neutral-100 border-neutral-100 max-md:max-w-full" />
          <section className="flex overflow-hidden flex-col mt-5 w-full min-h-[159px] max-md:max-w-full">
           
         <div className="flex flex-col items-center gap-2 text-sm">
            {svgs.upload}
            <h3 className="text-center font-semibold">Please upload csv file to<br/>import data in bulk</h3>
            
                    <div className="flex flex-col items-center space-x-4">
            <label className="relative cursor-pointer bg-[#C8EE44] text-black rounded-xl px-12 text-sm py-3 font-semibold hover:bg-orange-300 ">
              Browse File
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <span className="text-gray-500 text-sm mt-1 pr-3">No file selected</span>
          </div>
          <button className="underline font-semibold mt-10">Click here to download sample csv file</button>
         </div>
            
          </section>
          <div className="mt-8 w-full border border-solid bg-neutral-100 border-neutral-100 min-h-[1px] max-md:max-w-full" />
          <button
            type="button"
            onClick={handleBulkInvite}
            className="gap-2.5 self-stretch p-1 mt-8 max-w-full text-base font-semibold leading-loose text-black whitespace-nowrap bg-[#C8EE44] rounded-xl w-[126px] hover:bg-orange-300"
            disabled={loading}
          >
            {loading ? "Adding..." : "Invite"}
          </button>


        
        </main>
      )}
    </div>
  );
}

export default SchoolInviteForm;

const svgs={
  upload:<svg width="50" height="41" viewBox="0 0 50 41" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.0675 18.0675C5.515 19.5975 4.75 21.4425 4.75 23.625C4.75 25.8075 5.515 27.6525 7.0675 29.25C8.5975 30.735 10.4425 31.5 12.625 31.5H27.4525C27.34 32.2425 27.25 32.985 27.25 33.75C27.25 34.515 27.34 35.2575 27.4525 36H12.625C9.25 36 6.3025 34.875 3.8725 32.4675C1.465 30.105 0.25 27.2025 0.25 23.805C0.25 20.88 1.1275 18.27 2.8825 15.975C4.6375 13.68 7 12.2175 9.8125 11.5875C10.7575 8.145 12.625 5.355 15.4375 3.2175C18.25 1.08 21.445 0 25 0C29.3875 0 33.1 1.53 36.16 4.59C39.22 7.65 40.75 11.3625 40.75 15.75C43.3375 16.0425 45.475 17.1675 47.185 19.125C48.3325 20.4075 49.075 21.8475 49.435 23.445C47.095 21.465 44.125 20.25 40.75 20.25C40.5025 20.25 40.2775 20.25 40.03 20.25C39.895 20.25 39.76 20.25 39.625 20.25H36.25V15.75C36.25 12.645 35.125 9.99 32.965 7.785C30.76 5.625 28.105 4.5 25 4.5C21.895 4.5 19.24 5.625 17.035 7.785C14.875 9.99 13.75 12.645 13.75 15.75H12.625C10.4425 15.75 8.5975 16.515 7.0675 18.0675ZM34 31.5H38.5V40.5H43V31.5H47.5L40.75 24.75L34 31.5Z" fill="black"/>
  </svg>
  
}