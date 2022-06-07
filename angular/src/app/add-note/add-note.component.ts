import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../services/course.service";
import {Course} from "../model/course.model";
import {Student} from "../model/student.model";
import {StudentService} from "../services/student.service";
import {Grade} from "../model/grade";
import {Teacher} from "../model/teacher.model";

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  course : Course;
  student : Student;
  grade : Grade;
  isGradeFailed = false;
  errorMessage = '';

  constructor(private activatedRoute : ActivatedRoute, private courseService : CourseService, private studentService : StudentService) {
    this.course = new Course("","",0,"", new Teacher());
    this.student = new Student();
  }

  ngOnInit(): void {
    this.grade = new Grade();
    this.activatedRoute.paramMap.subscribe(params =>{
      this.courseService.getCourse(<string>params.get('code')).subscribe(
        course => {
          this.course = course;
        });
      let id = params.get('id');
      if (id == null ) id = "";
      this.studentService.getStudent(+id).subscribe(
        student => this.student = student
      )
    });
  }

  onSubmit() {
    this.grade.course = this.course;
    this.studentService.addGrade(this.student, this.grade).subscribe(
      _ => {
        window.location.replace("/manageCourse/"+this.course.code);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isGradeFailed = true;
      }
    )
  }

}
