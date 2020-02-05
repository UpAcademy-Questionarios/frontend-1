import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Template } from '../../models/template/template';
import { ReplaySubject } from 'rxjs';
import { Questionnaire } from '../../models/questionnaire/questionnaire';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private url = 'http://localhost:8080/coreFinalProject/questionnaire/template/';
  public templates: Questionnaire[] = [];
  public templates$: ReplaySubject<Questionnaire[]> = new ReplaySubject(1);

  constructor(
    private http: HttpClient
  ) {
  }


  public getAllTemplates() {
    return this.http.get(this.url).subscribe(
      (templateSub: Questionnaire[]) => {
        this.templates = templateSub;
        this.templates$.next(this.templates);
      });
  }

  public getAllQuizzesByTemplateId(id: number){
    return this.http.get(this.url + id + "/quizzes");
  }

  public getAllEvaluationsByTemplateId(id: number){
    return this.http.get(this.url + id + "/evaluations");
  }

  public getTemplate(id: number) {
    return this.http.get(this.url + id);
  }

  public createTemplate(template: Questionnaire) {
    return this.http.post(this.url, template, { responseType: 'text' });
  }

  public updateTemplate(template: Questionnaire) {
    return this.http.put(this.url, template, { responseType: 'text' });
  }

  public deleteTemplate(id: number) {
    return this.http.delete(this.url + id, { responseType: 'text' });
  }
}
