# Drone Survey Management System

A comprehensive platform for managing drone fleets, planning survey missions, and real-time monitoring.

## Project Overview

The Drone Survey Management System consists of:
- **Backend**: Node.js + Express.js REST API with MongoDB
- **Frontend**: React application with real-time updates
- **Real-time Features**: Socket.IO integration for live mission updates
- **Map Integration**: Interactive mission planning with Leaflet

## Project Structure

```
drone-survey-management/
├── drone-survey-management-system-backend/   # Backend API
└── drone-survey-management-frontend/         # React frontend
```

## Prerequisites

- Node.js >= 20.0.0
- MongoDB
- npm or yarn
- Git

## Quick Start

1. **Clone Repository**
```bash
git clone https://github.com/SaurabhSonde/drone-survey-management.git
cd drone-survey-management
```

2. **Backend Setup**
```bash
# Navigate to backend directory
cd drone-survey-management-system-backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables
MONGODB_URI=mongodb://localhost:27017/drone-survey
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Start development server
npm run dev
```

3. **Frontend Setup**
```bash
# Navigate to frontend directory
cd ../drone-survey-management-frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables
VITE_BACKEND_URL=http://localhost:4000/api
VITE_SOCKET_URL=http://localhost:4000

# Start development server
npm run dev
```

4. **Access Application**
- Backend API: http://localhost:4000
- Frontend: http://localhost:5173

## Setting Up Initial Data

After setting up the project, follow these steps to create initial data for testing:

1. Create an Organization
   - Click "Create Organization" in Navbar
   - Fill in the required details (name, description, email)
   - Submit the form to create your organization

2. Add Drones
   - Go to the "Fleet Management" section
   - Click "Add Drone"
   - Enter drone details:
     - Model
     - Serial Number
     - Battery Capacity
     - Status
   - Save the drone information
   - Repeat this process for additional drones

3. Create a Mission
   - Navigate to Mission Planning
   - Click "Create New Mission"
   - Select the organization
   - Choose the drone(s) to assign
   - Set mission parameters:
     - Mission Name
     - Mission Description
     - Select one time or recurring mission
     - Date and Time
     - Flight Zone by selecting dragging the rectangle on map
   - Save the mission

Following these steps will ensure you have a fully functional application with test data to explore all features.

## Features

### Organization Management
- Create and manage multiple organizations
- Organization-specific statistics and dashboards
- Multi-organization support

### Fleet Management
- Add and monitor drones
- Track drone status and battery levels
- Maintenance scheduling
- Real-time location tracking

### Mission Planning
- Interactive map-based planning
- Schedule one-time and recurring missions
- Automated drone assignment
- Mission area selection

### Real-time Monitoring
- Live mission status updates
- Socket.IO integration
- Mission history and analytics
- Real-time notifications

## Development Tools

### Backend
- Express.js for API routes
- MongoDB with Mongoose
- Socket.IO for real-time features
- Node-cron for scheduling

### Frontend
- React 19 with Vite
- TailwindCSS for styling
- Leaflet for maps
- Socket.IO client

## API Documentation

Refer to individual documentation files:
- [Organizations API](/drone-survey-management-system-backend/docs/api/organizations.md)
- [Drones API](/drone-survey-management-system-backend/docs/api/drones.md)
- [Missions API](/drone-survey-management-system-backend/docs/api/missions.md)

