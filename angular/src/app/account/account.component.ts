import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {AccountService} from "../services/account.service";
import {User} from "../model/user.model";

@Component({
  selector: 'app-home',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  info: any;
  account: User;
  old_account: User;
  editMod = false;
  isModifyFailed = false;
  errorMessage = '';

  constructor(private token: TokenStorageService, private accountService: AccountService) { }

  ngOnInit() {
    this.account = new User();

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };

    this.accountService.getAccount(this.token.getUsername())
      .subscribe(account => this.account = account);

    if (this.info.authorities == "ROLE_STUDENT") {
      this.info.authorities = ['student'];
    } else if (this.info.authorities == "ROLE_TEACHER") {
      this.info.authorities = ['teacher'];
    } else if (this.info.authorities == "ROLE_ADMIN") {
      this.info.authorities = ['admin'];
    }

  }

  logout() {
    this.token.signOut();
    window.location.replace('/auth/login');
  }

  setEditMod(value: boolean) {
    if (value) {
      this.old_account = User.copyUser(this.account);
    } else {
      this.account = this.old_account;
    }
    this.editMod = value;
  }

  onSubmit() {
    this.accountService.updateAccount(this.account).subscribe(
      data => {
        this.editMod = false;
        this.isModifyFailed = false;
      },
      error => {
        console.log(error);
        this.editMod = true;
        this.isModifyFailed = true;
      }
    )
  }

}
