import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { filter, Subscribable, Subscription } from 'rxjs';
import { IndexStore } from '../index/index.store';
// import { TodoStore } from '../todos.store';

export class EditForm {
  title: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styles: [``],
})
export class TodoFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  editForm = new FormGroup<EditForm>({
    title: new FormControl(),
    description: new FormControl(),
  });

  constructor(private indexStore: IndexStore) {
    this.subscription.add(
      this.indexStore.selectedTodo$
        .pipe(filter((x) => x != null))
        .subscribe((x) => {
          this.editForm.patchValue(x);
        })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  toSave() {
    this.indexStore.selectedTodo.title = this.editForm.controls.title.value;
    this.indexStore.selectedTodo.description =
      this.editForm.controls.description.value;
  }
}
