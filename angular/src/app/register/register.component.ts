import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {SignupInfo} from '../auth/signup-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo?: SignupInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  onSubmit() {
    let categories:string[];
    if(this.form.category == 'admin'){
      categories = ['admin'];
    }else if (this.form.category == 'student') {
      categories = ['student'];
    }else if (this.form.category == 'teacher') {
      categories = ['teacher'];
    }else {
      this.isSignUpFailed = true;
      return;
    }


    this.signupInfo = new SignupInfo(
      this.form.email,
      categories,
      this.form.password,
      this.form.firstname,
      this.form.lastname,
      this.form.phone);

    this.authService.signUp(this.signupInfo).subscribe(
      _ => {
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
