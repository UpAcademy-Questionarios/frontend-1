import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { QuestionnaireComponent } from './questionnaire.component';
import { FormsModule } from '@angular/forms';
import { NewQuestionnaireComponent } from './new-questionnaire/new-questionnaire.component';
import { BrowserModule } from '@angular/platform-browser';
import { TemplatesComponent } from './templates/templates.component';
import { NewQuizComponent } from './new-quiz/new-quiz.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToAnswerComponent } from './to-answer/to-answer.component';
import { PendingComponent } from './pending/pending.component';
import { HistoryComponent } from './history/history.component';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { NgxSelectModule } from 'ngx-select-ex';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { ViewComponent } from './view/view.component';
import { EditorComponent } from './editor/editor.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import {SelectDropDownModule } from 'ngx-select-dropdown';
import { PieGraphComponent } from './shared/graphs/pie-graph/pie-graph.component'

@NgModule({
  declarations: [
    QuestionnaireComponent,
    NewQuestionnaireComponent,
    TemplatesComponent,
    NewQuizComponent,
    StatisticsComponent,
    SidebarComponent,
    ToAnswerComponent,
    PendingComponent,
    HistoryComponent,
    JwPaginationComponent,
    ViewComponent,
    EditorComponent,
    PieGraphComponent
  ],
  imports: [
    CommonModule,
    QuestionnaireRoutingModule,
    FormsModule,
    BsDropdownModule,
    NgxSelectModule,
    AccordionModule.forRoot(),
    FontAwesomeModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    SelectDropDownModule,
    TabsModule.forRoot()
  ]
})
export class QuestionnaireModule { }
