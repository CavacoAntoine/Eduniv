import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {


  private roles?: string[];
  authority: Array<string>;

  constructor(private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    this.authority = new Array<string>();
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_STUDENT') {
          this.authority.push('student');
        }
        if (role === 'ROLE_TEACHER') {
          this.authority.push('teacher');
        } else {
          return true;
        }
        return false;
      });
    }
  }
}
