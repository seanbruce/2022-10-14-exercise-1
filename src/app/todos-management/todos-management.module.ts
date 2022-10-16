import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosManagementRoutingModule } from './todos-management-routing.module';
import { IndexComponent } from './components/index/index.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    IndexComponent,
    TodoListComponent,
    TodoFormComponent
  ],
  imports: [
    CommonModule,
    NzListModule,
    NzInputModule,
    NzAvatarModule,
    NzGridModule,
    NzButtonModule,
    NzPaginationModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    TodosManagementRoutingModule,
    NzCardModule
  ]
})
export class TodosManagementModule { }
