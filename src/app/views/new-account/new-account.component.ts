import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit{

  public cadastroForm: FormGroup;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService)
  {


    this.cadastroForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      senha: new FormControl('',[Validators.required]),
      cpf: new FormControl('',[Validators.required]),
      telefone: new FormControl(''),
      nome: new FormControl('',[Validators.required]),
      confirmarSenha: new FormControl('',[Validators.required])
    })


  }


  ngOnInit(){
  
  }


  submitAcc(){
    var aux = new CadastroInputDto();

    aux.Email = this.cadastroForm.value.email
    aux.Senha = this.cadastroForm.value.senha
    aux.Cpf = this.cadastroForm.value.cpf
    aux.Telefone = this.cadastroForm.value.telefone
    aux.Nome = this.cadastroForm.value.nome

    var verificacao = this.cadastroForm.value.confirmarSenha

    if(verificacao !== aux.Senha && !this.cadastroForm.valid)
      this.toastr.warning("Por favor verifique as senhas digitadas", "Senhas não coincidem")
    else
    {
      this.http.post<any>('https://localhost:7131/api/Usuario/AdicionarUsuarios', aux)
      .subscribe(data => {
        if(data.erros == null){
        this.toastr.success("Conta criado com sucesso, realize o acesso pela tela de login", "Sucesso")
        this.router.navigate(["/login"]);
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

}


export class CadastroInputDto{
  Email: string;
  Senha: string;
  Cpf: string;
  Telefone: string;
  Nome : string;
  constructor(){
    this.Email = ""
    this.Senha = ""
    this.Cpf = ""
    this.Telefone = ""
    this.Nome = ""
  }



}

