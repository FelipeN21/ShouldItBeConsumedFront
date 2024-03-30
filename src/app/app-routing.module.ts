import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { NewAccountComponent } from './views/new-account/new-account.component';
import { PasswordRecoveryComponent } from './views/password-recovery/password-recovery.component';
import { SearchComponent } from './views/search/search.component';
import { ComentariosComponent } from './views/comentarios/comentarios.component';
import { CommentAddComponent } from './views/comment-add/comment-add.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full'  },
  { path: 'login', component: LoginPageComponent },
  {path: 'landing-page', component: LandingPageComponent},
  {path:'home-page', component: HomePageComponent},
  {path: 'new-account', component: NewAccountComponent},
  {path:'password-recovery', component: PasswordRecoveryComponent},
  {path:'search', component: SearchComponent},
  {path:'comment', component: ComentariosComponent},
  {path:'comment-add', component:CommentAddComponent},
  {path: '**', component:LandingPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
