import { Component, OnInit } from '@angular/core';
import {StudentService} from "../services/student.service";
import {Student} from "../model/student.model";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students : Array<Student>;
  searchStudents : Array<Student>;
  isDeleted = false;
  isDeletedFailed = false;
  errorMessage = '';

  constructor(private studentService : StudentService) {
    this.students = new Array<Student>();
    this.searchStudents = new Array<Student>();
  }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(students => {
      this.students = students.sort((a,b) => {
        if(a.user.lastname > b.user.lastname) return 1;
        if(a.user.lastname < b.user.lastname) return -1;
        else return 0;
      });
      this.searchStudents = this.students;
    });
  }

  search(event: KeyboardEvent){
    let searchString : string = (<HTMLInputElement>event.target).value;
    if (searchString == null || searchString == "") {
      this.searchStudents = this.students;
    } else {
      this.searchStudents = this.students.filter(function (value, index, array) {
        return value.user.lastname.startsWith(searchString) || value.user.username.startsWith(searchString);
      });
    }
  }

  delete(student : Student) {
    this.studentService.deleteStudent(student.id).subscribe(
      _ => {
        this.isDeleted = true;
        this.isDeletedFailed = false;
        window.location.reload();
      },
      error => {
        this.isDeleted = false;
        this.isDeletedFailed = true;
        this.errorMessage = error.error.message;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      });
  }
}
