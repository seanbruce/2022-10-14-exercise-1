import { Component, OnInit } from '@angular/core';
import { map, combineLatest } from 'rxjs';

import { TODO, TodoStore } from './todos.store';

/**
 * 功能
 * 按todo名稱搜索(前端搜索)[✅]
 * 添加todo[✅]
 * 編輯todo[]
 * 完成|未完成 狀態切換[✅]
 * 分頁(前端分頁)[✅]
 */

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers: [TodoStore],
})
export class TodosComponent implements OnInit {
  titleSearchString$ = this.todoStore.titleSearchString$;
  listTotalSize$ = this.todoStore.todos$.pipe(map((todos) => todos.length));
  list$ = combineLatest([
    this.todoStore.todos$,
    this.todoStore.titleSearchString$,
    this.todoStore.paginationIndex$,
    this.todoStore.paginationPageSize$,
  ]).pipe(
    map(([todos, searchString, pageIndex, pageSize]) => {
      const searchStringTrimmed = searchString.trim();
      if (!searchStringTrimmed) {
        return todos.slice((pageIndex - 1) * pageSize);
      }
      return todos
        .filter((todo) => todo.title.includes(searchStringTrimmed))
        .slice((pageIndex - 1) * pageSize);
    })
  );
  isEditorOpen$ = this.todoStore.isEditorOpen$;
  editorTitle$ = this.todoStore.editorMode$.pipe(
    map((editorMode) => {
      switch (editorMode) {
        case 'create':
          return '創建代辦';
        case 'update':
          return '編輯代辦';
        default:
          return '未知狀態';
      }
    })
  );
  get pageSizeOptions() {
    return this.todoStore.pageSizeOptions;
  }
  paginationIndex$ = this.todoStore.paginationIndex$;
  paginationPageSize$ = this.todoStore.paginationPageSize$;

  constructor(private readonly todoStore: TodoStore) {}

  ngOnInit(): void {}

  toOpenEditorInCreateMode() {
    this.todoStore.updateEditMode('create');
    this.todoStore.updateDefaultFormValues(null);
    this.todoStore.openEditor();
  }

  toOpenEditorInEditMode(todo: TODO) {
    this.todoStore.updateEditMode('update');
    this.todoStore.updateDefaultFormValues(todo);
    this.todoStore.openEditor();
  }

  toCloseEditor() {
    this.todoStore.closeEditor();
  }

  toDeleteTodo(id: string) {
    this.todoStore.removeTodo(id);
  }

  toUpdateTitleSearchString(newString: string) {
    this.todoStore.updatePaginationIndex(1);
    this.todoStore.updateTitleSearchString(newString);
  }

  toToggleTodo(id: string) {
    this.todoStore.toggleTodo(id);
  }

  toUpdatePaginationIndex(index: number) {
    this.todoStore.updatePaginationIndex(index);
  }

  toUpdatePaginationPageSize(pageSize: number) {
    this.todoStore.updatePaginationPageSize(pageSize);
  }

  trackById(index: number, item: TODO) {
    return item.id;
  }
}
