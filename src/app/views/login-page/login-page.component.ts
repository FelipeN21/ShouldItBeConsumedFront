import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

public loginForm: FormGroup;
private sendInfo: any;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private baseService: BaseService)
  {


    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      senha: new FormControl('',[Validators.required])
    })


  }

  ngOnInit(){
  
  }

  sendClick()
  {
   let aux = new loginInputDto() 
   aux.Email = this.loginForm.value.email
   aux.Senha = this.loginForm.value.senha

   this.http.post<any>('https://shoulditbeconsumed20240330142139.azurewebsites.net/api/Usuario/Login', aux)
   .subscribe(data => {

    if(data.erros == null){
    sessionStorage.setItem("TOKEN", data.dados.token)
    sessionStorage.setItem("ID_USUARIO", data.dados.idUsuario)
    sessionStorage.setItem("NOME", data.dados.nome)

    this.toastr.success("Bem vindo", "Logado com sucesso")
    this.router.navigate(["/home-page"]);
  }
  else
  {
    this.toastr.error(data.erros[0], "Erro")
  }
   }, 
   error=>{
    this.toastr.error("Erro ao comunicar com os servidores, entre em contato com o adiministrador", "Erro de conexão")
  });

  }

  toNewAcc(){
    this.router.navigate(["/new-account"]);
  }


  passwordRec(){
    let aux = new passwordRecoveryInputDto();
    aux.Email = this.loginForm.value.email
    if(aux.Email == "" || aux.Email == null || aux.Email == undefined)
    this.toastr.warning("Preencha o campo de email e clique novamente", "Campo nulo")
    else
    {
      this.http.post<any>('https://shoulditbeconsumed20240330142139.azurewebsites.net/api/Usuario/RecuperarSenha', aux)
   .subscribe(data => {
    if(data.erros == null){
    this.toastr.success("Foi enviada uma correspondência para seu email", "Verifique seu email")
  }
  else
  {
    this.toastr.error(data.erros[0], "Erro")
  }
   }, 
   error=>{
    this.toastr.error("Erro ao comunicar com os servidores, entre em contato com o adiministrador", "Erro de conexão")
  });




    }

  }

}
export class loginInputDto{
  Email: string;
  Senha: string;
  constructor(){
    this.Email = ""
    this.Senha = ""
  }



}

export class passwordRecoveryInputDto{
  Email: string;
  constructor(){
    this.Email = ""
  }
}
