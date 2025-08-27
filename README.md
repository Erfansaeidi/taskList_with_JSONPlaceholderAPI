# To-Do App with JSONPlaceholder API Integration

A modern, responsive To-Do application that integrates with the JSONPlaceholder API for task management. This application allows users to create, read, update, and delete tasks with a clean and intuitive user interface.

## Features

- **API Integration**: Connects to JSONPlaceholder API for task management
- **Task Management**:
  - Fetch tasks from the API (limited to 10)
  - Add new tasks via POST requests
  - Edit existing tasks via PATCH requests
  - Delete tasks via DELETE requests
  - Toggle task completion status via PATCH requests
- **User Interface**:
  - Clean, modern design with responsive layout
  - Visual distinction between completed and pending tasks
  - Intuitive action buttons (edit, complete, delete)
  - Confirmation overlay for task deletion
- **User Experience**:
  - Loading indicators during API operations
  - Error handling with user-friendly messages
  - Automatic error message dismissal
  - Support for adding tasks with Enter key

## Technologies Used

- HTML5
- CSS3 (with custom button themes and responsive design)
- Vanilla JavaScript (ES6+)
- Fetch API for AJAX requests
- JSONPlaceholder for mock API endpoints

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/todo-app-jsonplaceholder.git
   ```

2. Navigate to the project directory:
   ```
   cd todo-app-jsonplaceholder
   ```

3. Open the project with a local server:
   ```
   npx http-server . --port 8000
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## Project Structure

```
├── index.html      # Main HTML structure
├── style.css       # CSS styling with theme system
├── script.js       # JavaScript with API integration
└── README.md       # Project documentation
```

## API Integration

This application uses the JSONPlaceholder API for task management. Since JSONPlaceholder is a fake API service, it doesn't actually persist your changes on their server. However, it does return appropriate responses that simulate a real API, allowing the app to function as if changes were being saved.

API endpoints used:
- GET /todos?_limit=10 - Fetch tasks (limited to 10)
- POST /todos - Create a new task
- PATCH /todos/:id - Update a task
- DELETE /todos/:id - Delete a task

## Future Improvements

- User authentication
- Task categories/tags
- Due dates and reminders
- Task search and filtering
- Offline support with local storage
- Dark/light theme toggle

## License

MIT

## Author

Your Name