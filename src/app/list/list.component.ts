import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { TodoService } from '../todo/shared/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements AppComponent {
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

  sortBy(keyVal: any) {
    let key = keyVal === '1' ? 'isChecked' : keyVal === '2' ? 'priority' : 'title';
    this.toDoListArray.sort((a, b) => {
      if (typeof a[key] === 'string') {
        return a[key].localeCompare(b[key])
      }
      return a[key] - b[key];
    })
  }

  toggleDoneVisibility() {
  }



  onAdd(itemTitle, itemPriority) {
    this.toDoService.addTitle(itemTitle.value, itemPriority.value);
    itemTitle.value = null;
  }

  alterCheck($key: string, isChecked) {
    this.toDoService.toggleTitle($key, !isChecked);
  }

  onDelete($key: string) {
    this.toDoService.removeTitle($key);
  }

  downloadJSON(toDoListArray: any) {
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
