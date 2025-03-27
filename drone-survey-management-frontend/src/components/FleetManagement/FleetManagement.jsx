import React, { useState, useContext } from 'react';

// Packages
import { Search, Plus, Wrench, Trash, BatteryCharging } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

// Context
import DroneManagementContext from '../../store/DroneManagementProvider';

// Components
import AddDroneModal from './AddDroneModel';

// Utils
import constant from '../../utils/constant';
import { formatDateTime } from '../../utils/formatDate';


const statusColors = {
    'out-of-service': 'bg-red-600 text-white',   // Red for critical issues
    'charging': 'bg-yellow-400 text-black',     // Yellow for charging status
    'assigned': 'bg-blue-500 text-white',       // Blue for assigned tasks
    'maintenance': 'bg-orange-500 text-white',  // Orange for maintenance
    'available': 'bg-green-500 text-white',     // Green for available drones
};

const FleetManagement = () => {
    // Context
    const { drones, removeDrone } = useContext(DroneManagementContext)

    // States
    const [search, setSearch] = useState('');
    const [isAddDroneModelOpen, setIsAddDroneModelOpen] = useState(false)
    const [deleting, setDeleting] = useState(null)

    const filteredDrones = drones.filter((drone) =>
        drone.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
        drone.model.toLowerCase().includes(search.toLowerCase())
    );


    const handleAddDroneMode = () => {
        setIsAddDroneModelOpen(!isAddDroneModelOpen)
    }

    const deleteDrone = async (data) => {
        try {
            setDeleting(data?._id)
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/drones/${data._id}`)
            removeDrone(response.data.drone)
            toast.success('Drone removed successfully.')
            setDeleting(null)
        } catch (error) {
            toast.error('Failed to remove drone.')
            console.log(error)
            setDeleting(null)
        }
    }

    return (
        <div className="flex h-[calc(100vh-330px)] w-full">
            {isAddDroneModelOpen && <AddDroneModal onClose={handleAddDroneMode} />}
            <div className="p-6 bg-white shadow-md border-[0.5px] border-[#dcdcdc] rounded-lg w-full">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-2xl font-bold">Fleet Management</h1>
                        <p className="text-gray-500">Manage and monitor your drone fleet</p>
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
                        <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md cursor-pointer" onClick={() => setIsAddDroneModelOpen(true)}>
                            <Plus size={16} /> Add Drone
                        </button>
                    </div>
                </div>

                <div className="overflow-scroll h-[calc(100vh-460px)] rounded-md">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left text-[14px] font-normal px-4 py-2 text-gray-500">Drone ID</th>
                                <th className="text-left text-[14px] font-normal px-4 py-2 text-gray-500">Model</th>
                                <th className="text-left text-[14px] font-normal px-4 py-2 text-gray-500">Status</th>
                                <th className="text-left text-[14px] font-normal px-4 py-2 text-gray-500">Battery</th>
                                <th className="text-left text-[14px] font-normal px-4 py-2 text-gray-500">Last Maintenance</th>
                                <th className="text-left text-[14px] font-normal px-4 py-2 text-gray-500">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDrones.map((drone) => (
                                <tr key={drone?._id} className="border-b hover:bg-gray-100">
                                    <td className="px-4 py-3 text-[14px] font-normal">{drone.serialNumber}</td>
                                    <td className="px-4 py-3 text-[14px] font-normal">{drone.model}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-3 py-1 text-[12px] font-normal rounded-full capitalize ${statusColors[drone.status] || 'bg-gray-200 text-gray-700'}`}>
                                            {drone.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-[14px] font-normal">
                                        <div className="flex items-center gap-[10px]">
                                            <BatteryCharging size={16} className="text-green-500" />
                                            <span>{drone.batteryLevel}%</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-[14px] font-normal">
                                        <div className="flex items-center gap-[10px]">
                                            <Wrench size={16} />
                                            <span>{drone.lastMaintenance ? formatDateTime(drone.lastMaintenance) : "N/A"}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-[14px] font-normal">
                                        <div className="flex justify-center items-center">
                                            {deleting === drone?._id ? <svg aria-hidden="true" className="inline w-[16px] h-[16px] text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg> : <Trash size={16} onClick={() => deleteDrone(drone)} className='cursor-pointer' />}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FleetManagement;
