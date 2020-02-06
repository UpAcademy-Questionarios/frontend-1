import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { QuestionnaireService } from '../services/questionnaire-service/questionnaire.service';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
  host: {
    class:'w-100'
  }
})
export class PendingComponent implements OnInit {

  public pendingQuestionnaires$: ReplaySubject<any[]>;
  faCheckCircle = faCheckCircle;

  constructor(
    private router: Router,
    private questionnaireService: QuestionnaireService
  ) {
    this.questionnaireService.getPendingQuestionnaires();
    this.pendingQuestionnaires$ = questionnaireService.pendingQuestionnaires$;
  }

  ngOnInit() {
  }

  public solveThisQuestionnaire(questionnaireId: number) {
    this.router.navigate(['/questionario/pendentes/responder'], { state: { id: questionnaireId} });
  }

}
