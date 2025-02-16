import React, { useEffect, useState } from 'react'

export default function Input({placeholder,label,type,onChange,value}) {
    const [data,setdata]=useState('')
    useEffect(() => {
        if(onChange) onChange(data)
    }, [data])
    useEffect(() => {
        if(onChange) onChange(value)
    }, [value])
    
  return (
    <div className=''>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input type={type} value={value} onChange={(e)=>setdata(e.target.value)} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
  )
}
