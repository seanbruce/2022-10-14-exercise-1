import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { IndexStore } from './index.store';

@Component({
  templateUrl: './index.component.html',
  styles: [],
  providers: [IndexStore],
})
export class IndexComponent implements OnInit {
  listSapn$ = this.indexStore.selectedTodo$.pipe(
    map((x) => (x === null ? 24 : 14))
  );
  detailSapn$ = this.indexStore.selectedTodo$.pipe(
    map((x) => (x === null ? 0 : 10))
  );
  constructor(private indexStore: IndexStore) {}

  ngOnInit(): void {}
}
