import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})

export class TodoComponent implements OnInit {
  title = 'list';

  starts: number;
  ends: number;

  startsFrom(date) {
    this.starts = +date;
  }

  endsAt(date) {
    this.ends = +date;
  }

  constructor(private toDoService: TodoService) { }
  ngOnInit() {
  }


  onAdd(itemTitle, itemPriority, itemContent) {
    this.toDoService.addTitle(itemTitle.value, itemContent.value, itemPriority.value, this.starts, this.ends);
    itemTitle.value = null;
  }
}