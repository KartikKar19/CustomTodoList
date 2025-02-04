# Enhanced Todo List Application

A feature-rich, responsive todo list application built with Angular that helps you organize tasks efficiently with categories, priorities, and due dates.

![Todo List App](https://i.imgur.com/example.png)

## Features

### Task Management
- ✨ Create, complete, and delete tasks
- 📋 Categorize tasks (Work, Personal, Shopping, Health)
- 🎯 Set priority levels (Low, Medium, High)
- 📅 Add due dates to tasks
- 🔄 Automatic sorting by priority

### Advanced Filtering
- 🔍 Search tasks by text
- 📊 Filter by category
- ⚡ Filter by status (All, Active, Completed)

### Statistics
- 📈 Total tasks count
- ✅ Completed tasks count
- 🎯 Active tasks count

### Data Persistence
- 💾 Automatic saving to local storage
- 🧹 Clear completed tasks
- 🗑️ Clear all tasks option

### Responsive Design
- 📱 Mobile-friendly interface
- 💻 Adapts to all screen sizes
- 🎨 Modern and clean UI

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/todo-list.git
```

2. Navigate to the project directory:
```bash
cd todo-list
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

5. Open your browser and visit `http://localhost:4200`

## Usage

### Adding a Task
1. Enter task description in the text input
2. Select a category (optional)
3. Choose a due date (optional)
4. Set priority level (defaults to Medium)
5. Click "Add Todo" or press Enter

### Managing Tasks
- Click the checkbox to mark a task as complete
- Use the search bar to find specific tasks
- Filter tasks by category or status
- Click the delete button to remove a task
- Use "Clear Completed" to remove all completed tasks
- Use "Clear All" to remove all tasks

## Project Structure

```
src/
├── main.ts          # Main application file
├── index.html       # HTML entry point
└── global_styles.css # Global styles
```

## Technical Details

### Built With
- Angular 18
- TypeScript
- Modern CSS3

### Key Components
- Standalone Angular component
- Local storage integration
- Responsive CSS design
- TypeScript interfaces for type safety

### State Management
- Local component state
- Persistent storage using localStorage
- Computed properties for statistics

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by modern todo list applications
- Uses Poppins font from Google Fonts
- Gradient background inspired by Tailwind CSS