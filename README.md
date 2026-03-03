# Focus Task Manager

A task management dashboard built with React.

## Features

- Create, Display, Edit, Delete tasks
- Mark tasks as Completed
- Filter tasks (All / Active / Completed)
- Sort completed tasks automatically
- Sort tasks based on priority automatically
- Detect task priority based on keywords
- High-priority visual styling
- Focus Limit: Max 3 active High-priority tasks
- Data persistence using localStorage

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
