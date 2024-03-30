import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.css']
})
export class CommentAddComponent implements OnInit{

  public comentarioForm: FormGroup;
  token : string;
  idUsuario: number;
  nomePerfil: string;
  idPerfil: number;
  pca: any;
  idadeRecomendada: any;
  nota: any;
  nomeLogado : string


  listaItens: ItemLista[] = [
    { valor: true, texto: 'Sim' },
    { valor: false, texto: 'Não' }
  ];

  listaIdade: ItemIdade[] = [
    { valor: 1 },
    { valor: 2 },
    { valor: 3 },
    { valor: 4 },
    { valor: 5 },
    { valor: 6 },
    { valor: 7 },
    { valor: 8 },
    { valor: 9 },
    { valor: 10 },
    { valor: 11 },
    { valor: 12 },
    { valor: 13 },
    { valor: 14 },
    { valor: 15 },
    { valor: 16 },
    { valor: 17 },
    { valor: 18 },
    { valor: 19 },
    { valor: 20 },
    { valor: 21 }
  ];

  listaNota: ItemNota[] = [
    { valor: 1 },
    { valor: 2 },
    { valor: 3 },
    { valor: 4 },
    { valor: 5 },
    { valor: 6 },
    { valor: 7 },
    { valor: 8 },
    { valor: 9 },
    { valor: 10 }
  ];

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService)
  {

    this.nomeLogado = ""
    this.nota = null;
    this.idadeRecomendada = null;
    this.pca = null;

    var auxToken = sessionStorage.getItem("TOKEN")
    this.token = auxToken == null || "" ? "" : auxToken

    var auxIdUsuario = sessionStorage.getItem("ID_USUARIO")
    this.idUsuario = auxIdUsuario == null || "" ? 0 : Number(auxIdUsuario)

    var auxNomePerfil = sessionStorage.getItem("LAST_PROFILE_NAME")
    this.nomePerfil = auxNomePerfil == null || "" ? "" : auxNomePerfil

    var auxIdPerfil = sessionStorage.getItem("LAST_PROFILE")
    this.idPerfil = auxIdUsuario == null || "" ? 0 : Number(auxIdPerfil)

    if((auxToken || auxIdUsuario || auxNomePerfil || auxIdPerfil) == null)
    {
      this.toastr.warning("Retornando a pagina de busca, tente novamente","Carregamento falhou")
      this.router.navigate(["/search"])
    }

    this.comentarioForm = new FormGroup({
      nomePerfil: new FormControl('',[Validators.required]),
      comentario: new FormControl('',[Validators.required])
    })

    this.comentarioForm.get("nomePerfil")?.setValue(this.nomePerfil)

  }

  ngOnInit(): void {
      this.getUserName()
  }

  getUserName(){
    try{
      var holder = sessionStorage.getItem("NOME")
      this.nomeLogado = holder == null ? "" : holder
      if(this.nomeLogado != "")
        console.log("")
      else
      this.router.navigate(["/comment"])
      
    }
    catch{
      ;
    }
  }

  sendComment(){

    var aux = this.comentarioForm.value.comentario
    if((this.nota == null || this.pca == null || this.idadeRecomendada == null) || (aux == "" || aux == null || aux == undefined))
     this.toastr.warning("Preencha todos os campos","Campos não preenchidos")
    else
    {
      let toSend = new comentarioAddInputDto();
      toSend.idPerfil = this.idPerfil
      toSend.idUsuario = this.idUsuario
      toSend.idadeRecomendada = Number(this.idadeRecomendada)
      toSend.nota = Number(this.nota)
      toSend.pca = this.pca == true ? true : false
      toSend.token = this.token
      toSend.textoComentario = aux

      this.http.post<any>('https://localhost:7131/api/Comentario/AdicionarComentario', toSend)
      .subscribe(data => {
      if(data.erros == null){
      this.toastr.success("Comentario adicionado", "Sucesso")
      this.router.navigate(["/comment"])
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

interface ItemLista {
  valor: boolean;
  texto: string;
}

interface ItemIdade {
  valor: number;
}

interface ItemNota {
  valor: number;
}



export class comentarioAddInputDto{
  
    idPerfil: number;
    idUsuario: number;
    token: string
    pca: boolean
    nota:  number
    idadeRecomendada: number
    textoComentario:string
  
  constructor(){
    this.idPerfil= 0;
    this.idUsuario= 0;
    this.token= ""
    this.pca= false
    this.nota=  0
    this.idadeRecomendada= 0
    this.textoComentario= ""
  }
}