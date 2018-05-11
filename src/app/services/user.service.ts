import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/User";


@Injectable()
export class UserService {
  public userEmiter: EventEmitter<User> = new EventEmitter();
  public onChange: EventEmitter<any> = new EventEmitter();

  user: User;

  constructor( private http: HttpClient) {
  }
  public doMagic(){
    console.log('do maginc');
    this.onChange.emit('test');
  }
  public setUser(user){
    if(user){
      this.user = new User(user.companyName, user.email, user.password, user.image, user.role);
    }else {
      this.user = user;
    }
    console.log('EMIT EMIT EMIT!!!!!!!!');
    this.userEmiter.emit(this.user);
  }




}
