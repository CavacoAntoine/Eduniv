import { Component, OnInit } from '@angular/core';
import {Course} from "../model/course.model";
import {CourseService} from "../services/course.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {TeacherService} from "../services/teacher.service";

@Component({
  selector: 'app-teacher-courses',
  templateUrl: './teacher-courses.component.html',
  styleUrls: ['./teacher-courses.component.css']
})
export class TeacherCoursesComponent implements OnInit {

  courseList: Array<Course>;
  searchCourse: Array<Course>;

  constructor(private courseService : CourseService, private tokenStorage: TokenStorageService, private teacherService : TeacherService) {
    this.searchCourse = new Array<Course>();
  }

  ngOnInit(): void {
    this.teacherService.getTeacherByUsername(this.tokenStorage.getUsername()).subscribe(teacher => {
      this.courseService.getCoursesForTeacher(teacher).subscribe(data => {
        this.courseList = data;
        this.courseList.sort(function(a,b) {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          else return 0;
        });
        this.searchCourse = this.courseList;
      });
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

}
