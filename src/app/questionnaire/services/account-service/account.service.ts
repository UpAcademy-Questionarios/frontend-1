import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../../models/account/account';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url: string = 'http://localhost:8080/coreFinalProject/questionnaire/account/';
  private currentAccount: Account = new Account();
  public currentAccount$: ReplaySubject<Account> = new ReplaySubject(1);

  constructor(
    private http: HttpClient,
  ) {
    this.currentAccount$.next(new Account());
   }

  public getAccountByUserId(userId: number) {
    return this.http.get(this.url + "user/" + userId);
  }

  public setCurrentAccount(account: Account){
    this.currentAccount = account;
    this.currentAccount$.next(this.currentAccount);
  }

  public getCurrentAccount() {
    return this.currentAccount;
  }

  public getAllAccounts() {
    return this.http.get(this.url);
  }

  public getAccount(id: number){
    return this.http.get(this.url + id);
  }

  public createAccount(account: Account) {
    return this.http.post(this.url, account, {responseType: 'text'});
  }

  public updateAccount(account: Account){
    return this.http.put(this.url, account, {responseType: 'text'});
  }

  public deleteAccount(id: number){
    return this.http.delete(this.url + id);
  }
  
  public getAcademies(){
    return this.http.get(this.url + "academies");
  }

  public getUsersByAcademy(academy: number){
    return this.http.get(this.url + "academies/" + academy);
  }

}
