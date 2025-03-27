import { createContext, useState, useEffect } from 'react';

// Packages
import axios from 'axios'
import { io } from "socket.io-client";

// Utils

const socket = io(import.meta.env.VITE_SOCKET_URL);

const DroneManagementContext = createContext({
    activeTab: 'Mission Planning',
    organizations: [],
    activeOrganization: null,
    drones: [],
    missions: [],
    missionLoading: true,
    statistics: null,
    statisticsLoading: true,
    isCreateOrgModelOpen: false,


    handleActiveTab: () => { },
    getAllOrganization: () => { },
    handleActiveOrganization: () => { },
    getOrganizationDrones: () => { },
    getAllMissions: () => { },
    getStatistics: () => { },
    addDrone: () => { },
    removeDrone: () => { },
    addMission: () => { },
    handleCreateOrgModel: () => { },
    addOrg: () => { },
})

export const DroneManagementProvider = (props) => {
    const [activeTab, setActiveTab] = useState('Mission Planning')
    const [organizations, setOrganizations] = useState([])
    const [activeOrganization, setActiveOrganization] = useState(null)
    const [drones, setDrones] = useState([])
    const [missions, setMissions] = useState([])
    const [missionLoading, setMissionLoading] = useState(true)
    const [statistics, setStatistics] = useState(null);
    const [statisticsLoading, setStatisticsLoading] = useState(true);
    const [isCreateOrgModelOpen, setIsCreateOrgModelOpen] = useState(false)


    useEffect(() => {
        socket.on("mission:completed", handleMissonCompleted);

        socket.on("mission:error", handleMissonError);

        socket.on("mission:in-progress", handleMissionInProgress)

        return () => {
            socket.off("mission:completed");
            socket.off("mission:error");
            socket.off("mission:in-progress")
        };
    }, []);

    const handleMissonCompleted = (data) => {
        setStatistics((prevStats) => ({
            ...prevStats,
            completedMissions: (prevStats?.completedMissions || 0) + 1,
            scheduledMissions: Math.max(0, (prevStats?.scheduledMissions || 0) - 1)
        }));
        setMissions((prevMissions) =>
            prevMissions.map((mission) =>
                mission._id === data.missionId ? { ...mission, status: 'completed' } : mission
            )
        );
    };

    const handleMissonError = (data) => {
        setMissions((prevMissions) =>
            prevMissions.map((mission) =>
                mission._id === data.missionId ? { ...mission, status: 'aborted' } : mission
            )
        );
    };

    const handleMissionInProgress = (data) => {
        setStatistics((prevStats) => ({
            ...prevStats,
            activeMissions: (prevStats?.activeMissions || 0) + 1,
        }));

        setMissions((prevMissions) =>
            prevMissions.map((mission) =>
                mission._id === data.missionId ? { ...mission, status: 'in-progress' } : mission
            )
        );
    }


    const getAllOrganization = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/organizations`)
            setOrganizations(response.data.organizations)
            setActiveOrganization(response.data.organizations[0])
        } catch (error) {
            console.log(error)
        }
    }

    const getOrganizationDrones = async () => {
        try {
            if (!activeOrganization) return;
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/drones?organizationId=${activeOrganization?._id}`)
            setDrones(response.data.drones)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllMissions = async () => {
        try {
            if (!activeOrganization) return;
            setMissionLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/missions?organizationId=${activeOrganization?._id}`)
            setMissions(response.data.missions)
            setMissionLoading(false)
        } catch (error) {
            setMissionLoading(false)
            console.log(error)
        }
    }

    const getStatistics = async () => {
        try {
            if (!activeOrganization) return;
            setStatisticsLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/organizations/statistics/${activeOrganization?._id}`);
            setStatistics(response.data);
            setStatisticsLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };


    const handleActiveTab = (value) => {
        setActiveTab(value)
    }

    const handleActiveOrganization = (value) => {
        setActiveOrganization(value)
    }

    const addDrone = (value) => {
        setDrones([value, ...drones])
    }

    const removeDrone = (value) => {
        const filteredDrones = drones.filter((data) => data._id !== value._id)
        setDrones(filteredDrones)
    }

    const addMission = (value) => {
        setMissions([value, ...missions])
    }

    const addOrg = (value) => {
        setOrganizations([value, ...organizations])
    }

    const handleCreateOrgModel = () => {
        setIsCreateOrgModelOpen(!isCreateOrgModelOpen)
    }

    const context = {
        activeTab,
        organizations,
        activeOrganization,
        drones,
        missions,
        missionLoading,
        statistics,
        statisticsLoading,
        isCreateOrgModelOpen,

        handleActiveTab,
        getAllOrganization,
        handleActiveOrganization,
        getOrganizationDrones,
        getAllMissions,
        getStatistics,
        addDrone,
        removeDrone,
        addMission,
        handleCreateOrgModel,
        addOrg
    }

    return <DroneManagementContext.Provider value={context}>{props.children}</DroneManagementContext.Provider>
}


export default DroneManagementContext