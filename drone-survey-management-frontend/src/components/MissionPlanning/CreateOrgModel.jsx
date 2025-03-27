import { useState, useContext } from "react";

// Context
import DroneManagementContext from '../../store/DroneManagementProvider';

// Packages
import { toast } from 'sonner';
import axios from 'axios';

const CreateOrgModal = ({ onClose }) => {
    // Context
    const { addOrg } = useContext(DroneManagementContext)

    // States
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        contactEmail: ""
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
                ...formData
            }
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/organizations`, body)
            addOrg(response.data.organization)
            toast.success('Organization added successfully.')
            setLoading(false)
            onClose(); // Close modal
        } catch (error) {
            toast.error('Failed to add organization.')
            console.error(error);
            setLoading(false)
        }
    };

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-[#00000A73] backdrop-blur-[5px] z-50 flex justify-center items-center' onClick={onClose}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-bold mb-4">Add New Organization</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border-[0.5px] border-[#dcdcdc] p-2 rounded outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <input
                            type="text"
                            name="description"
                            required
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border-[0.5px] border-[#dcdcdc] p-2 rounded outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="text"
                            name="contactEmail"
                            required
                            value={formData.email}
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
                            {loading ? 'Adding...' : 'Add Organization'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateOrgModal;
