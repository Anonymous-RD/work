import React from 'react'

function Loader() {
    return (
        <div className="flex justify-center items-center h-64">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"></div>
        </div>
    )
}

export default Loader;