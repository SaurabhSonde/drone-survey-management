import React, { useContext } from 'react'

// Context
import DroneManagementContext from '../../store/DroneManagementProvider'

const SectionBar = () => {
    // Context
    const { activeTab, handleActiveTab } = useContext(DroneManagementContext)

    return (
        <div className="flex gap-[20px] justify-between bg-[#F4F4F5] p-[5px] rounded-[5px]">
            <button className={`${activeTab === 'Mission Planning' ? 'bg-white text-[#09090b]' : 'bg-transparent text-[#71717A]'} py-[6px] px-[12px] text-[14px] cursor-pointer w-full rounded-[2px]`} onClick={() => handleActiveTab('Mission Planning')}>Mission Planning</button>
            <button className={`${activeTab === 'Fleet Management' ? 'bg-white text-[#09090b]' : 'bg-transparent text-[#71717A]'} py-[6px] px-[12px] text-[14px] cursor-pointer w-full rounded-[2px]`} onClick={() => handleActiveTab('Fleet Management')}>Fleet Management</button>
            <button className={`${activeTab === 'Mission Monitoring' ? 'bg-white text-[#09090b]' : 'bg-transparent text-[#71717A]'} py-[6px] px-[12px] text-[14px] cursor-pointer w-full rounded-[2px]`} onClick={() => handleActiveTab('Mission Monitoring')}>Mission Monitoring</button>
        </div>
    )
}

export default SectionBar