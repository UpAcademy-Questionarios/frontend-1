import { Component, OnInit } from '@angular/core';
import { Questionnaire } from '../models/questionnaire/questionnaire';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnaireService } from '../services/questionnaire-service/questionnaire.service';
import { faAngleDoubleDown, faAngleDoubleUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  private currentQuestionnaire: Questionnaire;
  private questUserName: string;
  faAngleDoubleDown = faAngleDoubleDown;
  faAngleDoubleUp = faAngleDoubleUp;

  constructor(
    private router: Router,
    private questionnaireService: QuestionnaireService,
  ) {
    let questionnairePreview = this.router.getCurrentNavigation().extras.state.quest;
    this.questUserName = questionnairePreview.userName;
    this.questionnaireService.getQuestionnaire(questionnairePreview.id).subscribe(
      (currentQuestionnaire: Questionnaire) => {
        currentQuestionnaire.questionList.sort((a, b) => (a.orderNumber > b.orderNumber) ? 1 : ((b.orderNumber > a.orderNumber) ? -1 : 0));
        currentQuestionnaire.answerList.sort((a, b) => (a.orderNumber > b.orderNumber) ? 1 : ((b.orderNumber > a.orderNumber) ? -1 : 0))
        this.currentQuestionnaire = currentQuestionnaire;
        console.log(this.currentQuestionnaire);
      });
  }

  isSelected(i: number, j: number) {
    return this.currentQuestionnaire.answerList[i].answer.includes(String(j));
  }

  checkAnswer(i: number, j: number) {
    if (this.currentQuestionnaire.qType != "QUIZ") {
      return "";
    }
    if (this.currentQuestionnaire.questionList[i].rightAnswer.includes(String(j)) && this.isSelected(i, j)) {
      return "rightAnswer";
    } else if (!this.currentQuestionnaire.questionList[i].rightAnswer.includes(String(j)) && this.isSelected(i, j)) {
      return "wrongAnswer";
    } else if (this.currentQuestionnaire.questionList[i].rightAnswer.includes(String(j)) && !this.isSelected(i, j)) {
      return "rightAnswerIsh";
    }
  }

  ngOnInit() {
  }

}
