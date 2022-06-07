import {Teacher} from "./teacher.model";
import {Student} from "./student.model";

export class Course {
  code: string;
  name: string;
  maximumPlaces: number;
  availablePlaces: number;
  description: string;
  teacher: Teacher;
  students: Array<Student>;

  constructor(code: string, name: string, maximumPlaces: number, description: string, teacher: Teacher) {
    this.code = code;
    this.name = name;
    this.maximumPlaces = maximumPlaces;
    this.availablePlaces = maximumPlaces;
    this.description = description;
    this.teacher = teacher;
    this.students = new Array<Student>();
  }
}
