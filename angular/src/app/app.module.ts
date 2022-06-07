import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CoursesComponent } from './courses/courses.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { TeacherCoursesComponent } from './teacher-courses/teacher-courses.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { ManageCourseComponent } from './manage-course/manage-course.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { ViewGradeComponent } from './view-grade/view-grade.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { TeachersComponent } from './teachers/teachers.component';
import { StudentsComponent } from './students/students.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    CoursesComponent,
    NewCourseComponent,
    TeacherCoursesComponent,
    EditCourseComponent,
    StudentCoursesComponent,
    ManageCourseComponent,
    AddNoteComponent,
    ViewGradeComponent,
    EditNoteComponent,
    TeachersComponent,
    StudentsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
