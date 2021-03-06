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
  private visibleChart: boolean = false
  private visibleEvaluation: boolean = false

  public timeRange: any = { aprovados: 0, reprovados: 0 };//
  private timeValue;//
  private timeTrashold: number = 0;//
  public minTime: number = 0;
  public maxTime: number = 0;

  private chartData: any[] = ['Jorge', 80, 'Ed', 75];

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

          questionnaireData.forEach((quest) => {
            quest.answerTime = Math.floor(quest.answerTime / 60000);
          })
          let timeUp: number = 0;//
          let timeDown: number = 0;//
          questionnaireData.sort((a, b) => a.answerTime - b.answerTime);//
          this.minTime = questionnaireData[0].answerTime / 60000;//
          this.maxTime = questionnaireData[questionnaireData.length - 1].answerTime / 60000;//
          this.timeTrashold = (this.minTime + this.maxTime)/2;//

          questionnaireData.forEach(element => {
            (element.score > this.trashold) ? up += 1 : down += 1;
            this.passedScore = { aprovados: up, reprovados: down };

            (element.answerTime > this.timeTrashold) ? timeUp +=1 : timeDown +=1;//
            this.timeRange = { aprovados: timeUp, reprovados: timeDown };//
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
    if (this.currentRole == "USER"){
    for (let i = 0; i < this.questionnaireData.length; i++) {
      (this.questionnaireData[i].score > trashold) ? up += 1 : down += 1;
    }
  } else {
    for (let i = 0; i < this.questionnaireData.length; i++) {
      (this.questionnaireData[i].score > trashold) ? up += 1 : down += 1;
    }
  }
    this.passedScore = { aprovados: up, reprovados: down };

  }

  onTimeTrasholdChange(timeTrashold) {//
    console.log(timeTrashold)
    let timeUp: number = 0;
    let timeDown: number = 0;
    if (this.currentRole == "USER"){
    for (let i = 0; i < this.questionnaireData.length; i++) {
      (this.questionnaireData[i].answerTime > timeTrashold) ? timeUp += 1 : timeDown += 1;
    }
  } else {
    for (let i = 0; i < this.questionnaireData.length; i++) {
      (this.questionnaireData[i].answerTime > timeTrashold) ? timeUp += 1 : timeDown += 1;
    }
  }
    this.timeRange = { aprovados: timeUp, reprovados: timeDown };
  }



  showStuff() {
    //testes
    this.chartData = [['Jorge Antunes', 90], ['Ed', 75], ['Marta', 65], ['Raquel', 10], ['Bruno', 50]];
  

    
  }


getAllFromTemplateId(template: Questionnaire){
  console.log(template)
  if (template.qType == "QUIZ"){
    this.visibleChart = true
    this.visibleEvaluation = false
    this.templateService.getAllQuizzesByTemplateId(template.id).subscribe(
      (data: Questionnaire[]) => {
        this.questionnaireData = data;
        let up: number = 0;
        let down: number = 0;
        let temporaryArray = []
        let timeUp: number = 0;//
        let timeDown: number = 0;//

        console.log(data);
        
        this.questionnaireData.forEach((quest) => {
          console.log(quest);
          
          quest.answerTime = Math.floor(quest.answerTime / 1000);
        })
        data.sort((a, b) => a.answerTime - b.answerTime);//
        this.minTime = this.questionnaireData[0].answerTime;//
        this.maxTime = this.questionnaireData[this.questionnaireData.length - 1].answerTime;//
        this.timeTrashold = (this.minTime + this.maxTime)/2;//

        data.forEach(element => {
          (element.score > this.trashold) ? up += 1 : down += 1;
          this.passedScore = { aprovados: up, reprovados: down };
          (element.answerTime > this.timeTrashold) ? timeUp +=1 : timeDown +=1;//
          this.timeRange = { aprovados: timeUp, reprovados: timeDown };//
          temporaryArray.push([element.userName, element.score]);
          this.chartData = temporaryArray;
        });

        });
    
  } else {
    this.visibleChart = false
    this.visibleEvaluation = true
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
