import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Questionnaire } from '../../models/questionnaire/questionnaire';
import { ReplaySubject } from 'rxjs';
import { AccountService } from '../account-service/account.service';
import { UserServiceService } from 'src/app/core/services/user-service/user-service.service';
import { Account } from '../../models/account/account';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  private url = 'http://localhost:8080/coreFinalProject/questionnaire/questionnaire/';
  public pendingQuestionnaires = [];
  public pendingQuestionnaires$: ReplaySubject<Questionnaire[]> = new ReplaySubject(1);

  constructor(
    private http: HttpClient,
    private userService: UserServiceService,
    private accountService: AccountService) {
  }

  public getPendingQuestionnaires() {
    let currentUserId: number = this.userService.getCurrentUser().id;
    this.accountService.getAccountByUserId(currentUserId).subscribe(
      (account: Account) => {
        account.pendingQuestionnaires.forEach(questionnaire => {
          let dateC = new Date(questionnaire.createDate);
          questionnaire.formattedCreateDate = dateC.getDate().toString().padStart(2, '0') + "/" + (dateC.getMonth() + 1).toString().padStart(2, '0') + "/" + dateC.getFullYear();
          let dateLM = new Date(questionnaire.lastModifiedDate);
          questionnaire.formattedLastModifiedDate = dateLM.getDate().toString().padStart(2, '0') + "/" + (dateLM.getMonth() + 1).toString().padStart(2, '0') + "/" + dateLM.getFullYear();
        });
        this.accountService.setCurrentAccount(account);
        this.pendingQuestionnaires = account.pendingQuestionnaires;
        this.pendingQuestionnaires$.next(this.pendingQuestionnaires);
      });
  }

  public getAllQuestionnaires() {
    return this.http.get(this.url);
  }

  public getQuestionnaire(id: number) {
    return this.http.get(this.url + id);
  }

  public createQuestionnaire(questionnaire: Questionnaire) {
    return this.http.post(this.url, questionnaire, { responseType: 'text' });
  }

  public updateQuestionnaire(questionnaire: Questionnaire) {
    return this.http.put(this.url, questionnaire, { responseType: 'text' });
  }

  public deleteQuestionnaire(id: number) {
    return this.http.delete(this.url + id, { responseType: 'text' });
  }

  public getAnsweredQuestionnaireByAccountId(id: number) {
    return this.http.get(this.url + 'account/' + id);
  }

  // Ir buscar
  // public createQuestionnaireWithAccount(id: number, arrayIds: number[]){
  //   return this.http.post(this.url + id + "/accounts", arrayIds, {responseType: 'text'});
  // }

  public createQuestionnaireWithAccountId(questionnaire: Questionnaire, arrayIds: number[]) {
    let query = "query?id=";
    arrayIds.forEach(element => { query += "," + String(element) });
    return this.http.post(this.url + query, questionnaire, { responseType: 'text' });
  }
}
