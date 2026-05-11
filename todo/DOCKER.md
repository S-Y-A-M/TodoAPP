# Docker Setup Guide

This project is configured to run with Docker Compose.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose (usually included with Docker Desktop)

## Quick Start with Docker

### 1. Build and Start All Services

From the project root directory, run:

```bash
docker-compose up --build
```

This will:
- Build the backend image
- Build the frontend image
- Start both services
- Create a shared network between them

### 2. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api/todos

### 3. Stop the Services

Press `Ctrl+C` or run:

```bash
docker-compose down
```

## Useful Docker Compose Commands

```bash
# Start services (uses existing images)
docker-compose up

# Start in detached mode (background)
docker-compose up -d

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Rebuild images
docker-compose up --build

# Remove containers and volumes
docker-compose down -v

# Stop services without removing containers
docker-compose stop

# Start stopped services
docker-compose start
```

## Service Details

### Backend Service
- **Image:** Node.js 18 Alpine
- **Port:** 5000
- **Command:** `npm run dev` (with hot-reload)
- **Volume:** Source code synced for live development
- **Database:** SQLite with persistent volume

### Frontend Service
- **Image:** Node.js 18 Alpine
- **Port:** 3000
- **Command:** `npm run dev` (Vite dev server)
- **Volume:** Source code synced for live development
- **Network:** Connected to backend via `todo-network`

## Troubleshooting

### Port Already in Use
If ports 3000 or 5000 are already in use:

```bash
# Change ports in docker-compose.yaml
# For example, change "3000:3000" to "3001:3000"
```

### Database Issues
The SQLite database is stored in a persistent Docker volume. To reset:

```bash
docker-compose down -v  # Remove volumes
docker-compose up --build  # Rebuild and start fresh
```

### Container Won't Start
Check logs:

```bash
docker-compose logs backend
docker-compose logs frontend
```

### Permission Issues (Linux/Mac)
If you get permission errors:

```bash
sudo docker-compose up
```

## Development with Docker

Changes to source files are automatically reflected thanks to volume mounts:
- Edit `backend/` files → changes appear immediately
- Edit `frontend/` files → changes appear immediately
- Hot module reloading works for both services

## Production Build

For production, use optimized Dockerfiles:

```bash
# Build production images
docker build -t todo-backend:prod ./backend
docker build -t todo-frontend:prod ./frontend

# Run production containers
docker run -d -p 5000:5000 todo-backend:prod
docker run -d -p 3000:3000 todo-frontend:prod
```
