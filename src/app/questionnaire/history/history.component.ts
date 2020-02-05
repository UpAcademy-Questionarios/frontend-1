import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../services/account-service/account.service';
import { Account } from '../models/account/account';
import { QuestionnaireService } from '../services/questionnaire-service/questionnaire.service';
import { Questionnaire } from '../models/questionnaire/questionnaire';
import { UserServiceService } from 'src/app/core/services/user-service/user-service.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(
    private questService: QuestionnaireService,
    private userService: UserServiceService,
    private accountService: AccountService,
    private router: Router
  ) {
    this.account = accountService.getCurrentAccount();
  }

  private emptyHistory = false;
 private user: User;
  private account: Account;
  private currentRole : string;
  private allHistory: Questionnaire[];
  private history: Questionnaire[];
  public pageOfItems: Array<any>;
  public viewNameQuest = false;
  // Lembrar OnDestroy()
  public filterData: string;
  // sort
  key = 'name'; // set default
  reverse = false;
  // sort
  faSearch = faSearch;
  faTimesCircle = faTimesCircle;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  ngOnInit(

  ) {
    this.viewName();
    this.getCurrentRole();
    this.chooseGet();
  }
  public getCurrentUser() {
    return this.userService.getCurrentUser();
  }

  public getQuestionnaires() {
    this.questService.getAnsweredQuestionnaireByAccountId(this.account.id).subscribe((history: Questionnaire[]) => {
      this.history = history; console.log(history);
      this.historyEmpty();
    });
  }
  public getCurrentRole() {
    this.currentRole = this.getCurrentUser().role;
  }

  public viewAllQuestionnaires(role: string){
    this.questService.getAllAnsweredQuestionnaireByRole(role).subscribe((allHistory: Questionnaire[]) => {
      this.allHistory = allHistory; console.log(allHistory)
      this.historyEmpty();
    })
  }

public chooseGet() {
  if(this.currentRole=="USER"){
    this.getQuestionnaires();
  } else if (this.currentRole== "ADMIN" || this.currentRole=="SUPERUSER"){
    this.viewAllQuestionnaires(this.currentRole);
  }
}

  public showView(data: string[]) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].includes(this.getCurrentUser().role)) {
        return true;
      }
    }


  }
  public onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  public viewThisQuestionnaire(questionnaire: Questionnaire) {
    this.router.navigate(['/questionario/historico/ver'], { state: { quest: questionnaire }, });
    console.log(questionnaire);
  }

  public dateChange(data: Questionnaire) {

    const teste = data.lastModifiedDate;
    const date = new Date(teste);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    const a = (`${day}/${month}/${year}`).toString();
    data.lastModifiedDatestring = a;
    return a;
  }

  public viewName() {
    if (this.userService.isAdmin() || this.userService.isSuperUser()) {
      this.viewNameQuest = true;
    }
  }

  public historyEmpty(){
    if((this.allHistory &&  this.allHistory.length == 0) ||(this.history && this.history.length  == 0)){
     this.emptyHistory = true;
    }
  }
}


