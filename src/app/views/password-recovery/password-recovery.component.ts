import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

public static _instance : PasswordRecoveryComponent;
public passwordRecoveryForm: FormGroup;

token: string;
IdUsuario: number;
nomeLogado : string


constructor(private route : ActivatedRoute, public router:Router, private http: HttpClient, private toastr: ToastrService)
{
  PasswordRecoveryComponent._instance = this

  this.passwordRecoveryForm = new FormGroup({
    senha: new FormControl('',[Validators.required]),
    senhaAntiga: new FormControl('',[Validators.required]),
    confirmarSenha: new FormControl('',[Validators.required])
  })

  this.token = "";
  this.IdUsuario = 0;
  this.nomeLogado = ""

}

ngOnInit(): void {
  this.getUserName();
  var token = sessionStorage.getItem("TOKEN")
  var id_usuario = sessionStorage.getItem("ID_USUARIO")
  this.token = token == null ? "" : token
  this.IdUsuario = id_usuario == null ? 0 : Number(id_usuario);
}

toMenu(){
  this.router.navigate(["/home-page"]);
}


submitPwd()
{
  var aux = new TrocarSenhaInputDto();

    aux.Senha = this.passwordRecoveryForm.value.senha
    aux.Token = this.token
    aux.IdUsuario = this.IdUsuario
    aux.SenhaAntiga = this.passwordRecoveryForm.value.senhaAntiga


    var verificacao = this.passwordRecoveryForm.value.confirmarSenha

    if(verificacao !== aux.Senha && !this.passwordRecoveryForm.valid)
      this.toastr.warning("Por favor verifique as senhas digitadas", "Senhas não coincidem")
    else
    {
      this.http.post<any>('https://localhost:7131/api/Usuario/TrocarSenha', aux)
      .subscribe(data => {
        if(data.erros == null){
        this.toastr.success("Senha alterada com sucesso", "Sucesso")
        this.router.navigate(["/home-page"]);
        }else
        {
          this.toastr.error(data.erros[0], "Erro")
        }
      }, 
      error=>{
        this.toastr.error("Erro ao comunicar com os servidores, entre em contato com o adiministrador", "Erro de conexão")
      });



    }
}


getUserName(){
  try{
    var holder = sessionStorage.getItem("NOME")
    this.nomeLogado = holder == null ? "" : holder
    if(this.nomeLogado != "")
    console.log("");
    else
    this.router.navigate(["/home-page"])
    
  }
  catch{
    ;
  }
}



}

export class TrocarSenhaInputDto{

  Senha: string;
  SenhaAntiga: string;
  Token: string;
  IdUsuario: number;


  constructor(){
    this.Token = ""
    this.Senha = ""
    this.IdUsuario = 0
    this.SenhaAntiga = ""

  }



}