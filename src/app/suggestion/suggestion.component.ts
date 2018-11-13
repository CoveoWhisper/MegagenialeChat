import { Message } from './../models/message';
import { LoginService } from './../services/login.service';
import { Suggestion } from './../models/suggestion';
import { SuggestionService } from './../services/suggestion.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';

@Component({
    selector: 'whisper-suggestion',
    templateUrl: './suggestion.component.html',
    styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {
    private _userLogged: User;
    @Input() public suggestion: Suggestion;

    constructor(
        private suggestionService: SuggestionService,
        private loginService: LoginService
    ) {
    }

    public ngOnInit(): void {
        this._userLogged = this.loginService.getCurrentUser();     
    }
}

