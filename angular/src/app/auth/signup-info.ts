export class SignupInfo {

  username: string;
  role: string[];
  password: string;
  firstname: string;
  lastname: string;
  phone: string;

  constructor(email: string,categories: string[], password: string, firstname: string, lastname: string, phone: string) {
    this.username = email;
    this.role = categories;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.phone = phone;
  }
}
