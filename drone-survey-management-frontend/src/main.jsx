import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'


// Context
import { DroneManagementProvider } from './store/DroneManagementProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DroneManagementProvider>
      <App />
    </DroneManagementProvider>
  </StrictMode>,
)
