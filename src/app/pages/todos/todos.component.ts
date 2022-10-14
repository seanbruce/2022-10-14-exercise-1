import { Component, OnInit } from '@angular/core';

import type {TODO} from './fake-todo-api'
import {getTodos} from './fake-todo-api'

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
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  isLoading = true;
  list: TODO[] = [];

  constructor() {};
  

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
   const todos = await getTodos();
   this.list = todos
  }

}
