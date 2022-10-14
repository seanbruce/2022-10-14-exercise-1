import { NgModule } from '@angular/core';
import { TodosComponent } from './todos.component';
import {TodoRoutingModule} from "./todos-routing.module"


@NgModule({
  imports: [TodoRoutingModule],
  declarations: [
    TodosComponent
  ],
  exports: [TodosComponent]
})
export class TodosModule { }
