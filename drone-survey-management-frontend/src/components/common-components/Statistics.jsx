import React, { useContext, useEffect, useState } from 'react';

// Context
import DroneManagementContext from '../../store/DroneManagementProvider';

// Packages
import axios from 'axios';

// Utils
import constant from '../../utils/constant';

const Statistics = () => {
    const { activeOrganization, statistics, statisticsLoading, getStatistics } = useContext(DroneManagementContext);


    useEffect(() => {
        getStatistics();
    }, [activeOrganization]);



    const renderCard = (title, value) => (
        <div className="flex flex-col gap-[10px] justify-start items-start p-[20px] w-[250px] rounded-[10px] border-[1px] border-[#dcdcdc] shadow-md">
            <h1 className="text-[14px] text-[#71717A]">{title}</h1>
            {statisticsLoading ? (
                <div className="h-10 w-24 bg-gray-300 animate-pulse rounded"></div>
            ) : (
                <span className="text-4xl font-medium text-black">{value}</span>
            )}
        </div>
    );

    return (
        <div className="flex justify-between w-full">
            {renderCard('Total Drones', statistics?.totalDrones)}
            {renderCard('Active Missions', statistics?.activeMissions)}
            {renderCard('Completed Surveys', statistics?.completedMissions)}
            {renderCard('Scheduled Missions', statistics?.scheduledMissions)}
        </div>
    );
};

export default Statistics;
