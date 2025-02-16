import React, { useEffect, useRef, useState } from "react";

import { FiSearch } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";
import { IoFilter } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { fetchAllUsers, resetUsers,setSelectedUser } from "@/redux/slices/fetchAllUsersSlice";
import { deleteUser } from "@/redux/slices/userDeleteSlice";
import DeleteModal from "@/components/modals/DeleteModal";
import toast from "react-hot-toast";
import { fetchAllSchools, resetSchools, setSelectedSchool } from "@/redux/schoolSlices/fetchAllSchoolsSlice";
import { deleteSchool } from "@/redux/schoolSlices/schoolDeleteSlice";

const SchoolUsers = () => {
  const token = Cookies.get("token"); // Retrieve the token from cookies
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(""); // Unified filter state
  const [openFilter,setOpenFilter]=useState(false)
  const [openDelete,setOpenDelete]=useState(false)
  const [selectedUserID,setSelectedUserID]=useState()
  const dispatch = useDispatch();
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const { schools, loading, error } = useSelector((state) => state.fetchSchools);
  const {status} = useSelector(
    (state) => state.deleteSchool
  );
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current && !buttonRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
        setOpenFilter(false);
        setSelectedUserID()
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
   

    if (token) {
      const {data}=dispatch(fetchAllSchools(token)); // Dispatch to fetch all users
      console.log(data)
    
    }
    console.log(status)
    // Cleanup function: reset users when component unmounts
    return () => {
      dispatch(resetSchools());
    };
    
  }, [dispatch,status]);
  // Filter and Search Logic
 
  const navigate = useNavigate();
  function inviteHandler() {
    navigate("/schools/invite");
  }


  const handleDelete = async (_id) => {
    console.log("deleting user")
    try {
      const response = await dispatch(deleteSchool({ id:_id, token }));
      if (response.status==200){
        toast.success("School Deleted Successfully");
        await dispatch(fetchAllSchools(token));
      }
      
    } catch (err) {
      toast.error(err || "Failed to delete user");
    }
    setOpenDelete(false)
    console.log(_id,"here we gooo")
  };



  return (
    <div className="flex flex-col min-h-screen kumbhsans pb-20">
      {/* Search and Filters Section */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#F5F5F5] pr-7">
        {/* Search Input */}
        <div className="relative w-full sm:w-1/3 ml-2">
          
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#363A3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21.0004 21L16.6504 16.65" stroke="#363A3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

          <input
            type="text"
            placeholder="Search Users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-sm sm:w-[209px] bg-[#F8F8F8] sm:h-[50px] rounded-2xl pl-12 pr-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-500 transition duration-300 ease-in-out"
          />
        </div>

        {/* Unified Filter Dropdown */}
        <div className="flex gap-5 items-center ">
          {/* Invite User Button */}
          <button
          
            className="text-nowrap  flex items-center gap-1 bg-[#C8EE44] text-[#1B212D] font-semibold rounded-[10px] hover:bg-orange-300 px-4 py-6 w-[110px] h-[20px] sm:w-[138px] sm:h-[42px] text-[14px]"
            onClick={inviteHandler}
          >
            <svg width="14" height="14" className="mr-2 mb-[1px]" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="black"/>
</svg>
Add School
          </button>
          
          
        </div>
      </div>

      {/* Users Table */}
     <div className="overflow-x-auto h-[75vh] pb-20">
        <table className="table-auto w-full bg-white rounded-md border-collapse">
    <thead className="sticky top-0 bg-white z-10">
      <tr className="text-left text-sm text-[#929EAE] uppercase">
        <th className="font-[600] text-[12px] px-4 py-4">Sl No.</th>
        <th className="font-[600] text-[12px] px-4 py-2">School Name</th>
        <th className="font-[600] text-[12px] px-4 py-2">Block & District</th>
        <th className="font-[600] text-[12px] px-4 py-2">UDISE Code</th>
        <th className="font-[600] text-[12px] px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {schools?.length > 0 ? (
        schools.map((user,index) => (
          <tr key={user.id} className="border-b border-[#F5F5F5] last:border-b-0 text-sm">
            <td className="px-4 py-7 font-[500] text-[#78778B]">{index+1}</td>
            <td className="px-4 py-2 text-[#1B212D] font-[500]">{user.schoolName}</td>
            <td className="px-4 py-2 text-[#78778B] font-[500]">{user?.BlockId?.name}</td>
            
            
            <td className="px-4 py-2 text-[#78778B] font-[500]">{user.UDISECode}</td>
            <td className="px-4 py-2 text-right flex items-center mt-4">
              <button ref={buttonRef} className="hover:text-gray-800 px-5 relative" onClick={() =>
        setSelectedUserID(user._id)
      }>
              <svg width="5" height="20" viewBox="0 0 5 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5444 2.1941C4.5444 3.4053 3.52736 4.38822 2.2722 4.38822C1.01704 4.38822 0 3.4053 0 2.1941C0 0.981998 1.01704 -7.62939e-06 2.2722 -7.62939e-06C3.52736 -7.62939e-06 4.5444 0.981998 4.5444 2.1941ZM4.5444 9.96499C4.5444 11.1689 3.52736 12.1446 2.2722 12.1446C1.01704 12.1446 0 11.1689 0 9.96499C0 8.76104 1.01704 7.78538 2.2722 7.78538C3.52736 7.78538 4.5444 8.76104 4.5444 9.96499ZM4.5444 17.7359C4.5444 18.948 3.52736 19.93 2.2722 19.93C1.01704 19.93 0 18.948 0 17.7359C0 16.5247 1.01704 15.5418 2.2722 15.5418C3.52736 15.5418 4.5444 16.5247 4.5444 17.7359Z" fill="#A2A2A8"/></svg>
                {user._id==selectedUserID && <div ref={dropdownRef} className={`${user._id==selectedUserID?"opacity-100":"opacity-0"} rounded-xl bg-white absolute right-7 text-start w-[100px] text-xs box-shadow transition-all duration-500 delay-100 `}>
                  <div className="border-b p-2 border-[#F5F5F5]" onClick={()=>{navigate('/schools/edit');dispatch(setSelectedSchool({_id:user?._id,schoolName:user?.schoolName,email:user?.User?.email,locality:user?.Locality,block:user?.BlockId?.name,UDISECode:user?.UDISECode,district:user?.BlockId?.districtId}))}}>Edit</div>
                  <div className="p-2" onClick={()=>setOpenDelete(true)}>Deactivate
                      <DeleteModal name={user.name} open={openDelete} setOpen={setOpenDelete} onConfirm={()=>handleDelete(selectedUserID)}/>
                  </div>
                </div>}
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="6"
            className="px-4 py-2 text-center text-gray-600 italic"
          >
           {!loading && "No users found"}
           {loading && <div className="loader"></div>}
          </td>
        </tr>
      )}
    </tbody>
  </table>
     </div>

    </div>
  );
};

export default SchoolUsers;
