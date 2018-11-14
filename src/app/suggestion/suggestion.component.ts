import { UserType } from './../models/usertype';
import { first } from 'rxjs/operators';
import { Guid } from 'guid-typescript';
import { LoginService } from './../services/login.service';
import { Suggestion, Document, QuestionToClient } from './../models/suggestion';
import { SuggestionService } from './../services/suggestion.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user';

@Component({
    selector: 'whisper-suggestion',
    templateUrl: './suggestion.component.html',
    styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {
    private _userLogged: User;
    @Input() public suggestion: Suggestion;
    @Output() public suggestionClickEvent: EventEmitter<string> = new EventEmitter(); 

    constructor(
        private suggestionService: SuggestionService,
        private loginService: LoginService
    ) {
    }

    public ngOnInit(): void {
        this._userLogged = this.loginService.getCurrentUser();     
    }

    public choiceSuggestion(document: Document, chatKey: Guid): void {
        const agentInput = document.title + ' ' + document.uri;
        this.suggestionService.selectSuggestion(chatKey, document.id.value);
        this.suggestionClickEvent.emit(agentInput);
    }

    public choiceQuestion(question: QuestionToClient, chatKey: Guid): void {
        this.suggestionService.selectSuggestion(chatKey, question.id.value);
        this.suggestionClickEvent.emit(question.text);
    }
}

