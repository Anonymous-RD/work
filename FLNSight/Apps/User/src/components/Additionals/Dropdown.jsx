import React, { useEffect, useRef, useState } from 'react'

export default function Dropdown({elements,label,onSelect,placeholder}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

      useEffect(() => {
        if(onSelect) onSelect(selectedItem)
      }, [selectedItem])
      

  return (
     <div className="relative inline-block text-left" ref={dropdownRef}>
      <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <div>
        <button
          type="button"
          className="inline-flex justify-center items-center w-full rounded-md poppins px-4 py-2 bg-white text-sm text-fade focus:outline-none  "
          onClick={toggleDropdown}
        >
          <p className='max-sm:text-xs'>{selectedItem || placeholder }</p>
          <svg className="-mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 23" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
      </div>

      <div
        className={`origin-top-right z-[100] absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition duration-200 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ transformOrigin: 'top' }}
      >
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
         { elements?.map((element)=><a onClick={(e)=>{setSelectedItem(element);setIsOpen(false);}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">{element}</a>)}
          
        </div>
      </div>
    </div>
  )
}
