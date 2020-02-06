import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { UserServiceService } from '../core/services/user-service/user-service.service';
import { Account } from './models/account/account';
import { AccountService } from './services/account-service/account.service';


@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  private currentAccount: Account;


  constructor(
    private location: Location,
    private accountApi: AccountService
  ) {}

  ngOnInit() {

  }

  public goBack(): void {
    this.location.back();
  }
}
