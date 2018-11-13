import { LoginService } from './../services/login.service';
import { Message } from './../models/message';
import { Component, OnInit,  AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { SocketService } from './../services/socket.service';
import { User } from '../models/user';

@Component({
    selector: 'whisper-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked  {
    public messages: any = new Array<Message>();
    public messageContent: string;
    public color: any;
    @Output() public messageSentEvent: EventEmitter<string> = new EventEmitter();
    private _userConnected: User;
    private _isNewMessage: boolean = false;
    
    constructor(private socketService: SocketService, private loginService: LoginService) {
    }

    public ngOnInit(): void {
        this.socketService.initSocket();
        this._userConnected = this.loginService.getCurrentUser();
        this.messages = this.loginService.getOldMessages();
        this.socketService.onMessage()
        .subscribe((message: Message) => {
            this.messages.push(message);
            this.loginService.saveMessages(message); 
            this._isNewMessage = true;
        });
    }

    public ngAfterViewChecked(): void {
        if (this._isNewMessage) {
            const wrapper: HTMLElement = document.getElementById('wrapper');
            wrapper.scrollTo(0, wrapper.scrollHeight);
            this._isNewMessage = false;
        }
    }

    public sendMessage(): void {
        if (!this.messageContent) {
          return;
        }

        this.socketService.send({
          from:  this._userConnected,
          content: this.messageContent,
          date: new Date()
        });
        this.messageSentEvent.emit(this.messageContent);
        this.messageContent = null;
    }

    public getConversationColor(user: User): any {
        if (user.name === this._userConnected.name) 
            return { 'background-color' : '#c9ffff' };
        return { 'background-color' : '#FFF' };
    }
}

