import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';



@Component({
  selector: 'chatWindow',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  @Input() user;
  @Input() socket;
  public history: Array<any>;
  public messages: Array<string>;

  constructor(public userService: UserService) {

  }

  ngOnInit(): void {
    this.socket.on('history', history=>{
      this.history = history;
      console.log('hiosrty event get trigger ', history);
  })

  }
  sent(event, form){
    if(event.keyCode == 13) {
      console.log('you are going to send');
      console.log(form.value.chatMsg);
      let msg = form.value.chatMsg;
      // this.messages.push(msg);
      form.reset();
      this.socket.emit('send message', {msg: msg, sender: this.userService.user.companyName, receiver: this.user});

      // this.socket.emit('send message', form.value.chatMsg);
    }
  }




}

