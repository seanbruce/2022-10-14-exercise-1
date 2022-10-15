import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './index.component.html',
  styles: [
    `.todo-list-title {
      font-size: 1.125rem;
      line-height: 1.75rem;
      font-weight: bold;
      color:#334155;
  }
  
  .todo-container {
      max-width: 800px;
  }`
  ]
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
