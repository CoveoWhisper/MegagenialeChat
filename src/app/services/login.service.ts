import { Message } from './../models/message';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private localUser: string = 'user';
    private localMessages: string = 'messages';

    public constructor() {}

    public isConnected(): boolean {
        if (this.getCurrentUser()) return true;
        else return false;
    }

    public connect(user: User): void {
        localStorage.setItem(this.localUser, JSON.stringify(user));
    }

    public disconnect(): void {
        localStorage.removeItem(this.localUser);
        localStorage.removeItem(this.localMessages);
    }

    public getCurrentUser(): User {
        return JSON.parse(localStorage.getItem(this.localUser));
    }

    public saveMessages(message: Message): void {
        const messages: Array<Message> = this.getOldMessages();
        messages.push(message);
        localStorage.setItem(this.localMessages, JSON.stringify(messages));
    }

    public getOldMessages(): Array<Message> {
        const messagesStored: any = localStorage.getItem(this.localMessages);
        if (messagesStored)
            return JSON.parse(messagesStored);

        return new Array<Message>();
    }
}