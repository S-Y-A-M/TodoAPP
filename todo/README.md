# Todo App

A full-stack todo application with a modern React frontend and Node.js/Express backend.

## Features

✨ **Core Features:**
- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Add optional descriptions to todos
- Real-time UI updates
- Responsive design (mobile-friendly)
- Beautiful gradient UI

🚀 **Tech Stack:**
- **Frontend:** React 18 + Vite
- **Backend:** Node.js + Express
- **Database:** SQLite
- **Styling:** CSS3 with responsive design

## Project Structure

```
todo/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── todos.db (created after first run)
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── App.css
        ├── index.css
        └── components/
            ├── TodoForm.jsx
            ├── TodoForm.css
            ├── TodoList.jsx
            ├── TodoList.css
            ├── TodoItem.jsx
            └── TodoItem.css
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Enter a todo title and optional description
3. Click "Add Todo" to create a new todo
4. Click the checkbox to mark todos as complete
5. Click the trash icon to delete todos
6. View your progress at the top of the app

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Building for Production

### Frontend
```bash
cd frontend
npm run build
```
The build output will be in `frontend/dist/`

### Backend
The backend is ready to run in production using `npm start`

## Notes

- The SQLite database is stored in `backend/todos.db`
- The frontend proxy is configured to route `/api` calls to the backend
- All timestamps are automatically managed by the database

## Future Enhancements

- Add user authentication
- Add due dates and reminders
- Add categories/tags
- Add priority levels
- Add local storage for offline support
- Add dark mode
