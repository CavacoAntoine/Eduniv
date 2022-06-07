import {User} from "./user.model";
import {Grade} from "./grade";

export class Student {
  id: number;
  user : User;
  grades : Array<Grade>;

  constructor() {
    this.id = 0;
    this.user = new User();
    this.grades = new Array<Grade>();
  }

}
