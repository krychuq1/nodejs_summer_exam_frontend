import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/User';
import Config from '../../../app-config';


@Injectable()
export class UserService {
  public userEmitter: EventEmitter<User> = new EventEmitter();
  private backend = Config.nodeApi;
  private headers = new HttpHeaders();

  user: User;

  constructor( private http: HttpClient) {
  }

  getUserBasedToken(token: string) {
    const url = this.backend;
    this.headers = this.headers.set('x-access-token', token);
    this.http.post(url, {}, {headers: this.headers}).subscribe((user) => {
      const tempUser = user as User;
      this.user = new User(tempUser.companyName, tempUser.email, tempUser.password, tempUser.image, tempUser.role);
      this.userEmitter.emit(this.user);
    });
  }
  public setUser(user) {
    if (user) {
      this.user = new User(user.companyName, user.email, user.password, user.image, user.role);
    } else {
      this.user = user;
    }
    this.userEmitter.emit(this.user);
  }

}
