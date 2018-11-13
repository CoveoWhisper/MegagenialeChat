import { Guid } from 'guid-typescript';
export class Suggestion {
    public questions: Array<QuestionToClient>;
    public documents: Array<Document>;
    public activeFacets: Array<Facet>;

    constructor() {
        this.questions = new Array();
        this.documents = new Array();
        this.activeFacets = new Array();
    }
}

export class QuestionToClient {
    public id: Guid;
    public text: string;
}

export class Document {
    public id: Guid;
    public title: string;
    public uri: string;
    public printableUri: string;
    public summary: string;
    public excerpt: string;
}

export class Facet {
    public id: Guid;
    public name: string;
    public value: string;
}