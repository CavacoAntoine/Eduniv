export class User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  phone: string;
  roles: string[];

  public static copyUser(user:User){
    let newUser = new User();
    newUser.id = user.id;
    newUser.username = user.username;
    newUser.firstname = user.firstname;
    newUser.lastname = user.lastname;
    newUser.phone = user.phone;
    newUser.roles = user.roles;
    return newUser;
  }

}
