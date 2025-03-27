import React, { useState, useContext } from 'react'

// Packages
import { Search, Clock } from 'lucide-react';

// Context
import DroneManagementContext from '../../store/DroneManagementProvider';


// Utils
import { formatDateTime } from '../../utils/formatDate';

const missionStatusColors = {
    'scheduled': 'bg-gray-500 text-white',      // Gray for scheduled but not started
    'in-progress': 'bg-blue-500 text-white',    // Blue for active missions
    'completed': 'bg-green-500 text-white',     // Green for successfully completed missions
    'aborted': 'bg-red-600 text-white',         // Red for failed or aborted missions
};

const MissionMonitoring = () => {
    // Context
    const { missions } = useContext(DroneManagementContext)

    // States
    const [search, setSearch] = useState('');

    const filteredMissions = missions.filter((mission) =>
        mission.name.toLowerCase().includes(search.toLowerCase()) ||
        mission.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex h-[calc(100vh-330px)] w-full">
            <div className="p-6 bg-white shadow-md border-[0.5px] border-[#dcdcdc] rounded-lg w-full">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-2xl font-bold">Mission Monitoring</h1>
                        <p className="text-gray-500">Monitor your missions in realtime</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative flex justify-center items-center">
                            <Search className="absolute left-3 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search drones..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none"
                            />
                        </div>
                    </div>
                </div>


                <div className="overflow-scroll h-[calc(100vh-460px)] rounded-md w-full">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left text-[14px] font-normal px-4 py-2 text-gray-500">Name</th>
                                <th className="text-left text-[14px] font-normal px-4 py-2 text-gray-500">Description</th>
                                <th className="text-left text-[14px] font-normal px-4 py-2 text-gray-500">Status</th>
                                <th className="text-left text-[14px] font-normal px-4 py-2 text-gray-500">Type</th>
                                <th className="text-left text-[14px] font-normal px-4 py-2 text-gray-500">Scheduled Time</th>
                                <th className="text-left text-[14px] font-normal px-4 py-2 text-gray-500">Total Drones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMissions.map((mission) => (
                                <tr key={mission?._id} className="border-b hover:bg-gray-100">
                                    <td className="px-4 py-3 text-[14px] font-normal">{mission.name}</td>
                                    <td className="px-4 py-3 text-[14px] font-normal">{mission.description}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-3 py-1 text-[12px] font-normal rounded-full capitalize ${missionStatusColors[mission.status] || 'bg-gray-200 text-gray-700'}`}>
                                            {mission.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-[14px] font-normal capitalize">
                                        {mission.type}
                                    </td>
                                    <td className="px-4 py-3 text-[14px] font-normal">
                                        <div className="flex items-center gap-[10px]">
                                            <Clock size={16} />
                                            <span>{mission.scheduledTime ? formatDateTime(mission.scheduledTime) : "N/A"}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-[14px] font-normal">
                                        {mission.scheduledDrones.length}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {missions.length === 0 && <div className="flex justify-center items-center w-full mt-[10px]">
                        <span>You haven't created any missions yet</span>
                    </div>}
                </div>

            </div>
        </div>
    )
}

export default MissionMonitoring