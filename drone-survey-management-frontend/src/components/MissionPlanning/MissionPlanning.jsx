import React, { useEffect, useState, useContext } from "react";

// Packages
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import axios from 'axios';

// utils
import constant from '../../utils/constant';

// Context
import DroneManagementContext from '../../store/DroneManagementProvider';
import { toast } from 'sonner';

const MissionPlanning = () => {
    // Context
    const { activeOrganization, drones } = useContext(DroneManagementContext);

    // States
    const [mission, setMission] = useState({
        name: "",
        description: "",
        type: "one-time",
        status: "scheduled",
        location: { coordinates: [] },
        scheduledTime: "",
        recurrenceRule: {
            frequency: "",
        },
        scheduledDrones: [], // Updated to store multiple drones
    });
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        window.type = true;
    }, [])

    // Handle drawing completion (Extracts center point from drawn rectangle)
    const handleDraw = (e) => {
        const layer = e.layer;
        const bounds = layer.getBounds();
        const center = bounds.getCenter();
        setMission((prev) => ({
            ...prev,
            location: { coordinates: [center.lng, center.lat] },
        }));
    };


    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("recurrenceRule.")) {
            const key = name.split(".")[1];
            setMission((prev) => ({
                ...prev,
                recurrenceRule: { ...prev.recurrenceRule, [key]: value },
            }));
        } else {
            setMission((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Handle drone selection (multiple checkboxes)
    const handleDroneSelection = (e) => {
        const selectedDroneId = e.target.value;
        setMission((prev) => ({
            ...prev,
            scheduledDrones: prev.scheduledDrones.includes(selectedDroneId)
                ? prev.scheduledDrones.filter((id) => id !== selectedDroneId)
                : [...prev.scheduledDrones, selectedDroneId]
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const body = {
                organizationId: activeOrganization?._id,
                ...mission
            };
            if (mission.type === "one-time") {
                delete body.recurrenceRule
            }

            await axios.post(`${constant.url}/missions`, body);

            toast.success('Mission scheduled successfully.');
        } catch (error) {
            console.error("Error saving mission:", error);

            // Extract meaningful error messages
            let errorMessage = "An unexpected error occurred.";

            if (error.response) {
                if (error.response.data?.errors?.length) {
                    errorMessage = error.response.data.errors[0].msg;
                } else if (error.response.data?.message) {
                    errorMessage = error.response.data.message;
                }
            } else if (error.request) {
                errorMessage = "No response from server. Please check your network.";
            } else {
                errorMessage = error.message;
            }

            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex h-[calc(100vh-320px)] w-full">
            {/* Left Side - Map */}
            <div className="w-2/3 h-full border-[0.5px] border-[#dcdcdc] rounded-[10px] overflow-hidden">
                <MapContainer center={[18.559, 73.776]} zoom={15} className="h-full w-full">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <FeatureGroup>
                        <EditControl
                            position="topright"
                            onCreated={handleDraw}
                            draw={{
                                rectangle: true,
                                polygon: false,
                                circle: false,
                                marker: false,
                                polyline: false,
                            }}
                        />
                    </FeatureGroup>
                </MapContainer>
            </div>

            {/* Right Side - Form */}
            <div className="w-1/3 p-6 bg-white border-[0.5px] border-[#dcdcdc] rounded-[10px] ml-4 overflow-scroll">
                <h2 className="text-xl font-bold mb-4">Plan Mission</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Mission Name"
                        value={mission.name}
                        onChange={handleChange}
                        className="w-full p-2 border-[0.5px] border-[#dcdcdc] rounded-md outline-none"
                    />
                    <textarea
                        name="description"
                        placeholder="Mission Description"
                        value={mission.description}
                        onChange={handleChange}
                        className="w-full p-2 border-[0.5px] border-[#dcdcdc] rounded-md outline-none"
                    />
                    <select
                        name="type"
                        value={mission.type}
                        onChange={handleChange}
                        className="w-full p-2 border-[0.5px] border-[#dcdcdc] rounded-md outline-none"
                    >
                        <option value="one-time">One-time</option>
                        <option value="recurring">Recurring</option>
                    </select>
                    <select
                        name="status"
                        value={mission.status}
                        onChange={handleChange}
                        className="w-full p-2 border-[0.5px] border-[#dcdcdc] rounded-md outline-none"
                    >
                        <option value="scheduled">Scheduled</option>
                    </select>
                    <input
                        type="datetime-local"
                        name="scheduledTime"
                        value={mission.scheduledTime}
                        onChange={handleChange}
                        className="w-full p-2 border-[0.5px] border-[#dcdcdc] rounded-md outline-none"
                    />
                    {mission.type === "recurring" && (
                        <select
                            name="recurrenceRule.frequency"
                            value={mission.recurrenceRule.frequency}
                            onChange={handleChange}
                            className="w-full p-2 border-[0.5px] border-[#dcdcdc] rounded-md"
                        >
                            <option value="">Select Frequency</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    )}

                    {/* Drone Selection - Multiple Checkboxes */}
                    <label className="block text-sm font-medium text-gray-800">Select Drones</label>
                    <div className="w-full border border-gray-300 rounded-lg p-3 bg-white shadow-sm">
                        {drones.length > 0 ? (
                            drones.filter((drone) => drone.status === "available").map((drone) => (
                                <label key={drone._id} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-100 transition">
                                    <input
                                        type="checkbox"
                                        value={drone._id}
                                        checked={mission.scheduledDrones.includes(drone._id)}
                                        onChange={handleDroneSelection}
                                        className="w-4 h-4 accent-blue-600 rounded"
                                    />
                                    <span className="text-sm text-gray-700 font-medium">
                                        {drone.model} <span className="text-gray-500">({drone.status})</span>
                                    </span>
                                </label>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm text-center py-2">No drones available</p>
                        )}
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md cursor-pointer">
                        {loading ? 'Saving...' : 'Save Mission'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MissionPlanning;
