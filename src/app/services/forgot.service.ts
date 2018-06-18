import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import Config from '../../../app-config';
import {ToastrService} from 'ngx-toastr';


@Injectable()
export class ForgotService {

  private testUrl = Config.nodeApi;
  private error: boolean = false;
  constructor( private http: HttpClient, private toastr: ToastrService) {}

  forgotPassword(email) {
    this.http
      .post(this.testUrl + 'users/forgot', {email: email})
      .subscribe(
        // Successful responses call the first callback.
        data => {
          this.toastr.success('Email was send');
        },
        // Errors will call this callback instead:
        err => {
          this.toastr.success('Email was send');
        }
      );
  }



}
