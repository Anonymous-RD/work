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

function EditForm() {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    role: "admin",
    mobile: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    role: ""
  });

  const roles = ["Super Admin", "State Admin", "District Admin", "Block Admin", "School Admin", "Mentors", "Teachers", "admin"];
  const dispatch = useDispatch();
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const [openDropdown, setOpenDropDown] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [file, setFile] = useState(null);
  const { selectedUser } = useSelector((state) => state.allUsers);
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
    if (selectedUser) setFormData({
      name: selectedUser.name,
      email: selectedUser.email,
      role: selectedUser.role,
      mobile: selectedUser.mobile,
      _id: selectedUser._id
    });
  }, [selectedUser]);

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

    if (validateForm()) {
      const response = await dispatch(updateUser({ id: formData._id, userData: { name: formData.name, mobile: formData.mobile, role: formData.role }, token }));
      if (response.payload === 200) {
        toast.success("User updated successfully");
        navigate("/users");
      } else {
        toast.error("Failed to update user");
      }
    } else {
      toast.error("Invalid input data");
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
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Invitee Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="gap-6 focus:outline-none focus:border-zinc-600 !py-3 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                  aria-label="Enter Invitee Name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="flex flex-col grow shrink justify-center min-w-[240px] max-w-[398px]">
                <label className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap">
                  Email
                </label>
                <input
                  disabled
                  type="email"
                  name="email"
                  placeholder="Enter Invitee Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="gap-6 focus:outline-none focus:border-zinc-600 !py-3 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                  aria-label="Enter Invitee Email"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="flex w-full gap-10">
              <div className="flex flex-col grow shrink justify-center min-w-[240px] max-w-[398px]">
                <label className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap">
                  Role
                </label>
                <div >
                  
                 
                  {/* {openDropdown && <div ref={dropdownRef} className={` flex flex-col  rounded-xl bg-white absolute top-14 text-start left-0 text-xs box-shadow transition-all duration-500 delay-100 w-full z-[100]`}>
                    {roles.map((item, index) => <button onClick={() => setFormData({ ...formData, role: item })} className={`${index !== roles.length - 1 ? 'border-b' : ''} p-2 w-full text-start`} >{item}</button>)}
                  </div>} */}
                   <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full mt-0 px-4 py-3 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600  text-sm text-[#78778B]  font-medium "
                  >
                    {roles.map((type) => (
                      <option value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                </div>
                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
              </div>
              <div className="flex flex-col grow shrink justify-center min-w-[240px] max-w-[398px]">
                <label className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap">
                  Phone
                </label>
                <input
                  type="number"
                  name="mobile"
                  placeholder="Enter Invitee Phone Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="gap-6 focus:outline-none focus:border-zinc-600 !py-3 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                  aria-label="Select Invitee Role"
                />
                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
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

export default EditForm;
