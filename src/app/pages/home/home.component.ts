import { Component, OnInit } from '@angular/core';
import {User} from "../../model/User";
import {UserService} from "../../services/user.service";
import {HomeService} from "../../services/home.service";
import {TaskService} from "../../services/task.service";
import {Router} from "@angular/router";
import {ShareTaskService} from "../../services/shareTask.service";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import * as io from 'socket.io-client';
import Config from '../../../../app-config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  user: User;
  homeService;
  private socket;


  constructor(public userService: UserService,
              public hoS: HomeService, public shareTaskSevice: ShareTaskService,
              public taskService: TaskService, public router: Router) {

    this.homeService = hoS;
    this.reloadHomePage( Cookie.get('token'));
    console.log(io);
    this.socket = io.connect(Config.nodeApi);
    // this.socket.emit('send message', 'yoyoyoyoyoy');
    this.socket.on('new message', (data) => {
      console.log(data);
    });
    userService.userEmiter.subscribe({next: ()=>{
      this.taskService.getTasks();
      this.shareTaskSevice.getFriendsTasks();
      this.socket.emit('new user', this.userService.user.companyName);

    }});
  }
  deleteTask(taskId){
    this.taskService.deleteTask(taskId).subscribe((res)=>{
      this.taskService.getTasks();
      this.shareTaskSevice.getFriendsTasks();
    },err=>{

    });
  }
  reloadHomePage(token){
    if(token){
      let result = this.homeService.reloadHomePage(token);
    }
    else{
    }
  }
  updateTask(task){
  }

  shareTask(task){
    this.taskService.setTask(task._id);
    this.router.navigate(['/share-task/'+task._id]);
  }




}
