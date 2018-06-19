import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import Config from '../../../app-config';
import {Task} from '../model/task';
import {LocalStorage} from '@ngx-pwa/local-storage';

@Injectable()
export class TaskService {

  private url = Config.nodeApi + 'tasks';
  private headers = new HttpHeaders();
  public tasks: Task[];
  private task: String;

  constructor( private http: HttpClient, protected localStorage: LocalStorage) {
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }
  getTasks(): void {
    // console.log('getting tasks ');
    this.localStorage.getItem('token').subscribe(token => {
        this.getTasksForUser(token).subscribe((res: Task[]) => {
          this.tasks = res['tasks'];
        },error => {
        });
    });
  }
  getById(id, token: string) {
    this.headers = this.headers.set('X-Access-Token', token);
    return this.http.get(this.url + '/' + id, {headers: this.headers});

  }
  createEvent(task: Task, token: string) {
    this.headers = this.headers.set('X-Access-Token', token);
   return this.http.post(this.url, task, {headers: this.headers});
  }
  getTasksForUser(token: string) {
    const url = this.url + '/user';
    this.headers = this.headers.set('X-Access-Token', token);
    return this.http.get(url, {headers: this.headers});
  }
  deleteTask(taskId, token: string){
    let url = this.url + '/' + taskId;

    this.headers = this.headers.set('X-Access-Token', token);
    return this.http.delete(url,{headers: this.headers});
  }

  setTask(t) {
    this.task = t;

  }
  updateTask(task, token: string) {
    this.headers = this.headers.set('X-Access-Token', token);
    return this.http.put(this.url + '/' + task._id, task,{headers: this.headers});

  }
  getTask(): String {
    return this.task;
  }



}
