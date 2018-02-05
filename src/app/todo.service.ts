import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

const name: object = {
  '0': 'Major',
  '1': 'Moderate',
  '2': 'Minor'
}@Injectable()
export class TodoService {
  toDoList: AngularFireList<any[]>;


  constructor(private firebasedb: AngularFireDatabase) { }
  getToDoList(): any {
    return this.firebasedb.list('titles')
  }

  addTitle(title: string, content: string, priority: string, starts: number = +Date.now(), ends: number = +Date.now()) {
    this.getToDoList().push({
      title: title,
      content: content,
      isChecked: false,
      priority: priority,
      priorityName: name[priority],
      added: +Date.now(),
      starts: starts,
      ends: ends
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
      content: obj.content,
      isChecked: obj.isChecked,
      priority: obj.priority,
      priorityName: obj.priorityName,
      added: obj.added,
      starts: obj.starts,
      ends: obj.ends
    })
  }
}