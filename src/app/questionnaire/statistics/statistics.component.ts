import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnaireService } from '../services/questionnaire-service/questionnaire.service';
import { Questionnaire } from '../models/questionnaire/questionnaire';
import { AccountService } from '../services/account-service/account.service';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  public quest: Questionnaire;
  //public passedScore: Array<any> = [0,0];
  public passedScore: any = {aprovados:0, reprovados:0};
  public passedScore$: ReplaySubject<any[]>; 
  private questionnaireData;
  private rangeValue;
  private trashold: number = 50;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionnaireService: QuestionnaireService,
    private accountService: AccountService
  ) {
    /* this.route.params.subscribe(
      params => {
        this.quest = this.questService.getQuestionnaire(Number(params.id))
      }
    ) */
    this.questionnaireService.getAnsweredQuestionnaireByAccountId(
      this.accountService.getCurrentAccount().id
      ).subscribe(
      (questionnaireData: Questionnaire[]) => {
        this.questionnaireData = questionnaireData;
        let up: number = 0;
        let down: number = 0;
        questionnaireData.forEach(element => {
          (element.score > this.trashold ) ? up += 1 : down += 1
          this.passedScore = {aprovados:up, reprovados:down}
        });
        
        //questionnaireData.forEach(el -> (el.score > 70 ? this.passedScore[0] += 1 : this.passedScore[1] += 1))
      }
    )

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.rangeValue)
  }

// Update the current slider value (each time you drag the slider handle)
//   ngOnChange() {
// this.rangeValue.oninput = function() {
//   this.passedScore = {aprovados:0, reprovados:0};
//   this.questionnaireData.forEach(element => {
//     if (element.qType == "QUIZ") (element.score > 70 ) ? this.passedScore.aprovados += 1 : this.passedScore.reprovados += 1
  
//   });
// }
//   }

  onChange(trashold) {
console.log(trashold)
let up: number = 0
let down: number = 0
for (let i = 0; i < this.questionnaireData.length; i++) {
  (this.questionnaireData[i].score > trashold) ? up += 1 : down += 1;
}
this.passedScore = {aprovados:up, reprovados:down};
  }
  
  showStuff(){
    console.log(this.questionnaireData)
    console.log(this.passedScore)
    this.passedScore = {aprovados: 1, reprovados: 2}
  }

}
