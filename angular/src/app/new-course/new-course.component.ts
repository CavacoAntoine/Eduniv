import { Component, OnInit } from '@angular/core';
import {User} from "../model/user.model";
import {Teacher} from "../model/teacher.model";
import {Course} from "../model/course.model";
import {TokenStorageService} from "../auth/token-storage.service";
import {AccountService} from "../services/account.service";
import {CourseService} from "../services/course.service";
import {TeacherService} from "../services/teacher.service";

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {

  account: User;
  teacher: Teacher;
  form: any = {};
  course : Course;
  isClassAdded = false;
  isAddClassFailed = false;
  errorMessage = '';

  constructor(private token: TokenStorageService, private accountService: AccountService, private courseService : CourseService, private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.account = new User();
    this.accountService.getAccount(this.token.getUsername()).subscribe(user =>this.account = user);
    this.teacherService.getTeacherByUsername(this.token.getUsername()).subscribe(teacher => this.teacher = teacher);
  }

  onSubmit() {
    this.course = new Course(
      this.form.code,
      this.form.name,
      this.form.places,
      this.form.description,
      this.teacher
    );
    this.courseService.addCourse(this.course).subscribe(
      _ => {
        this.isAddClassFailed = false;
        this.isClassAdded = true;
        this.form.clean;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isAddClassFailed = true;
      }
    )
  }

}
