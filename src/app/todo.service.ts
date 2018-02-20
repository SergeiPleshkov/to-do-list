import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

const name: object = {
  '0': 'Major',
  '1': 'Moderate',
  '2': 'Minor'
}
@Injectable()
export class TodoService {
  toDoList: AngularFireList<any[]>;
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  userId: any;


  constructor(private firebasedb: AngularFireDatabase, private _firebaseAuth: AngularFireAuth) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          this.userId = user.uid;
        } else {
          this.userDetails = null;
        }
      }
    );
  }
  getToDoList(): any {
    return this.firebasedb.list(`lists/${this.userId}`)
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