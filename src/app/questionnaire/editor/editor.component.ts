import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDoubleDown, faAngleDoubleUp, faTrash, faCheck, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { Template } from '../models/template/template';
import { TemplateService } from '../services/template-service/template.service';
import { Question } from '../models/question/question';
import { Questionnaire } from '../models/questionnaire/questionnaire';
import { QuestionnaireService } from '../services/questionnaire-service/questionnaire.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account-service/account.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  private currentQuestion: Question = new Question();
  private currentQuestionnaire: Questionnaire = new Questionnaire();


  private template: boolean;
 private quiz: boolean;
 private anonymous: boolean;
 private academies: any = [];
 //private users: any = [];
 private users: any = [{ id: 1, text: "Zé Carlos" }, { id: 2, text: "Carlota" }, { id: "2", text: "Zé das Couves" },{ id: "4", text: "Margarette" }, { id: "5", text: "Todos" }];
 private selectedUsers: any[] = [];
 private roles = [{'role': "ADMIN", 'display': "Admin" }, {'role': "SUPERUSER", 'display': "Formador" }, {'role': "USER", display: "Formando" },]
 private option: string = "";
 private customHtml: string
 faTrash = faTrash;
 faCheck = faCheck;
 faEdit = faEdit;
 faSave = faSave;
 faAngleDoubleDown = faAngleDoubleDown;
 faAngleDoubleUp = faAngleDoubleUp;
 private multi: boolean = true;
 private select = "MULTIPLE";
 private rightCheck = false;
 private isOpenDate = true;

  constructor(
    private router: Router,
    private templateService: TemplateService,
    private questionnaireService: QuestionnaireService,
    private toastr: ToastrService,
    private accountService: AccountService
  ) { 
    let templateId: number = this.router.getCurrentNavigation().extras.state.id;
    this.templateService.getTemplate(templateId).subscribe(
      (currentQuestionnaire: Questionnaire) => {
        this.currentQuestionnaire = currentQuestionnaire;
        this.currentQuestionnaire.questionList.sort( (a,b) => (a.orderNumber < b.orderNumber)? -1 : 1)
      });
  }


  ngOnInit() {

  }
  
  public getAcademies(e){
    if (e.target.checked) {
      console.log("entrou")
      this.accountService.getAcademies().subscribe(
        (academies: number[]) => {
          this.academies = academies;
          console.log(academies)
        });
    }
  }

  public getUsersByAcademy(e, academy){
    
    console.log(academy)
    console.log("entrou")
    this.users = [];
    this.accountService.getUsersByAcademy(academy).subscribe(
      (users: User[]) => {
        console.log(users)
        let temporaryUser = []
        for (let i = 0; i < users.length; i++) {
          let newUser = { 'id': users[i].id, 'text': users[i].name}
          temporaryUser.push(newUser);
          console.log(i);
          console.log(this.users);
        }
        this.users = temporaryUser
      });
  }

  public addMoreOptions(rightCheck: boolean){
    if(this.option != ""){
      this.currentQuestion.options.push(this.option);
      if (this.quiz) this.currentQuestion.rightAnswer.push(String(rightCheck));
      this.customHtml = "";
    } else {
    this.customHtml = "Necessário escrever resposta";
  }
  this.option = "";

  }

  public addCustomOptions(begin: number, end: number){

  if (begin == null || begin == undefined || begin < 0 || begin > 99){
    this.customHtml = "Selecione um número inicial entre 0 e 99";
  } else if (end == null || end == undefined || end < 1 || end > 100){
    this.customHtml = "Selecione um número final entre 1 e 100";
  } else {
    this.customHtml = "";
    for (let index = begin; index <= end; index++) {
      this.currentQuestion.options.push(String(index));
      if (this.quiz) this.currentQuestion.rightAnswer.push("false");
    }
  }

}

  public addQuestion(type: string) {
    
    if (this.currentQuestion.question == "" || this.currentQuestion.question == undefined){
      return this.customHtml = "Necessário escrever questão";
    }

    //Add the type of the question
      this.currentQuestion.aType=type;

    //Add questions to the questionnaire questionList
    if (this.currentQuestionnaire.questionList != undefined) {
      this.currentQuestionnaire.questionList.push(this.currentQuestion);
    } else {
      this.currentQuestionnaire.questionList = [this.currentQuestion];
    }
    this.currentQuestion = new Question(); 
    this.customHtml = "";
  }


  public addQuestionnaire() {

    console.log(this.currentQuestionnaire)
    //Change rightAnswer from boolean[] to string[] (of indexes)
    for (let i = 0; i < this.currentQuestionnaire.questionList.length; i++) {
      let element = this.currentQuestionnaire.questionList[i];
      element.rightAnswer = element.rightAnswer.map((option, index) => option == "true" ? String(index) : "false")
      .filter(option => option != "false");

      element.orderNumber = i + 1;
    }

    //Add the type of the questionnaire
    if (this.quiz){
      this.currentQuestionnaire.qType = "QUIZ";
    } else {
      this.currentQuestionnaire.qType = "EVALUATION";
    }

    //Add answerList empty to the questionnaire
    this.currentQuestionnaire.answerList = [];
    

    //Editar a privacidade

    for (let index = 0; index < this.currentQuestionnaire.editPrivacy.length; index++) {
      this.currentQuestionnaire.editPrivacy[index] = this.currentQuestionnaire.editPrivacy[index].role      
    }

    for (let index = 0; index < this.currentQuestionnaire.viewPrivacy.length; index++) {
      this.currentQuestionnaire.viewPrivacy[index] = this.currentQuestionnaire.viewPrivacy[index].role      
    }

    for (let index = 0; index < this.selectedUsers.length; index++) {
      this.selectedUsers[index] = this.selectedUsers[index].id      
    }


    // if (this.template) {
    //   this.currentQuestionnaire.template = true;
    //   this.questionnaireService.createQuestionnaire(this.currentQuestionnaire).subscribe(
    //       (msg: string) => {
    //         console.log("Id do template:")
    //         console.log(msg);
    //         this.currentQuestionnaire.templateId = Number(msg);
    //         // const questionnaireId: number = Number(msg);
    //         // this.questionnaireService.createQuestionnaireWithAccount(questionnaireId, this.trainees).subscribe();
    //         // console.log(questionnaireId);
    //         console.log(this.currentQuestionnaire)
    //       }, (error: string) => {
    //         console.log(error);
    //       });
    // } 
    
   
    //this.currentQuestionnaire.template = false

      this.questionnaireService.createQuestionnaireWithAccountId(this.currentQuestionnaire, this.template, this.selectedUsers).subscribe(
        (msg: string) => {
              console.log(msg);
              this.showToastSuccess("Questionário enviado com sucesso");
            }, (error: string) => {
              console.log(error);
              this.showToastErro("Falha no envio do questionário");
            });

    this.currentQuestionnaire = new Questionnaire(); 
  }

  showToastSuccess(msg: string) {
    this.toastr.success(msg, 'Sucesso', {timeOut: 3000});
  }

  showToastErro(msg: string) {
    this.toastr.warning(msg, 'Erro', {timeOut: 3000});
  }

}




