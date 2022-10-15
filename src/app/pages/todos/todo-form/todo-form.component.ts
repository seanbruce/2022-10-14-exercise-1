import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TodoStore } from '../todos.store';

export class TodoEditForm {
  title: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styles: [``]
})
export class TodoFormComponent implements OnInit {

  editForm = new FormGroup<TodoEditForm>({
    title: new FormControl(),
    description: new FormControl(),
  });


  constructor(private readonly todoStore: TodoStore) { }

  ngOnInit(): void {
  }

  submitForm(): void {
    console.log(this.editForm.value);
    if (this.editForm.valid) {
      console.log('submit', this.editForm.value);
      this.todoStore.addTodo(this.editForm.value as any);
    } else {
      Object.values(this.editForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
