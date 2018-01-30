import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class TodoService {
  toDoList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }

  getToDoList() {
    return this.firebasedb.list('titles')
  }

  addTitle(title: string, priority: string) {
    const name = {
      '0': 'Major',
      '1': 'Moderate',
      '2': 'Minor'
    }
    this.getToDoList().push({
      title: title,
      isChecked: false,
      priority: priority,
      priorityName: name[priority]
    })
  }

  toggleTitle($key: string, flag: boolean) {
    this.getToDoList().update($key, { isChecked: flag });
  }

  removeTitle($key: string) {
    this.getToDoList().remove($key);
  }

  uploadFromFile(obj: any) {
    this.getToDoList().push({
      title: obj.title,
      isChecked: obj.isChecked,
      priority: obj.priority,
      priorityName: obj.priorityName
    })
  }
}
