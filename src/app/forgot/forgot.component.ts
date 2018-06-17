import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ForgotService} from "./forgot.service";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  private forgotService;

  constructor(forgotService: ForgotService, public vcr: ViewContainerRef) {
    this.forgotService = forgotService;

  }


  retypeEmailFrom = new FormGroup ({
    email: new FormControl(),
  })



  RetypeEmail() {
    this.forgotService.forgotPassword(this.retypeEmailFrom.controls.email.value);

  }



  ngOnInit() {
  }

}
