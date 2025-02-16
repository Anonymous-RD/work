import React, { useEffect, useState } from 'react'
import Dropdown from '../Additionals/Dropdown'
import Input from '../Additionals/Input'
import { FaCross } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

const initialData={
    username:'',
    email:'',
    phone:"",
    role:'',
    status:''
}
export default function Filters({query,setOpen}) {
    const [data,setdata] = useState(initialData)
    const onApply=()=>{
        query(data)
    }
    
    useEffect(() => {
        console.log(data)
        onApply(data)
    }, [data])
   
  return (
    <div className=' flex bg-slate-100 py-7 px-3 gap-4 w-full rounded-xl items-center flex-wrap relative'>
         <IoClose size={23} className='text-black mt-3 cursor-pointer absolute right-2 top-2' onClick={()=>setOpen(false)}/>
        <Input value={data.username} onChange={(item)=>setdata({...data,username:item})} type="text" label="Username" placeholder="Search Username"/>
        <Input value={data.email} onChange={(item)=>setdata({...data,email:item})} type="text" label="Email" placeholder="Search Email"/>
        <Input value={data.phone} onChange={(item)=>setdata({...data,phone:item})} type="number" label="Phone No." placeholder="Search Phone No."/>
      <Dropdown value={data.role} label="Role"  placeholder="select role" onSelect={(item)=>setdata({...data,role:item})} elements={["Super Admin","State Admin","District Admin","Block Admin","School Admin","Mentors","Teachers","admin"]} />
   
          <Dropdown value={data.status} label="Status of approval" placeholder="select status" onSelect={(item)=>setdata({...data,status:item})} elements={["All","Accepted","Pending"]}/>

   <div className='flex gap-2 items-center'>
          <button className='border px-4 rounded-xl py-2 text-sm mt-3 bg-[#C8EE44]'>Apply</button>
          <button className='border px-4 rounded-xl py-2 text-sm mt-3' onClick={()=>setdata(initialData)}>Clear</button>
   </div>
    </div>
  )
}
