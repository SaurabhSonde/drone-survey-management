# Drone Survey Management Frontend

A React-based frontend application for managing drone fleets, planning missions, and monitoring survey operations.

## Features

- **Mission Planning**: Plan and schedule drone survey missions with map-based planning
- **Fleet Management**: Track and manage drone fleet status, maintenance, and availability
- **Mission Monitoring**: Real-time monitoring of ongoing missions and mission history
- **Organization Management**: Support for multiple organizations and their drone fleets
- **Real-time Updates**: Live status updates using WebSocket connections

## Tech Stack

- React 19 with Vite
- TailwindCSS for styling
- Socket.io for real-time updates
- Leaflet for map interactions
- Axios for API communication

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/drone-survey-management-frontend.git
cd drone-survey-management-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
- Copy `.env.example` to `.env`
- Update environment variables as needed

4. Start development server:
```bash
npm run dev
```

## Environment Variables

The following environment variables are required:

- `VITE_BACKEND_URL`: The URL of your backend API (e.g., http://localhost:4000/api)
- `VITE_SOCKET_URL`: The URL for WebSocket connections (e.g., http://localhost:4000)

Create a `.env` file in the project root and add these variables:

```bash
VITE_BACKEND_URL=http://localhost:4000/api
VITE_SOCKET_URL=http://localhost:4000
```

## Project Structure

```
src/
├── components/          # React components organized by feature
│   ├── common/         # Shared components
│   ├── FleetManagement/
│   ├── MissionMonitoring/
│   └── MissionPlanning/
├── store/              # Context providers and state management
├── utils/              # Utility functions and constants
└── assets/            # Static assets and images
```

## Architecture Decisions

### Component Organization
- Feature-based component organization for better scalability
- Shared components in common/ directory for reusability
- Context-based state management for organization and drone data

### Real-time Updates
- Socket.io integration for live mission status updates
- Event-based architecture for mission state changes
- Optimistic UI updates with backend validation

### Map Integration
- Leaflet for interactive map features
- Draw controls for mission area selection
- Coordinate tracking for drone positioning

## Development Workflow

1. **Component Development**
   - Create new components in appropriate feature directories
   - Use TailwindCSS for consistent styling
   - Implement prop-types for type checking

2. **State Management**
   - Use Context API for global state
   - Keep component state local when possible
   - Implement proper error handling



