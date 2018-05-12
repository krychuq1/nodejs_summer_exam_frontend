import { Component, OnInit, OnDestroy} from '@angular/core';
import {User} from "../../model/User";
import {UserService} from "../../services/user.service";
import {HomeService} from "../../services/home.service";
import {TaskService} from "../../services/task.service";
import {Router} from "@angular/router";
import {ShareTaskService} from "../../services/shareTask.service";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import * as io from 'socket.io-client';
import Config from '../../../../app-config';
import {nextTick} from 'q';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  user: User;
  homeService;
  chatUsers: Array<any>;
  showChatWindow: boolean;
  userToChat: any;
  public socket;
  public history: Array<any>;

  constructor(public userService: UserService,
              public hoS: HomeService, public shareTaskSevice: ShareTaskService,
              public taskService: TaskService, public router: Router) {
    this.homeService = hoS;
    this.chatUsers = [];
    this.showChatWindow = false;
    this.reloadHomePage( Cookie.get('token'));
    // connect to socket io
    this.socket = io.connect(Config.nodeApi);
    this.userService.onChange.subscribe({next: data => {
        console.log(data, 'here here here');

      }});
    // when user is logged
    userService.userEmiter.subscribe({next: (data) => {
        if (data) {
          this.socket.emit('new user', this.userService.user.companyName);
          this.taskService.getTasks();
          this.shareTaskSevice.getFriendsTasks();
        } else {
          this.chatUsers = [];
        }
    }});
    this.socket.on('users', users => {
      console.log(users, " <--- users from server");
      this.chatUsers = [];
      for(let i = 0; i < users.length; i++){
        console.log(users[i]);
        this.chatUsers.push({username: users[i], unread: 0});
      }
    });
    this.socket.on('receive', data => {
      for(let i = 0; i < this.chatUsers.length; i ++){
        if(this.chatUsers[i].username === data.sender){
          this.chatUsers[i].unread ++;
        }
      }
      console.log('you receive msg', data);
    });
    this.socket.on('history', history => {
      this.history = history;
      console.log('hiosrty event get trigger ', history);
    })

  }

  deleteTask(taskId) {
    this.taskService.deleteTask(taskId).subscribe((res) => {
      this.taskService.getTasks();
      this.shareTaskSevice.getFriendsTasks();
    },err => {

    });
  }
  openChat(username) {
    this.userToChat = username;
    this.showChatWindow = !this.showChatWindow;
    console.log('you are going to open chat for ', username);
  }
  reloadHomePage(token) {
    console.log('reload reload page');
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

  ngOnInit(): void {
    console.log('init');
  }

  ngOnDestroy() {
      this.socket.disconnect();
      console.log('home destroy');
  }


}
