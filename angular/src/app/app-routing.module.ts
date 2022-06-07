import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AccountComponent} from "./account/account.component";
import {RoleGuard} from "./guards/role-guard";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {CoursesComponent} from "./courses/courses.component";
import {NewCourseComponent} from "./new-course/new-course.component";
import {TeacherCoursesComponent} from "./teacher-courses/teacher-courses.component";
import {EditCourseComponent} from "./edit-course/edit-course.component";
import {StudentCoursesComponent} from "./student-courses/student-courses.component";
import {ManageCourseComponent} from "./manage-course/manage-course.component";
import {AddNoteComponent} from "./add-note/add-note.component";
import {ViewGradeComponent} from "./view-grade/view-grade.component";
import {EditNoteComponent} from "./edit-note/edit-note.component";
import {TeachersComponent} from "./teachers/teachers.component";
import {StudentsComponent} from "./students/students.component";

const routes: Routes = [
  { path: 'account', component: AccountComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_STUDENT'] } },
  { path: 'newCourse', component: NewCourseComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_TEACHER'] }},
  { path: 'teacherCourses', component: TeacherCoursesComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_TEACHER'] }},
  { path: 'studentCourses', component: StudentCoursesComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_STUDENT'] }},
  { path: 'editCourse/:code', component: EditCourseComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_TEACHER'] }},
  { path: 'manageCourse/:code', component: ManageCourseComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_TEACHER'] }},
  { path: 'addNote/:code/:id', component: AddNoteComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_TEACHER'] }},
  { path: 'editNote', component: EditNoteComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_TEACHER'] }},
  { path: 'studentCourses/:code', component: ViewGradeComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_STUDENT'] }},
  { path: 'teachers', component: TeachersComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] }},
  { path: 'students', component: StudentsComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] }},
  { path: 'auth/login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'courses', component: CoursesComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
