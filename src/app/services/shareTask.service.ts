import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, OnInit, ViewContainerRef} from '@angular/core';
import Config from '../../../app-config';
import {Board} from '../model/board';
import {Task} from '../model/task';
import {Router} from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {UserService} from './user.service';


@Injectable()
export class ShareTaskService {

  private testUrl = Config.nodeApi + 'shareTask/';
  private headers = new HttpHeaders();
  public tasks: Task[];
  private task: String;

  constructor( private http: HttpClient, private router: Router, private userService: UserService) {
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');

    }

  shareTaskWith(board: Board) {
    this.headers = this.headers.set('X-Access-Token', this.userService.token);

      return new Promise((resolve, reject) => {
        this.http
          .post(this.testUrl + board.taskId, board,{headers: this.headers} )
          .subscribe(
            // Successful responses call the first callback.
            data => {
              setTimeout(() => this.router.navigate(['']),1000);
            },
            error => { // Error
              reject(error);
            }
          );
      })
    }

  getFriendsTasks(token: string): void {
      this.getTasksForUser(token).subscribe((res: Task[]) => {
        this.tasks = res['tasks'];
      },error => {
        console.log(error);
      } );
  }
  getTasksForUser(token) {
    const url = this.testUrl + 'requests';
    this.headers = this.headers.set('X-Access-Token', token);
    return this.http.get(url, {headers: this.headers});
  }




}
