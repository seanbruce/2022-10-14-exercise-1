import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

interface TODO {
  id: string;
  title: string;
  description: string;
  done: false;
}

type EditorMode = 'create' | 'update';

interface TodoStoreInterface {
  todos: TODO[];
  isEditorOpen: boolean;
  editorMode: EditorMode;
  defaultFormValues: TODO | null;
}

const randomId = () => Math.random().toString(36).slice(2);

@Injectable()
class TodoStore extends ComponentStore<TodoStoreInterface> {
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

  readonly todos$: Observable<TODO[]> = this.select((state) => state.todos);
  readonly isEditorOpen$: Observable<boolean> = this.select(
    (state) => state.isEditorOpen
  );
  readonly editorMode$: Observable<EditorMode> = this.select(
    (state) => state.editorMode
  );
  readonly defaultFormValues$: Observable<TODO | null> = this.select(
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

  readonly addTodo = this.updater((state, todo: Omit<TODO, 'id' | 'done'>) => ({
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

export { TodoStore };

export type { TODO };
