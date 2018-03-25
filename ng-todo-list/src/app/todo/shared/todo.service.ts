import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Todo } from './todo.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';

interface TodoPayload {
  id: string;
  title: string;
  done: boolean;
}

@Injectable()
export class TodoService {
  private static collectionName = 'todo';
  constructor(private db: AngularFirestore) {}

  todos(): Observable<Todo[]> {
    return this.db
      .collection(TodoService.collectionName, ref => ref.orderBy('done', 'asc'))
      .valueChanges()
      .map(values => {
        return values.map(value => {
          const payload = value as TodoPayload;
          return new Todo(payload.id, payload.title, payload.done);
        });
      });
  }

  add(todo: Todo) {
    this.db
      .collection(TodoService.collectionName)
      .add({ ...todo })
      .then(
        val => {
          todo.id = val.id;
          this.update(todo);
        },
        err => console.log(err)
      );
  }

  delete(id: string) {
    this.db.doc(`${TodoService.collectionName}/${id}`).delete();
  }

  update(todo: Todo) {
    const doc = this.db.doc(`${TodoService.collectionName}/${todo.id}`);
    doc.update({ ...todo });
  }
}
