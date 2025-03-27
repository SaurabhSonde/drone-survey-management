import { useState, useRef, useEffect, useContext } from "react";

// Context
import DroneManagementContext from '../../store/DroneManagementProvider';

const OrganizationDropdown = () => {
    // Context
    const { organizations, activeOrganization, getAllOrganization, handleActiveOrganization } = useContext(DroneManagementContext)
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        getAllOrganization()
    }, [])

    return (
        <div className="relative w-64" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white text-[#71717A] text-[14px] font-normal py-[5px] px-[10px] border cursor-pointer border-[#dcdcdc] rounded-[5px] flex justify-between items-center"
            >
                {activeOrganization?.name}
                <svg
                    className="w-5 h-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {organizations.map((org) => (
                        <div
                            key={org?._id}
                            className="px-4 py-2 text-[14px] font-normal hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                handleActiveOrganization(org)
                                setIsOpen(false);
                            }}
                        >
                            {org.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrganizationDropdown
