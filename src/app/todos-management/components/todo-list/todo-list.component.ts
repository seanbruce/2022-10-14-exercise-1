import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest, map } from 'rxjs';
import { TodosManagement } from '../../todos-management.models';
import { IndexStore } from '../index/index.store';
import { randomId, TodoListStore } from './todo-list.store';
export class SearchForm {
  title: FormControl<string>;
}
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styles: [
    `
      .pointer {
        cursor: pointer;
      }
      .listSelected {
        background-color: #e6f2ff !important;
      }
    `,
    `
      .todo-list-title {
        font-size: 1.125rem;
        line-height: 1.75rem;
        font-weight: bold;
        color: #334155;
      }

      .todo-container {
        max-width: 800px;
      }
    `,
  ],
  providers: [TodoListStore],
})
export class TodoListComponent implements OnInit {
  selectedTodo$ = this.indexStore.selectedTodo$;

  searchForm = new FormGroup<SearchForm>({
    title: new FormControl(),
  });

  list$ = combineLatest([
    this.todoListStore.todos$,
    this.searchForm.controls.title.valueChanges,
  ]).pipe(
    map((x) => {
      if (!x[1]) return x[0];
      else
        return x[0].filter((y) => {
          return y.title.toLowerCase().includes(x[1].toLowerCase());
        });
    })
  );

  constructor(
    private indexStore: IndexStore,
    private todoListStore: TodoListStore
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.searchForm.reset({ title: '' });
    }, 0);
  }

  toCreateTodo() {
    let item = {
      id: randomId(),
      title: '',
      description: '',
      done: false,
    } as TodosManagement.Todo;

    this.todoListStore.addTodo(item);

    this.indexStore.selectTodo(item);
  }

  toDeleteTodo(id: string) {
    this.todoListStore.removeTodo(id);
  }

  toSelect(item: TodosManagement.Todo) {
    if (this.indexStore.selectedTodo === item) {
      this.indexStore.unSelectTodo();
    } else {
      this.indexStore.selectTodo(item);
    }
  }
}
