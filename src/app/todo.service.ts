import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

const name: object = {
  '0': 'Major',
  '1': 'Moderate',
  '2': 'Minor'
}
@Injectable()
export class TodoService {
  toDoList: AngularFireList<any[]>;


  constructor(private firebasedb: AngularFireDatabase, private auth: AuthService) {  }
  getToDoList(): any {
    return this.firebasedb.list(`lists/${this.auth.userId}`)
  }

  addTitle(title: string, content: string, priority: string, starts: number = +new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), ends: number = +new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
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