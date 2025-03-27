import React, { useContext, useEffect } from 'react'

// Packages
import { Toaster } from 'sonner'


// Context
import DroneManagementContext from './store/DroneManagementProvider'

// Components
import Navbar from './components/common-components/Navbar'
import Statistics from './components/common-components/Statistics'
import SectionBar from './components/common-components/SectionBar'
import MissionPlanning from './components/MissionPlanning/MissionPlanning'
import FleetManagement from './components/FleetManagement/FleetManagement'
import MissionMonitoring from './components/MissionMonitoring/MissionMonitoring'

const App = () => {
  // Context
  const { activeTab, activeOrganization, getOrganizationDrones, getAllMissions } = useContext(DroneManagementContext)


  useEffect(() => {
    getOrganizationDrones()
    getAllMissions()
  }, [activeOrganization])


  return (
    <div className="flex flex-col justify-center items-center">
      <Toaster position="top-right" richColors closeButton />
      <Navbar />
      <div className="flex flex-col gap-[20px] p-[20px] w-[80%]">
        <Statistics />
        <SectionBar />

        {activeTab === "Mission Planning" && <MissionPlanning />}
        {activeTab === "Fleet Management" && <FleetManagement />}
        {activeTab === "Mission Monitoring" && <MissionMonitoring />}
      </div>
    </div>
  )
}

export default App
