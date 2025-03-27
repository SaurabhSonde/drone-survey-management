import React from 'react'
import OrganizationDropdown from './OrganizationDropdown'

const Navbar = () => {
    return (
        <div className="flex justify-between items-center w-full bg-white p-[20px] border-b-[#dcdcdc] border-[0.5px]">
            <h1 className='text-[20px] font-medium'>Dashboard</h1>

            <div className="flex justify-center items-center gap-[20px]">
                <div className="flex justify-center items-center gap-[10px]">
                    <span className='text-[14px]'>Select Organization:</span>
                    <OrganizationDropdown />
                </div>
            </div>
        </div>
    )
}

export default Navbar