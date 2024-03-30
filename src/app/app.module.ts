import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './views/home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewAccountComponent } from './views/new-account/new-account.component';
import {BaseService} from './services/base.service';
import { PasswordRecoveryComponent } from './views/password-recovery/password-recovery.component';
import { SearchComponent } from './views/search/search.component';
import { ComentariosComponent } from './views/comentarios/comentarios.component';
import { CommentAddComponent } from './views/comment-add/comment-add.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LandingPageComponent,
    HomePageComponent,
    NewAccountComponent,
    PasswordRecoveryComponent,
    SearchComponent,
    ComentariosComponent,
    CommentAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    BaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
