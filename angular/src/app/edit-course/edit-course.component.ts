import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course.model";
import {CourseService} from "../services/course.service";
import {Teacher} from "../model/teacher.model";
import {TokenStorageService} from "../auth/token-storage.service";
import {TeacherService} from "../services/teacher.service";

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  course : Course;
  teacher: Teacher;
  isClassEdited = false;
  isEditClassFailed = false;
  errorMessage = '';
  numberOfStudent : number;

  constructor(private activatedRoute : ActivatedRoute, private token: TokenStorageService, private courseService : CourseService, private teacherService: TeacherService) {
    this.teacher = new Teacher();
    this.course = new Course("" ,"",0,"",this.teacher);
  }

  ngOnInit(): void {
    this.teacherService.getTeacherByUsername(this.token.getUsername()).subscribe(teacher => this.teacher = teacher);
    this.activatedRoute.paramMap.subscribe(params =>{
      this.courseService.getCourse(<string>params.get('code')).subscribe(
        course => {
          this.course = course;
          this.numberOfStudent = this.course.maximumPlaces - this.course.availablePlaces;
      })
    });
  }

  onSubmit() {
    this.courseService.updateCourse(this.course).subscribe(
      _ => {
        this.isClassEdited = true;
        this.isEditClassFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isEditClassFailed = true;
      }
    )
  }

}
