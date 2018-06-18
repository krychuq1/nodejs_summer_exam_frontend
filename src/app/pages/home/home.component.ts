import { Component, OnInit, OnDestroy} from '@angular/core';
import {User} from '../../model/User';
import {UserService} from '../../services/user.service';
import {TaskService} from '../../services/task.service';
import {Router} from '@angular/router';
import {ShareTaskService} from '../../services/shareTask.service';
import * as io from 'socket.io-client';
import Config from '../../../../app-config';
import {LocalStorage} from '@ngx-pwa/local-storage';

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
  token: string;

  public socket;
  public history: Array<any>;

  constructor(public userService: UserService, public shareTaskSevice: ShareTaskService,
              public taskService: TaskService, public router: Router, protected localStorage: LocalStorage) {


    // CHAT CHAT CAHT START ----------------
    this.chatUsers = [];
    this.showChatWindow = false;
    // connect to socket io
    this.socket = io.connect(Config.nodeApi);

    // when user is logged
    this.socket.on('users', users => {
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
    });
    userService.userEmitter.subscribe({next: (user) => {
        if (user) {
          this.taskService.getTasks();
          this.shareTaskSevice.getFriendsTasks(this.token);
        }
      }});
  }
  // CHAT CHAT CHAT END ------------------------
  deleteTask(taskId) {
    this.taskService.deleteTask(taskId, this.token).subscribe((res) => {
      this.taskService.getTasks();
      this.shareTaskSevice.getFriendsTasks(this.token);
    },err => {

    });
  }
  openChat(username) {
    this.userToChat = username;
    this.showChatWindow = !this.showChatWindow;
    console.log('you are going to open chat for ', username);
  }

  updateTask(task) {
  }

  shareTask(task) {
    this.taskService.setTask(task._id);
    this.router.navigate(['/share-task/' + task._id]);
  }

  ngOnInit(): void {
    console.log('on init');
    // get token form ls
    this.localStorage.getItem('token').subscribe(token => {
      if (token) {
        this.token = token;
        this.taskService.getTasks();
        this.shareTaskSevice.getFriendsTasks(this.token);
      }
    });
    setTimeout(() => {
      // userService.user && taskService.tasks && taskService.tasks.length === 0
      // && shareTaskSevice.tasks && shareTaskSevice.tasks.length === 0"
      console.log(this.userService.user, this.taskService.tasks);
    }, 2000);
  }

  ngOnDestroy() {
      this.socket.disconnect();
      console.log('home destroy');
  }
}
