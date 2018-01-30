import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class TodoService {
  toDoList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }

  getToDoList() {
    return this.toDoList = this.firebasedb.list('titles');
  }

  addTitle(title: string, priority: string) {
    let name = priority == '0' ? 'Major' : priority == '1' ? 'Moderate' : 'Minor';
    this.toDoList.push({
      title: title,
      isChecked: false,
      priority: priority,
      priorityName: name
    })
  }

  toggleTitle($key: string, flag: boolean) {
    this.toDoList.update($key, { isChecked: flag });
  }

  removeTitle($key: string) {
    this.toDoList.remove($key);
  }

  uploadFromFile(obj: any) {
    this.toDoList.push({
      title: obj.title,
      isChecked: obj.isChecked,
      priority: obj.priority,
      priorityName: obj.priorityName
    })
  }
}
