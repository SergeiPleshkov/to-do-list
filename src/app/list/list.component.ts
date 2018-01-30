import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { TodoService } from '../todo/shared/todo.service';
import { Element } from '@angular/compiler';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent {
  title = 'list';
  toDoListArray: any[];
  constructor(private toDoService: TodoService) { }

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges()
      .subscribe(item => {
        this.toDoListArray = [];
        item.forEach(el => {
          let i = el.payload.toJSON();
          i["$key"] = el.key;
          this.toDoListArray.push(i);
        })

        this.toDoListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        })
      });
  }

  sortBy(val: any) {
    const key = {
      '1': 'isChecked',
      '2': 'priority',
      '3': 'title'
    }
    this.toDoListArray.sort((a, b) => {
      if (typeof a[key[val]] === 'string') {
        return a[key[val]].localeCompare(b[key[val]])
      }
      return a[key[val]] - b[key[val]];
    })
  }

  toggleDoneVisibility() {
  }

  onAdd(itemTitle, itemPriority) {
    this.toDoService.addTitle(itemTitle.value, itemPriority.value);
    itemTitle.value = null;
  }

  alterCheck($key: string, isChecked: boolean) {
    this.toDoService.toggleTitle($key, !isChecked);
  }

  onDelete($key: string) {
    this.toDoService.removeTitle($key);
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
    console.log(e.target.result)
    let arr = JSON.parse(e.target.result);
    console.log(arr)
    arr.forEach(elem => {
      this.toDoService.uploadFromFile(elem);
    })
  }
}
