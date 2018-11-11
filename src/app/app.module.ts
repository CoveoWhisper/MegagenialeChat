import { LoginService } from './services/login.service';
import { NeedAuthGuard } from './auth.guard';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { WhisperComponent } from './whisper/whisper.component';
import { LoginComponent } from './login/login.component';
import { appRouting } from './app.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    WhisperComponent,
    LoginComponent,
    SuggestionComponent
  ],
  imports: [
    BrowserModule,
    appRouting,
    FormsModule
  ],
  providers: [ 
    NeedAuthGuard,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
