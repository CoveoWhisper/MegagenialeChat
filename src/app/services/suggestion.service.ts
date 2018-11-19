import { LoginService } from './login.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Suggestion } from '../models/suggestion';
import { Guid } from 'guid-typescript';
import { throwError,  Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const ENDPOINT: string = 'https://whisper-megagenial.us-east-1.elasticbeanstalk.com/whisper';
// const ENDPOINT: string = 'https://localhost:5001';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};
@Injectable({
    providedIn: 'root'
})
export class SuggestionService {
    public constructor(private http: HttpClient, private loginService: LoginService) {}

    public getSuggestion(chatKey: Guid): Observable<{} | Suggestion> {
        const parameters = '?chatkey=' + chatKey.value + '&maxDocuments=5&maxQuestions=3';
        return this.http.get<Suggestion>(`${ENDPOINT}/suggestions/${parameters}`)
            .pipe(catchError(this.errorHandler));
    }

    public getSuggestionWithQuery(query: string, chatKey: Guid): Observable<{} | Suggestion> {
        const data = {
            chatkey: chatKey.value,
            Query: query,
            type: this.loginService.getCurrentUser().userType,
            maxDocuments: 5,
            maxQuestions: 3
        };
        return this.http.post<Suggestion>(ENDPOINT + '/suggestions', data, httpOptions)
            .pipe(catchError(this.errorHandler));
    }

    public selectSuggestion(chatkey: Guid, id: Guid): Observable<{}> {
        const data = {
            chatkey,
            id
        };
        return this.http.post(ENDPOINT + '/suggestions/select', data, httpOptions)
            .pipe(catchError(this.errorHandler));
    } 

    public errorHandler(error: HttpErrorResponse): any {
        return throwError(error.message || 'Erreur de serveur');
    }

    public cancelQuestion(facetId: Guid): Observable<{}> {
        return this.http.delete(`${ENDPOINT}/facets/${facetId || ''}`, httpOptions)
            .pipe(catchError(this.errorHandler));
    }
}