import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { QuestionnaireComponent } from './questionnaire.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { NewQuestionnaireComponent } from './new-questionnaire/new-questionnaire.component';
import { BrowserModule } from '@angular/platform-browser';
import { TemplatesComponent } from './templates/templates.component';
import { NewQuizComponent } from './new-quiz/new-quiz.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToAnswerComponent } from './to-answer/to-answer.component';



@NgModule({
  declarations: [
    QuestionnaireComponent,
    MainComponent,
    NewQuestionnaireComponent,
    TemplatesComponent,
    NewQuizComponent,
    StatisticsComponent,
    SidebarComponent,
    ToAnswerComponent
  ],
  imports: [
    CommonModule,
    QuestionnaireRoutingModule,
    FormsModule,
  ],
  bootstrap:    [ MainComponent ]
})
export class QuestionnaireModule { }
