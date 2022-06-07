import { Component, OnInit } from '@angular/core';
import {Course} from "../model/course.model";
import {Student} from "../model/student.model";
import {Grade} from "../model/grade";
import {Navigation, Router} from "@angular/router";
import {GradeService} from "../services/grade.service";

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  course : Course;
  student : Student;
  grade : Grade;
  isGradeFailed = false;
  errorMessage = '';

  constructor(private router : Router, private gradeService : GradeService) {
    let nav = this.router.getCurrentNavigation();

    if (nav && nav.extras && nav.extras.state && nav.extras.state['grade'] && nav.extras.state['student'] && nav.extras.state['course']) {
      this.grade = nav.extras.state['grade'];
      this.student = nav.extras.state['student'];
      this.course = nav.extras.state['course'];
    } else {
      console.log('Error retrieving data from grade and student');
      window.location.replace('/teacherCourses');
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.gradeService.updateGrade(this.grade).subscribe(
      _=> window.location.replace('/manageCourse/'+this.course.code),
      error => {
        this.isGradeFailed = true;
        this.errorMessage = error.error.message;
      }
    )
  }

}
