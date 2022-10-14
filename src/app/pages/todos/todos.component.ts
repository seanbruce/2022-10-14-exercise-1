import { Component, OnInit } from '@angular/core';

import {TodoStore} from './todos.store'

/**
 * 功能
 * 按todo名稱搜索(前端搜索)[]
 * 添加todo[]
 * 編輯todo[]
 * 完成|未完成 狀態切換[]
 * 分頁(前端分頁)
 */

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers: [TodoStore]
})
export class TodosComponent implements OnInit {
  list$ = this.todoStore.todos$;
  isEditorOpen$ = this.todoStore.isEditorOpen$
  editorTitle$ = this.todoStore.editorMode$

  constructor(private readonly todoStore: TodoStore) {};

  ngOnInit(): void {
   
  }

  toOpenEditor() {
    this.todoStore.openEditor();
  }

  toCloseEditor() {
    this.todoStore.closeEditor();
  }

}
