import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { TodoService } from '../../todo.service';
import { Element } from '@angular/compiler';
import { NgbdDatepickerAdapter } from '../datepicker-adapter/datepicker-adapter.component';
import { Input } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AuthService } from '../../auth.service';


const key: object = {
  '0': 'isChecked',
  '1': 'priority',
  '2': 'title',
  '3': 'starts',
  '4': 'ends',
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [TodoService]
})
export class ListComponent {
  filter: any = {
    title: '',
    starts: '',
    includes: '',
    ends: '',
    priority: ''
  };
  toDoListArray: any[];
  sort: string = '0';
  item: any;
  done: any;


  constructor(private toDoService: TodoService, private auth: AuthService) { }

  ngOnInit() {
    console.log(1)
    this.toDoService.getToDoList().snapshotChanges()
    .subscribe(item => {
      this.toDoListArray = [];
      console.log(2)
      item.forEach(el => {
        let i = el.payload.toJSON();
        i["$key"] = el.key;
        this.toDoListArray.push(i);
      })
      console.log(3)
        this.sortBy(this.sort)
      });
  }

  sortBy(val: string) {
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

  downloadJSON() {
    let blob = new Blob([JSON.stringify(this.toDoListArray)], {
      type: "text/plain;charset=utf-8"
    });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.json';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.parentElement.removeChild(a);
  }

  uploadJSON(input) {
    let file = input.target.files[0];
    let fr = new FileReader();
    fr.onload = this.receivedText.bind(this);
    fr.readAsText(file);
  }

  receivedText(e) {
    let arr = JSON.parse(e.target.result);
    arr.forEach(elem => {
      this.toDoService.uploadFromFile(elem);
    })
  }
  
}