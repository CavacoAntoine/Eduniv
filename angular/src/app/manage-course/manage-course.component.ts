import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../services/course.service";
import {Course} from "../model/course.model";
import {Student} from "../model/student.model";
import {Grade} from "../model/grade";
import {StudentService} from "../services/student.service";

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css']
})
export class ManageCourseComponent implements OnInit {

  course : Course;
  studentList : Array<Student>;
  studentSearchList : Array<Student>;
  studentGrades : Map<number, Array<Grade>>;

  constructor(private activatedRoute : ActivatedRoute, private courseService : CourseService, private studentService : StudentService) {
    this.studentGrades = new Map<number, Array<Grade>>();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      this.courseService.getCourse(<string>params.get('code')).subscribe(
        course => {
          this.course = course;
          this.studentList = this.course.students;
          this.studentSearchList = this.course.students;
          course.students.forEach(student => {
            this.studentService.getGradeForCourse(course.code, student.user.username).subscribe(
              grades => {
                this.studentGrades.set(student.id, grades);
              });
          })
        })
    });
  }

  search(event: KeyboardEvent){
    let searchString : string = (<HTMLInputElement>event.target).value;
    if (searchString == null || searchString == "") {
      this.studentSearchList = this.studentList;
    } else {
      this.studentSearchList = this.studentList.filter(function (value, index, array) {
        return value.user.firstname.startsWith(searchString) || value.user.lastname.startsWith(searchString) || value.user.username.startsWith(searchString);
      });
    }
  }

  deleteGrade(grade : Grade, student : Student) {
    this.studentService.deleteGrade(grade.id, student.id).subscribe(_=>window.location.reload())
  }

}
