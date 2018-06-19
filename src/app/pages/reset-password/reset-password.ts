import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {ResetPasswordService} from '../../services/reset-password.service';

@Component({
  selector: 'app-new',
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.scss']
})
export class ResetPasswordComponent implements OnInit {


  private newPassword;

  constructor(private route: ActivatedRoute, private passwordService: ResetPasswordService) {
  }

  newPasswordForm = new FormGroup ({
    newPassword: new FormControl(),
    repeatPassword: new FormControl(),

  });

  resetPassword() {

    if (this.newPasswordForm.controls.newPassword.value === this.newPasswordForm.controls.repeatPassword.value) {
      this.passwordService.changePassword(this.newPasswordForm.controls.newPassword.value, this.route.snapshot.paramMap.get('token'));

    }
    else {
    }

  }
  ngOnInit() {

  }

}
