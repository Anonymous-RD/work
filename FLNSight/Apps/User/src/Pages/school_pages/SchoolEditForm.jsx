import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase"; // Make sure Firebase is configured correctly
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateUser } from "@/redux/slices/updateUserSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { setSelectedSchool } from "@/redux/schoolSlices/fetchAllSchoolsSlice";
import { updateSchool } from "@/redux/schoolSlices/updateSchoolSlice";

function SchoolEditForm() {
  const token = Cookies.get("token");
  const navigate = useNavigate();
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

  const roles = ["Super Admin", "State Admin", "District Admin", "Block Admin", "School Admin", "Mentors", "Teachers", "admin"];
  const dispatch = useDispatch();
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const [openDropdown, setOpenDropDown] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [file, setFile] = useState(null);
  const { selectedSchool } = useSelector((state) => state.fetchSchools);
  const { loading, successMessage, error } = useSelector(
    (state) => state.updateUser
  );

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
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (setSelectedSchool) setFormData({
      _id: selectedSchool?._id,
      schoolName: selectedSchool?.schoolName,
      block: selectedSchool?.block,
      district: selectedSchool?.district,
      locality: selectedSchool?.locality,  
      user: selectedSchool?.email,
      UDISECode: selectedSchool?.UDISECode,
    });
    console.log(selectedSchool)
  }, [setSelectedSchool]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    console.log(formData._id)
    
      const response = await dispatch(updateSchool({ id: formData._id, userData: { Locality: formData.locality, schoolName: formData.schoolName }, token }));
      if (response.payload === 200) {
        toast.success("User updated successfully");
        navigate("/schools");
      } else {
        toast.error("Failed to update user");
      }
    
  };

  return (
    <div className="kumbhsans">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <header className="w-full min-h-0 bg-neutral-100  max-md:max-w-full " />
        <section className="flex flex-col min-h-[252px] max-md:max-w-full">
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
                    disabled
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
                            
                              
                                {/* {openDropdown && <div ref={dropdownRef} className={` flex flex-col rounded-xl bg-white absolute top-14 text-start left-0 text-xs box-shadow transition-all duration-500 delay-100 w-full z-[100]`}>
                                  {roles.map((item,index)=><button onClick={()=>setFormData({...formData,role:item})} className={`${index !== roles.length - 1 ? 'border-b' : ''} p-2 w-full text-start`} >{item}</button>)}
                                  
                                </div>} */}
                                    <input
                    type="text"
                    disabled
                    name="district"
                    placeholder="Enter District"
                    value={formData.district}
                    onChange={handleChange}
                    className="gap-6 focus:outline-none focus:border-zinc-600 !py-3 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                    aria-label="Select Invitee Role"
                  />
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
                                    <input
                    type="text"
                    disabled
                    name="block"
                    placeholder="Enter Block"
                    value={formData.block}
                    onChange={handleChange}
                    className="gap-6 focus:outline-none focus:border-zinc-600 !py-3 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                    aria-label="Select Invitee Role"
                  />
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
                  User
                  </label>
                  <input
                    type="text"
                    name="user"
                    disabled
                    placeholder="Enter User Email"
                    value={formData.user}
                    onChange={handleChange}
                    className="gap-6 !py-3 focus:outline-none focus:border-zinc-600 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                    aria-label="Enter Invitee Email"
                  />
                  {errors.user && <p className="text-red-500 text-xs mt-1">{errors.user}</p>}
                </div>
             </div>
            </div>
        </section>
        <div className=" w-full border border-solid bg-neutral-100 border-neutral-100 min-h-[1px] max-md:max-w-full" />
        <button
          type="submit"
          className="gap-2.5 self-stretch p-1 py-3 mt-8 max-w-full font-[600] leading-loose text-black whitespace-nowrap bg-[#C8EE44] rounded-xl w-[126px] hover:bg-orange-300"
        >
          {loading ? "Saving...." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default SchoolEditForm;
