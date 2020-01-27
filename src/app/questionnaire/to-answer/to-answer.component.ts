import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionnaireService } from '../services/questionnaire-service/questionnaire.service';
import { Questionnaire } from '../models/questionnaire/questionnaire';
import { UserServiceService } from 'src/app/core/services/user-service/user-service.service';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { ReplaySubject, Subscription } from 'rxjs';
import { Question } from '../models/question/question';
import { Answer } from '../models/answer/answer';

@Component({
  selector: 'app-to-answer',
  templateUrl: './to-answer.component.html',
  styleUrls: ['./to-answer.component.scss']
})
export class ToAnswerComponent implements OnInit {

  private currentQuestionnaire: Questionnaire;
  //public currentQuestionnaire$: ReplaySubject<Questionnaire> = new ReplaySubject(1);
  private userName: string;
  faAngleDoubleDown = faAngleDoubleDown;

  private numbers: number[];

  constructor(
    private router: Router,
    private questionnaireService: QuestionnaireService,
    private userService: UserServiceService
  ) {
    this.userName = userService.getCurrentName();
    this.questionnaireService.getQuestionnaire(this.router.getCurrentNavigation().extras.state.id).subscribe(
      (currentQuestionnaire: Questionnaire) => {
        this.currentQuestionnaire = currentQuestionnaire;
        //this.currentQuestionnaire$.next(this.currentQuestionnaire);
        console.log("Antes: " + this.currentQuestionnaire);

        for (let i = 0; i < this.currentQuestionnaire.questionList.length; i++) {
          this.currentQuestionnaire.answerList.push(new Answer());
        }

        console.log("Depois: " + this.currentQuestionnaire);
      });
    this.numbers = [];
  }

  ngOnInit() { }

  public sendQuestionnaire() {
    console.log("Sending questionnaire");

    //console.log("Questionnaire sent");
    //this.router.navigate(['/questionario/pendentes']);
    console.log(this.currentQuestionnaire);



  }

}