import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  category: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="container">
      <h1 style="text-align: center; margin-bottom: 24px; color: #1e293b; font-size: 28px;">
        Enhanced Todo List
      </h1>
      
      <!-- Add Todo Form -->
      <div class="todo-form">
        <input
          type="text"
          [(ngModel)]="newTodoText"
          (keyup.enter)="addTodo()"
          placeholder="What needs to be done?"
          class="form-input"
        />
        <div class="form-row">
          <select [(ngModel)]="newTodoCategory" class="form-input">
            <option value="">Select Category</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
          </select>
          <input
            type="date"
            [(ngModel)]="newTodoDueDate"
            class="form-input"
          />
          <select [(ngModel)]="newTodoPriority" class="form-input">
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>
        <button (click)="addTodo()" class="add-btn">Add Todo</button>
      </div>

      <!-- Filters -->
      <div class="filters">
        <input
          type="text"
          [(ngModel)]="searchText"
          placeholder="Search todos..."
          class="search-input"
        />
        <select [(ngModel)]="filterCategory" class="filter-select">
          <option value="">All Categories</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
          <option value="health">Health</option>
        </select>
        <select [(ngModel)]="filterStatus" class="filter-select">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <!-- Stats -->
      <div class="stats">
        <p>Total: {{ filteredTodos.length }}</p>
        <p>Completed: {{ completedCount }}</p>
        <p>Active: {{ activeCount }}</p>
      </div>

      <!-- Todo List -->
      <div *ngIf="filteredTodos.length === 0" class="empty-state">
        <p>No todos found matching your criteria.</p>
      </div>

      <div *ngFor="let todo of filteredTodos" 
           class="todo-item"
           [class.completed]="todo.completed"
           [class.priority-high]="todo.priority === 'high'"
           [class.priority-medium]="todo.priority === 'medium'"
           [class.priority-low]="todo.priority === 'low'">
        <input
          type="checkbox"
          class="todo-checkbox"
          [(ngModel)]="todo.completed"
          (change)="saveTodos()"
        />
        <div class="todo-content">
          <span class="todo-text">{{ todo.text }}</span>
          <div class="todo-details">
            <span class="category-badge">{{ todo.category }}</span>
            <span class="due-date" [class.overdue]="isOverdue(todo)">
              Due: {{ formatDate(todo.dueDate) }}
            </span>
          </div>
        </div>
        <button class="delete-btn" (click)="deleteTodo(todo.id)">Delete</button>
      </div>

      <!-- Clear Buttons -->
      <div class="clear-buttons" *ngIf="todos.length > 0">
        <button (click)="clearCompleted()" class="clear-btn">
          Clear Completed
        </button>
        <button (click)="clearAll()" class="clear-btn danger">
          Clear All
        </button>
      </div>
    </div>
  `,
})
export class App implements OnInit {
  todos: Todo[] = [];
  newTodoText = '';
  newTodoCategory = '';
  newTodoDueDate = '';
  newTodoPriority: 'low' | 'medium' | 'high' = 'medium';
  searchText = '';
  filterCategory = '';
  filterStatus = 'all';

  ngOnInit() {
    this.loadTodos();
  }

  get filteredTodos() {
    return this.todos
      .filter(todo => {
        const matchesSearch = todo.text.toLowerCase().includes(this.searchText.toLowerCase());
        const matchesCategory = !this.filterCategory || todo.category === this.filterCategory;
        const matchesStatus = this.filterStatus === 'all' || 
          (this.filterStatus === 'completed' && todo.completed) ||
          (this.filterStatus === 'active' && !todo.completed);
        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        // Sort by priority (high to low)
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  }

  get completedCount() {
    return this.todos.filter(todo => todo.completed).length;
  }

  get activeCount() {
    return this.todos.filter(todo => !todo.completed).length;
  }

  addTodo() {
    if (this.newTodoText.trim()) {
      this.todos.push({
        id: Date.now(),
        text: this.newTodoText.trim(),
        completed: false,
        category: this.newTodoCategory || 'personal',
        dueDate: this.newTodoDueDate || new Date().toISOString().split('T')[0],
        priority: this.newTodoPriority,
      });
      this.newTodoText = '';
      this.newTodoCategory = '';
      this.newTodoDueDate = '';
      this.newTodoPriority = 'medium';
      this.saveTodos();
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.saveTodos();
  }

  clearAll() {
    this.todos = [];
    this.saveTodos();
  }

  isOverdue(todo: Todo): boolean {
    if (!todo.dueDate || todo.completed) return false;
    return new Date(todo.dueDate) < new Date(new Date().toISOString().split('T')[0]);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadTodos() {
    const saved = localStorage.getItem('todos');
    if (saved) {
      this.todos = JSON.parse(saved);
    }
  }
}

bootstrapApplication(App);