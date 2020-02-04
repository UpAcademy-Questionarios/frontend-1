import { Questionnaire } from '../questionnaire/questionnaire';

export class Account {
    'id': number;
    'pendingQuestionnaires': Questionnaire[];
    'createDate': number;
    'lastModifiedDate': number;
    'userAcademies': number[];

    constructor(data?: any) {
        Object.assign(this, data);
    }
    public getPending() {
        return this.pendingQuestionnaires.map(element => element.name);

    }

}
