import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { Index, TodosManagement } from '../../todos-management.models';

@Injectable()
export class IndexStore extends ComponentStore<Index.ViewModel> {
  readonly selectedTodo$: Observable<TodosManagement.Todo> = this.select(
    (state) => state.selectedTodo
  );

  get selectedTodo() {
    return this.get((x) => x.selectedTodo);
  }

  readonly selectTodo = this.updater((state, value: TodosManagement.Todo) => ({
    ...state,
    selectedTodo: value,
  }));

  readonly unSelectTodo = this.updater((state) => ({
    ...state,
    selectedTodo: null,
  }));
  constructor() {
    super({
      selectedTodo: null,
    });
  }
}
