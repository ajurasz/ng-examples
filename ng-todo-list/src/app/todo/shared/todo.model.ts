export class Todo {
  constructor(public id: string, public title: string, public done: boolean) {}

  toggle(): Todo {
    return new Todo(this.id, this.title, !this.done);
  }
}
