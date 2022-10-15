import { Component, OnInit } from '@angular/core';
import { TodoListStore } from './todo-list.store';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styles: [
  ],
  providers: [
    TodoListStore
  ]
})
export class TodoListComponent implements OnInit {
  list$ = this.todoListStore.todos$;
  isEditorOpen$ = this.todoListStore.isEditorOpen$
  editorTitle$ = this.todoListStore.editorMode$
  constructor(private todoListStore: TodoListStore) { }

  ngOnInit(): void {
  }
  toOpenEditor() {
    this.todoListStore.openEditor();
  }

  toCloseEditor() {
    this.todoListStore.closeEditor();
  }

  toDeleteTodo(id: string) {
    this.todoListStore.removeTodo(id)
  }
}
