import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { TodoList, TodosManagement } from '../../todos-management.models';

const randomId = () => Math.random().toString(36).slice(2);

@Injectable()
export class TodoListStore extends ComponentStore<TodoList.ViewModel> {
  constructor() {
    super({
      todos: [
        {
          id: randomId(),
          title: '學習Angular',
          description: '使用Angular官網學習Angular的使用',
          done: false,
        },
        {
          id: randomId(),
          title: '學習C#',
          description: '學習C#的基礎知識',
          done: false,
        },
        {
          id: randomId(),
          title: '學習ABP',
          description: '學習ABP的開發',
          done: false,
        },
      ],
      isEditorOpen: false,
      editorMode: 'create',
      defaultFormValues: null,
    });
  }

  readonly todos$: Observable<TodosManagement.Todo[]> = this.select((state) => state.todos);
  readonly isEditorOpen$: Observable<boolean> = this.select(
    (state) => state.isEditorOpen
  );
  readonly editorMode$: Observable<TodoList.EditorMode> = this.select(
    (state) => state.editorMode
  );
  readonly defaultFormValues$: Observable<TodosManagement.Todo | null> = this.select(
    (state) => state.defaultFormValues
  );

  readonly openEditor = this.updater((state) => ({
    ...state,
    isEditorOpen: true,
  }));

  readonly closeEditor = this.updater((state) => ({
    ...state,
    isEditorOpen: false,
  }));

  readonly addTodo = this.updater((state, todo: Omit<TodosManagement.Todo, 'id' | 'done'>) => ({
    ...state,
    isEditorOpen: false,
    todos: [
      ...state.todos,
      {
        id: randomId(),
        title: todo.title,
        description: todo.description,
        done: false,
      },
    ],
  }));

  readonly removeTodo = this.updater((state, id: string) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id)
  }))
}