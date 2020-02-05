import { Question } from '../question/question';
import { Answer } from '../answer/answer';

export class Questionnaire {
    'id': number;
    'questionList': Question[] = [];
    'answerList': Answer[];
    'name': string;
    'qType': string;
    'accountId': number;
    'editPrivacy': any[] = [];
    'viewPrivacy': any[] = [];
    'score': number;
    'createDate': number;
    'lastModifiedDate': number;
    'lastModifiedDatestring': string;
    'templateId': number;
    'template': boolean;
    'answerTime': number;
    'userName': string;
    'userAcademies': number[];
    
    constructor(data?: any) {
        Object.assign(this, data);
    }
}
