import { Component, OnInit } from '@angular/core';
import {TeacherService} from "../services/teacher.service";
import {Teacher} from "../model/teacher.model";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  teachers : Array<Teacher>;
  searchTeachers : Array<Teacher>;
  isDeleted = false;
  isDeletedFailed = false;
  errorMessage = '';

  constructor(private teacherService : TeacherService) {
    this.teachers = new Array<Teacher>();
    this.searchTeachers = new Array<Teacher>();
  }

  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe(teachers => {
      this.teachers = teachers.sort((a,b) => {
        if(a.user.lastname > b.user.lastname) return 1;
        if(a.user.lastname < b.user.lastname) return -1;
        else return 0;
      });
      this.searchTeachers = this.teachers;
    });
  }

  search(event: KeyboardEvent){
    let searchString : string = (<HTMLInputElement>event.target).value;
    if (searchString == null || searchString == "") {
      this.searchTeachers = this.teachers;
    } else {
      this.searchTeachers = this.teachers.filter(function (value, index, array) {
        return value.user.lastname.startsWith(searchString) || value.user.username.startsWith(searchString);
      });
    }
  }

  delete(teacher : Teacher) {
    this.teacherService.deleteTeacher(teacher.id).subscribe(
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
