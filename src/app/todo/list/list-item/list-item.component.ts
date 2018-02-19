import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../../../todo.service';
import { ListComponent } from '../list.component';
import { Element } from '@angular/compiler';
import { NgbdDatepickerAdapter } from '../../datepicker-adapter/datepicker-adapter.component';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
  providers: [TodoService]
})
export class ListItemComponent implements OnInit {
  constructor(private toDoService: TodoService) { }
  @Input() item: any;
  @Input() toDoListArray: any[];
  @Input() sort: string;
  @Input() done: any;
  @Input() filters: any;

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges()
      .subscribe(item => {
        this.toDoListArray = [];
        item.forEach(el => {
          let i = el.payload.toJSON();
          i["$key"] = el.key;
          this.toDoListArray.push(i);
        })

        this.sortBy(this.sort)
      });
  }

  sortBy(val: string) {
    const key: object = {
      '0': 'isChecked',
      '1': 'priority',
      '2': 'title',
      '3': 'starts',
      '4': 'ends',
    }
    this.toDoListArray.sort((a, b) => {
      return b.added - a.added;
    })
    this.toDoListArray.sort((a, b) => {
      if (typeof a[key[val]] === 'string') {
        return a[key[val]].localeCompare(b[key[val]])
      }
      return a[key[val]] - b[key[val]];
    })
  }

  toggleDoneVisibility() {
  }

  alterCheck($key: string, isChecked: boolean) {
    this.toDoService.toggleTitle($key, !isChecked);
  }

  onDelete($key: string) {
    if (!confirm(`Remove task "${this.item.title}" ?`)) return;
    this.toDoService.removeTitle($key);
  }

  checkFiltered() {
    return (!this.item.title.toUpperCase().includes(this.filters.title.toUpperCase()) && this.filters.title) || 
    (!isNaN(+new Date(this.filters.starts)) && (((+new Date(this.filters.starts)) - 3*60*60*1000) !== +this.item.starts)) || 
    (!isNaN(+new Date(this.filters.ends)) && (((+new Date(this.filters.ends)) - 3*60*60*1000) !== +this.item.ends)) || 
    (!isNaN(+new Date(this.filters.includes)) && !(+new Date(this.filters.includes) > +this.item.starts && +new Date(this.filters.includes) < +this.item.ends));
  }

}
