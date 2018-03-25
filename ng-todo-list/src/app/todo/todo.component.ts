import { Component, OnInit, ElementRef } from '@angular/core';
import { DocumentChangeAction } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { TodoService } from './shared/todo.service';
import { Todo } from './shared/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.todos().subscribe(todos => {
      this.todos = todos;
    });
  }

  onAdd(todoInput) {
    const title = todoInput.value;
    if (title !== undefined && title.length > 0) {
      this.todoService.add(new Todo(null, title, false));
      todoInput.value = '';
    }
  }

  onDelete(id: string) {
    this.todoService.delete(id);
  }

  onToggle(todo: Todo) {
    this.todoService.update(todo.toggle());
  }
}
