import { NgModule, } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'todos', loadChildren: () => import('./pages/todos/todos.module').then(m => m.TodosModule) },
  { path: 'todos-management', loadChildren: () => import('./todos-management').then(m => m.TodosManagementModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
