import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionnaireService } from '../services/questionnaire-service/questionnaire.service';
import { Questionnaire } from '../models/questionnaire/questionnaire';
import { UserServiceService } from 'src/app/core/services/user-service/user-service.service';
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import { Answer } from '../models/answer/answer';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account-service/account.service';

@Component({
  selector: 'app-to-answer',
  templateUrl: './to-answer.component.html',
  styleUrls: ['./to-answer.component.scss']
})
export class ToAnswerComponent implements OnInit {

  private currentQuestionnaire: Questionnaire;
  private userName: string;
  private startingTime: number;
  faAngleDoubleDown = faAngleDoubleDown;
  faAngleDoubleUp = faAngleDoubleUp;

  constructor(
    private router: Router,
    private questionnaireService: QuestionnaireService,
    private userService: UserServiceService,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {
    this.userName = userService.getCurrentName();
    let questionnaireId: number = this.router.getCurrentNavigation().extras.state.id;
    this.questionnaireService.getQuestionnaire(questionnaireId).subscribe(
      (currentQuestionnaire: Questionnaire) => {
        this.startingTime = new Date().getTime();
        this.currentQuestionnaire = currentQuestionnaire;
        for (let i = 0; i < this.currentQuestionnaire.questionList.length; i++) {
          let answer: Answer = new Answer({questionnaireId: this.currentQuestionnaire.id, answer: [], questionId: this.currentQuestionnaire.questionList[i].id});
          this.currentQuestionnaire.answerList.push(answer);
        }
      });
  }

  ngOnInit() { }

  public sendQuestionnaire() {
    this.currentQuestionnaire.answerTime = new Date().getTime() - this.startingTime;
    console.log(this.currentQuestionnaire.answerTime);
        
    this.questionnaireService.updateQuestionnaire(this.currentQuestionnaire).subscribe(
      (msg: string) => {
        console.log(msg);
        for (let i = 0; i < this.currentQuestionnaire.answerList.length; i++) {
          this.currentQuestionnaire.answerList[i].answer = [];
        }
        this.currentQuestionnaire.targetAcademies = this.accountService.getCurrentAccount().userAcademies;
        console.log(this.currentQuestionnaire.targetAcademies);
        
        this.showToastSuccess("Questionário enviado com sucesso");
        this.router.navigate(['/questionario/pendentes']);
      }, (error: string) => {
        this.showToastErro("Falha no envio do questionário");
        console.log(error);
      });
  }

  checkOrUncheck(questionIndex: number, optionIndex: number) {
    if (this.currentQuestionnaire.answerList[questionIndex].answer.indexOf(String(optionIndex)) == -1) { 
      this.currentQuestionnaire.answerList[questionIndex].answer.push(String(optionIndex));
    } else {
      this.currentQuestionnaire.answerList[questionIndex].answer.splice(this.currentQuestionnaire.answerList[questionIndex].answer.indexOf(String(optionIndex)), 1);
    }
  }

  showToastSuccess(msg: string) {
    this.toastr.success(msg, 'Sucesso', {timeOut: 3000});
  }

  showToastErro(msg: string) {
    this.toastr.warning(msg, 'Erro', {timeOut: 3000});
  }

}
