import { Component, OnInit } from '@angular/core';
import {CourseService} from "../services/course.service";
import {Course} from "../model/course.model";
import {TokenStorageService} from "../auth/token-storage.service";
import {Student} from "../model/student.model";
import {StudentService} from "../services/student.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  isDeleted = false;
  isDeletedFailed = false;
  courseList: Array<Course>;
  searchCourse: Array<Course>;
  roles : string[];
  isJoined = false;
  isJoinFailed = false;
  errorMessage = '';

  constructor(private courseService : CourseService, private tokenStorage : TokenStorageService, private studentService : StudentService) {
    this.searchCourse = new Array<Course>();
    this.roles = this.tokenStorage.getAuthorities();
  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courseList = data;
      this.courseList.sort(function(a,b) {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        else return 0;
      });
      this.searchCourse = this.courseList;
    });
  }

  search(event: KeyboardEvent){
    let searchString : string = (<HTMLInputElement>event.target).value;
    if (searchString == null || searchString == "") {
      this.searchCourse = this.courseList;
    } else {
      this.searchCourse = this.courseList.filter(function (value, index, array) {
        return value.name.startsWith(searchString);
      });
    }
  }

  join(course : Course) {
    if (this.roles.includes('ROLE_STUDENT')){
      this.studentService.getStudentByUsername(this.tokenStorage.getUsername()).subscribe(
        student => {
        this.courseService.addStudentToCourse(student, course).subscribe(
          _=>{
            this.isJoined = true;
            this.isJoinFailed = false;
          },
          error => {
            this.isJoined = false;
            this.isJoinFailed = true;
            this.errorMessage = error.error.message;
          }
        );
      },
        error => {
        this.isJoined = false;
        this.isJoinFailed = true;
        this.errorMessage = error.error.message;
        });
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      window.location.replace("/auth/login");
    }
  }

  delete(course : Course) {
    this.courseService.deleteCourse(course.code).subscribe(
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
