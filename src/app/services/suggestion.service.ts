import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Suggestion } from '../models/suggestion';
import { Guid } from 'guid-typescript';
import { throwError,  Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const ENDPOINT: string = 'https://whisper-dev.us-east-1.elasticbeanstalk.com/whisper';
const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
};
@Injectable({
    providedIn: 'root'
})
export class SuggestionService {
    public constructor(private http: HttpClient) {}

    public getSuggestion(chatKey: Guid): Observable<{} | Suggestion> {
        const parameters = '?chatkey=' + chatKey.value + '&maxDocuments=5&maxQuestions=3';
        return this.http.get<Suggestion>(`${ENDPOINT}/suggestions/${parameters}`)
            .pipe(tap(data => alert(JSON.stringify(data))) , catchError(this.errorHandler));
    }

    public getSuggestionWithQuery(query: string, chatKey: Guid): Observable<{} | Suggestion> {
        const data = {
            chatkey: chatKey.value,
            Query: query,
            type: 0,
            maxDocuments: 5,
            maxQuestions: 3
        };
        return this.http.post<Suggestion>(ENDPOINT + '/suggestions', data, httpOptions)
            .pipe(tap(res => alert(JSON.stringify(res))), catchError(this.errorHandler));
    }

    public errorHandler(error: HttpErrorResponse): any {
        return throwError(error.message || 'Erreur de serveur');
    }
}