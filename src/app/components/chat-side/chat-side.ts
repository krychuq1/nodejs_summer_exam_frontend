import {Component, OnDestroy} from '@angular/core';
import {UserService} from '../../services/user.service';
import Config from '../../../../app-config';
import * as io from 'socket.io-client';


@Component({
  selector: 'chat-side',
  templateUrl: './chat-side.html',
  styleUrls: ['./chat-side.scss']
})
export class ChatSideComponent implements OnDestroy {
  chatUsers: Array<any>;
  showChatWindow: boolean;
  userToChat: any;
  public history: Array<any>;
  public socket;

  constructor(public userService: UserService) {
    // Emit new user if we have one
    userService.userEmitter.subscribe({next: (data) => {
        if (data) {
          this.socket.emit('new user', this.userService.user.companyName);
        } else {
          this.chatUsers = [];
        }
      }});
    // CHAT CHAT CAHT START ----------------
    this.chatUsers = [];
    this.showChatWindow = false;
    // connect to socket io
    this.socket = io.connect(Config.nodeApi);

    // when user is logged
    this.socket.on('users', users => {
      this.chatUsers = [];
      for (let i = 0; i < users.length; i++){
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

  }
  openChat(username) {
    this.userToChat = username;
    this.showChatWindow = !this.showChatWindow;
    console.log('you are going to open chat for ', username);
  }
  ngOnDestroy() {
    this.socket.disconnect();
    console.log('home destroy');
  }
}

