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
// import { updateUser } from "@/redux/slices/updateUserSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { usePageMetadata } from "@/context/PageMetadataContext";
import { LuArrowLeft } from "react-icons/lu";

function AddSection() {
  const token = Cookies.get("token");
  // const navigate = useNavigate();
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
//   const { selectedUser } = useSelector((state) => state.allUsers);
//   const { loading, successMessage, error } = useSelector(
//     (state) => state.updateUser
//   );

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

//   useEffect(() => {
//     if (selectedUser) setFormData({
//       name: selectedUser.name,
//       email: selectedUser.email,
//       role: selectedUser.role,
//       mobile: selectedUser.mobile,
//       _id: selectedUser._id
//     });
//   }, [selectedUser]);

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
        navigate("/admin/users");
      } else {
        toast.error("Failed to update user");
      }
    } else {
      toast.error("Invalid input data");
    }
  };

  const { setMetadata } = usePageMetadata();
  
  useEffect(() => {
      setMetadata({
        title: "Add Section",
        backPath: "/Settings",
      });
    }, [setMetadata]);

  return (
    <div className="mt-5 ml-4 bg-white border-t border-solid border-neutral-100 ]">
    <div className="mt-5 grid grid-cols-6 gap-10">
      <div className="col-span-2">
        <label className="gap-2.5 pr-2.5 w-full text-black font-medium whitespace-nowrap tracking-widess">
          Section Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Enter Section Name"
          value={formData.name}
          onChange={handleChange}
          className="gap-6 self-stretch mt-2 px-6 py-3.5 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
          aria-label="Enter Sectio
                 n Name"
        />
      </div>

      <div className="col-span-2">
        <label className="gap-2.5 pr-2.5 w-full  text-black font-medium whitespace-nowrap tracking-widess">
          Class
        </label>
        <input
          type="text"
          name="name"
          placeholder="Select Class"
          value={formData.name}
          onChange={handleChange}
          className="gap-6 self-stretch mt-2 px-6 py-3.5 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
          aria-label="Select Class"
        />
      </div>

      <div className="col-span-2 row-start-2">
        <label className="gap-2.5  pr-2.5 w-full text-black font-medium whitespace-nowrap ">
          Section Code
        </label>
        <input
          type="text"
          name="name"
          placeholder="Enter Section Code"
          value={formData.name}
          onChange={handleChange}
          className="gap-6 self-stretch mt-2 px-6 py-3.5 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
          aria-label="Enter Section Code"
        />
      </div>
    </div>

    <div className=" w-full mt-8 border border-solid bg-neutral-100 border-neutral-100 min-h-[1px] max-md:max-w-full" />
    <button
      type="submit"
      className="gap-2.5 self-stretch p-1 py-3 mt-8 max-w-full font-[600] leading-loose text-black whitespace-nowrap bg-[#C8EE44] rounded-xl w-[210px] hover:bg-lime-500"
    >
      Add
    </button>
  </div>
  );
}

export default AddSection;