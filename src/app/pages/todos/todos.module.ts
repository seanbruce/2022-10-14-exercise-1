import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzInputModule } from 'ng-zorro-antd/input';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzButtonModule} from 'ng-zorro-antd/button'
import {NzPaginationModule} from 'ng-zorro-antd/pagination'
import {NzModalModule} from 'ng-zorro-antd/modal'
import {NzFormModule} from 'ng-zorro-antd/form'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsProviderModule } from '../../icons-provider.module';

import { TodosComponent } from './todos.component';
import { TodoRoutingModule } from './todos-routing.module';
import { TodoFormComponent } from './todo-form/todo-form.component';

@NgModule({
  imports: [
    TodoRoutingModule,
    NzListModule,
    NzInputModule,
    NzAvatarModule,
    NzGridModule,
    NzButtonModule,
    NzPaginationModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    IconsProviderModule,
  ],
  declarations: [TodosComponent, TodoFormComponent],
  exports: [TodosComponent],
})
export class TodosModule {}
