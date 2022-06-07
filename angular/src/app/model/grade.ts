import {Course} from "./course.model";

export class Grade {
  id : number;
  course : Course;
  grade : number;
  title : string;
  description : string;
  date : Date;
}
