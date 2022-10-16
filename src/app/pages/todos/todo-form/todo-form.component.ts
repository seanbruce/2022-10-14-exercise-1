import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TodoStore } from '../todos.store';
import { combineLatest, first } from 'rxjs';

export class TodoEditForm {
  title: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styles: [``],
})
export class TodoFormComponent implements OnInit {
  editForm = new FormGroup<TodoEditForm>({
    title: new FormControl(),
    description: new FormControl(),
  });

  constructor(private readonly todoStore: TodoStore) {}

  ngOnInit(): void {
    this.todoStore.defaultFormValues$.subscribe((defaultValue) => {
      if (defaultValue === null) {
        return;
      }
      this.editForm.setValue({
        title: defaultValue.title,
        description: defaultValue.description,
      });
    });
  }

  submitForm(): void {
    if (this.editForm.valid) {
      console.log('submit', this.editForm.value);
      combineLatest([
        this.todoStore.editorMode$,
        this.todoStore.defaultFormValues$,
      ])
        .pipe(first())
        .subscribe(([mode, defaultFormValue]) => {
          switch (mode) {
            case 'create':
              this.todoStore.addTodo(this.editForm.value as any);
              break;
            case 'update':
              this.todoStore.editTodo({
                ...defaultFormValue,
                ...this.editForm.value,
              });
          }
        });
    } else {
      Object.values(this.editForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
