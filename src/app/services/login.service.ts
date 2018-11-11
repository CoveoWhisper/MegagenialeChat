import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private localName: string = 'user';

    public constructor() {}

    public isConnected(): boolean {
        if (this.getCurrentUser()) return true;
        else return false;
    }

    public connect(user: User): void {
        localStorage.setItem(this.localName, JSON.stringify(user));
    }

    public disconnect(): void {
        localStorage.removeItem(this.localName);
    }

    public getCurrentUser(): User {
        return JSON.parse(localStorage.getItem(this.localName));
    }
}