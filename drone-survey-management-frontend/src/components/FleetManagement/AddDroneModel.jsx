import { useState, useContext } from "react";

// Context
import DroneManagementContext from '../../store/DroneManagementProvider';

// Packages
import { toast } from 'sonner';
import axios from 'axios';

// Utils
import constant from '../../utils/constant';

const AddDroneModal = ({ onClose }) => {
    // Context
    const { activeOrganization, addDrone } = useContext(DroneManagementContext)

    // States
    const [formData, setFormData] = useState({
        serialNumber: "",
        model: "",
        status: "available",
        batteryLevel: 100,
        currentLocation: { type: "Point", coordinates: [0, 0] },
        lastMaintenance: ""
    });
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const body = {
                ...formData,
                organizationId: activeOrganization?._id
            }
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/drones`, body)
            addDrone(response.data.drone)
            toast.success('Drone add successfully.')
            setLoading(false)
            onClose(); // Close modal
        } catch (error) {
            toast.error('Failed to add drone.')
            console.error(error);
            setLoading(false)
        }
    };

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-[#00000A73] backdrop-blur-[5px] z-20 flex justify-center items-center' onClick={onClose}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-bold mb-4">Add New Drone</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Serial Number</label>
                        <input
                            type="text"
                            name="serialNumber"
                            required
                            value={formData.serialNumber}
                            onChange={handleChange}
                            className="w-full border-[0.5px] border-[#dcdcdc] p-2 rounded outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Model</label>
                        <input
                            type="text"
                            name="model"
                            required
                            value={formData.model}
                            onChange={handleChange}
                            className="w-full border-[0.5px] border-[#dcdcdc] p-2 rounded outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full border-[0.5px] border-[#dcdcdc] p-2 rounded outline-none"
                        >
                            <option value="available">Available</option>
                            <option value="assigned">Assigned</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="charging">Charging</option>
                            <option value="out-of-service">Out of Service</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Battery Level</label>
                        <input
                            type="number"
                            name="batteryLevel"
                            min="0"
                            max="100"
                            value={formData.batteryLevel}
                            onChange={handleChange}
                            className="w-full border-[0.5px] border-[#dcdcdc] p-2 rounded outline-none"
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
                        >
                            {loading ? 'Adding...' : 'Add Drone'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDroneModal;
