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
export class HomeComponent implements OnInit {

  user: User;
  token: string;

  constructor(public userService: UserService, public shareTaskSevice: ShareTaskService,
              public taskService: TaskService, public router: Router, protected localStorage: LocalStorage) {
    userService.userEmitter.subscribe({next: (user) => {
        if (user) {
          this.taskService.getTasks();
          this.shareTaskSevice.getFriendsTasks(this.userService.token);
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


  updateTask(task) {
  }

  shareTask(task) {
    this.taskService.setTask(task._id);
    this.router.navigate(['/share-task/' + task._id]);
  }

  ngOnInit(): void {
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
      console.log(this.userService.user, this.taskService.tasks, this.shareTaskSevice.tasks);
    }, 2000);
  }


}
