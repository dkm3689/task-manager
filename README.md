# Task Manager

A simple MERN stack task manager application.

## Features

- Create, edit, and delete tasks
- Set task priority (low, medium, high)
- Track task status (pending, in-progress, completed)
- Filter tasks by status
- Click status badge to cycle through statuses

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: React (Vite)

## Setup

### Prerequisites

- Node.js (v18+)
- MongoDB running locally

### Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```
PORT=5001
MONGO_URI=mongodb://localhost:27017/taskmanager
```

```bash
node server.js
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## API Endpoints

| Method | Endpoint         | Description      |
|--------|------------------|------------------|
| GET    | /api/tasks       | Get all tasks    |
| POST   | /api/tasks       | Create a task    |
| PUT    | /api/tasks/:id   | Update a task    |
| DELETE | /api/tasks/:id   | Delete a task    |
