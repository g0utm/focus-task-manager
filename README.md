# Focus Task Manager

A task management dashboard built with React.

## Features

- Create, Display, Edit, Delete tasks
- Mark tasks as Completed
- Filter tasks (All / Active / Completed)
- Automatically sort completed tasks
- Automatically sort tasks based on priority 
- Automatically detect and assign task priority based on keywords
- High-priority visual styling
- Focus Limit: Max 3 active High-priority tasks
- Data persistence using localStorage

### Auto Priority Detection

The task title is scanned for keywords such as:

- urgent
- asap
- important
- deadline
- now

If detected, the task is automatically marked as High Priority.

The user can override priority manually, and auto-detection resets until the title is cleared or the task is added.

## Focus Limit Logic

Before adding a new task, the application checks:

```javascript
const activeHighCount = tasks.filter(
  (task) => task.priority === "High" && !task.completed
).length;
```

If there are already 3 active High-priority tasks, the state update is prevented and a warning message is shown.

## Tech Stack

- React (Vite)
- JavaScript (ES6+)
- CSS3
- LocalStorage API

# Live Demo

  The application is deployed in Vercel :

  Live URL :
  https://focus-task-manager-one.vercel.app/

## How to Run Locally

1. Clone the repository:
   ```
   git clone https://github.com/g0utm/focus-task-manager.git
   ```

2. Navigate into the folder:
   ```
   cd focus-task-manager
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start development server:
   ```
   npm run dev
   ```

Open: http://localhost:5173
