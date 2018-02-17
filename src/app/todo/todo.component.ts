import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})

export class TodoComponent {
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

  onAdd(itemTitle, itemPriority, itemContent) {
    if (this.starts > this.ends) {
      alert('Start date is after end date, dates swaped');
      let cache = this.starts;
      this.starts = this.ends;
      this.ends = cache;
    }
    if (!itemTitle.value) {
      alert('Task title is required!');
      return;
    }
    this.toDoService.addTitle(itemTitle.value, itemContent.value, itemPriority.value, this.starts, this.ends);
    itemTitle.value = 'Input task name here...';
    itemContent.value = '...and task description here!'
  }
}