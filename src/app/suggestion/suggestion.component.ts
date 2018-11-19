import { UserType } from './../models/usertype';
import { first } from 'rxjs/operators';
import { Guid } from 'guid-typescript';
import { LoginService } from './../services/login.service';
import { Suggestion, Document, QuestionToClient } from './../models/suggestion';
import { SuggestionService } from './../services/suggestion.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
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

    public selectedDocument: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
    constructor(
        private suggestionService: SuggestionService,
        private loginService: LoginService,
        private sanitizer: DomSanitizer
    ) {
    }

    public ngOnInit(): void {
        this._userLogged = this.loginService.getCurrentUser();     
    }

    public choiceSuggestion(document: Document): void {
        this.selectedDocument = this.sanitizer.bypassSecurityTrustResourceUrl(document.uri);
        $('#suggestion')
            .transition({
                animation  : 'scale',
                duration   : '300ms',
                onComplete : () => {
                    $('#documentWrapper').transition('scale');
                }
            })
        ;
    }

    public choiceQuestion(question: QuestionToClient, chatKey: Guid): void {
        this.suggestionService.selectSuggestion(chatKey, question.id.value);
        this.suggestionClickEvent.emit(question.text);
    }

    public closeDocument(): void {
        $('#documentWrapper')
            .transition({
                animation  : 'scale',
                duration   : '300ms',
                onComplete : () => {
                    $('#suggestion').transition('scale');
                }
            })
        ;
    }
}

