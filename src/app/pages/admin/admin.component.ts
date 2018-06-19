import {UserService} from "../../services/user.service";
import {Component} from "@angular/core";
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";
import {LocalStorage} from '@ngx-pwa/local-storage';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent{
  users: any;
  constructor(public usersService: UsersService, protected localStorage: LocalStorage, private router: Router) {
    this.getAllUsers();
  }
  getAllUsers(){
    this.localStorage.getItem('token').subscribe( token => {
      this.usersService.getUsers(token).subscribe((users) => {
        this.users = users['users'];
      }, err =>{
        console.log(err);
        this.router.navigate(['/']);
      });
    });
  }

}
