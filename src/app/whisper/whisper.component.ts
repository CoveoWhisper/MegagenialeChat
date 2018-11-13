import { User } from './../models/user';
import { LoginService } from './../services/login.service';
import { SuggestionService } from './../services/suggestion.service';
import { SuggestionComponent } from './../suggestion/suggestion.component';
import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { Suggestion } from '../models/suggestion';
import { first } from 'rxjs/operators';
@Component({
    selector: 'whisper-main',
    templateUrl: './whisper.component.html',
    styleUrls: ['./whisper.component.css']
})
export class WhisperComponent implements OnInit {
    private _userLogged: User;
    public suggestion: Suggestion;

    constructor(private loginService: LoginService, private suggestionService: SuggestionService) {
        this.suggestion = new Suggestion();
    }

    public ngOnInit(): void {
        this._userLogged = this.loginService.getCurrentUser();
        this.suggestionService.getSuggestion(this._userLogged.id)
            .subscribe((res: Suggestion) => this.suggestion = res);
    }

    public messageSent(message: string): void {
        this.suggestionService.getSuggestionWithQuery(message, this._userLogged.id)
            .pipe(first())
            .subscribe((res: Suggestion) => this.suggestion = res);
    }
}
