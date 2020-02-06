import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnaireService } from '../services/questionnaire-service/questionnaire.service';
import { Questionnaire } from '../models/questionnaire/questionnaire';
import { AccountService } from '../services/account-service/account.service';
import { ReplaySubject } from 'rxjs';
import { UserServiceService } from 'src/app/core/services/user-service/user-service.service';
import { TemplateService } from '../services/template-service/template.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  host: {
    class:'w-100'
  }
})
export class StatisticsComponent implements OnInit {
  public quest: Questionnaire;
  //public passedScore: Array<any> = [0,0];
  public passedScore: any = { aprovados: 0, reprovados: 0 };
  public passedScore$: ReplaySubject<any[]>;
  private questionnaireData;
  private rangeValue;
  private trashold: number = 50;
  private templates: Questionnaire[];
  private templateCustomArray: any[] = [];
  private currentRole: string;
  private evaluations: Questionnaire[] = [];
  private quizzesData: Questionnaire[] = [];
  private evaluation: Questionnaire;

  public timeRange: any = { fast: 0, slow: 0 };//
  private timeValue;//
  private timeTrashold: number = 0;//
  public minTime: number = 0;
  public maxTime: number = 0;

  private chartData: any[] = ['Jorge', 80, 'Ed', 75, 'Marta', 65, 'Raquel', 10];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionnaireService: QuestionnaireService,
    private accountService: AccountService,
    private userService: UserServiceService,
    private templateService: TemplateService
  ) {
    this.currentRole = userService.getCurrentUser().role;
    if (this.currentRole == "USER") {
      this.questionnaireService.getAnsweredQuestionnaireByAccountId(
        this.accountService.getCurrentAccount().id
      ).subscribe(
        (questionnaireData: Questionnaire[]) => {
          this.questionnaireData = questionnaireData;
          console.log(this.questionnaireData);
          
          let up: number = 0;
          let down: number = 0;

          let timeUp: number = 0;//
          let timeDown: number = 0;//
          questionnaireData.sort((a, b) => a.answerTime - b.answerTime);//
          this.minTime = Math.floor(questionnaireData[0].answerTime / 60000);//
          this.maxTime = Math.floor(questionnaireData[questionnaireData.length - 1].answerTime / 60000);//
          this.timeTrashold = (this.minTime + this.maxTime)/2;//

          questionnaireData.forEach(element => {
            (element.score > this.trashold) ? up += 1 : down += 1;
            this.passedScore = { aprovados: up, reprovados: down };

            (element.answerTime > this.timeTrashold) ? timeUp +=1 : timeDown +=1;//
            this.timeRange = { fast: timeUp, slow: timeDown };//
          });

        }
      )
    } else {
      this.templateService.getAllTemplates()
      this.templates = templateService.templates
      this.templates.forEach( el => this.templateCustomArray.push({id:el.id, name:el.name, qType:el.qType}))
      console.log(templateService.templates)
    }
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
    this.passedScore = { aprovados: up, reprovados: down };
  }

  onTimeTrasholdChange(timeTrashold) {//
    let timeUp: number = 0;
    let timeDown: number = 0;
    for (let i = 0; i < this.questionnaireData.length; i++) {
      (this.questionnaireData[i].answerTime > timeTrashold) ? timeUp += 1 : timeDown += 1;
    }
    this.timeRange = { fast: timeUp, slow: timeDown };
  }



  showStuff() {
    //testes
    this.chartData = [['Jorge', 8000],['Jorge', 90], ['Ed', 750], ['Marta', 650], ['Raquel', 100], ['Raquel', 100], ['Raquel', 100], ['Raquel', 100], ['Raquel', 100], ['Raquel', 100], ['Raquel', 100], ['Raquel', 100]];
  

    
  }


getAllFromTemplateId(template: Questionnaire){
  console.log(template)
  if (template.qType == "QUIZ"){
    this.templateService.getAllQuizzesByTemplateId(template.id).subscribe(
      (data: Questionnaire[]) => {
        this.quizzesData = data;
        console.log("quizz data")
        console.log(data)
        });
    
  } else {
    this.templateService.getAllEvaluationsByTemplateId(template.id).subscribe(
      (data: Questionnaire[]) => {
        this.evaluations = data;
        console.log(this.evaluations)
        this.evaluations.map(  (element) => {
          element.questionList.sort( (a,b) => (a.orderNumber < b.orderNumber)? -1 : 1);
          element.answerList.sort( (a,b) => (a.orderNumber < b.orderNumber)? -1 : 1);
        });
        this.evaluation = data[0]
        console.log("evaluation data")
        console.log(data)
        console.log(this.evaluations)
        });
  }
}
  mean(i: number){
    let sum = 0
    let indexes = 0
    this.evaluations.forEach(element => {
      console.log(element.answerList[i].answer)
      sum += Number(element.answerList[i].answer) + 1
    });

    console.log(sum)
    return (sum / this.evaluations.length).toFixed(1)
  }
}
