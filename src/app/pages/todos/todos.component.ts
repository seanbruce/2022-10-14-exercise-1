import { Component, OnInit } from '@angular/core';
import { map, combineLatest } from 'rxjs';

import { TodoStore } from './todos.store';

/**
 * 功能
 * 按todo名稱搜索(前端搜索)[✅]
 * 添加todo[✅]
 * 編輯todo[]
 * 完成|未完成 狀態切換[✅]
 * 分頁(前端分頁)
 */

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers: [TodoStore],
})
export class TodosComponent implements OnInit {
  titleSearchString$ = this.todoStore.titleSearchString$;
  list$ = combineLatest([
    this.todoStore.todos$,
    this.todoStore.titleSearchString$,
  ]).pipe(
    map(([todos, searchString]) => {
      const searchStringTrimmed = searchString.trim();
      if (!searchStringTrimmed) {
        return todos;
      }
      return todos.filter((todo) => todo.title.includes(searchStringTrimmed));
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

  constructor(private readonly todoStore: TodoStore) {}

  ngOnInit(): void {}

  toOpenEditor() {
    this.todoStore.openEditor();
  }

  toCloseEditor() {
    this.todoStore.closeEditor();
  }

  toDeleteTodo(id: string) {
    this.todoStore.removeTodo(id);
  }

  toUpdateTitleSearchString(newString: string) {
    this.todoStore.updateTitleSearchString(newString);
  }

  toToggleTodo(id: string) {
    this.todoStore.toggleTodo(id);
  }
}
