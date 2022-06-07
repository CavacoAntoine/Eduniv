import { Component } from '@angular/core';
import {TokenStorageService} from "./auth/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Eduniv';
  private roles?: string[];
  authority: Array<string>;

  constructor(private tokenStorage: TokenStorageService) {  }

  ngOnInit() {
    this.authority = new Array<string>();
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_STUDENT') {
          this.authority.push('student');
        }
        if (role === 'ROLE_TEACHER') {
          this.authority.push('teacher');
        }
        if (role === 'ROLE_ADMIN') {
          this.authority.push('admin');
        }
        else {
          return true;
        }
        return false;
      });
    }
  }
}
