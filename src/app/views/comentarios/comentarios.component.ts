import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit{
  isLoading: boolean = false;
  nomeLogado : string
  valido: boolean
  comentarios: any[] = []; // Array de objetos de comentários recebidos do backend
  found: boolean = false;

  LinkFoto = ""
  NomePerfil = "PlaceHolder"
  IdPerfil = 0
  PCA = false
  IdadeRecomendada: any = null
  IdUsuario: number = -1
  modal : any;
  Linkperfil = ""

  Nivel: number = 0
  auxIdadeRec: number = 0;
  auxNumComentarios: number = 0;
  

  constructor(private router: Router,private http: HttpClient, private toastr: ToastrService){
    this.nomeLogado = ""
    this.valido = false

  }

  ngOnInit(): void {
    this.isLoading = true;
       this.getUserName()
       this.getComentarios()
       this.getPerfil()

       var holder = sessionStorage.getItem("ID_USUARIO")
       this.IdUsuario = holder != null ? Number(holder) : -1
  }

  getUserName(){
    try{
      var holder = sessionStorage.getItem("NOME")
      this.nomeLogado = holder == null ? "" : holder
      if(this.nomeLogado != "")
      this.valido = true
      else
      this.valido = false
      
      console.log(this.valido)
    }
    catch{
      ;
    }
  }

  public logout()
  {
  
    sessionStorage.removeItem("TOKEN")
    sessionStorage.removeItem("ID_USUARIO")
    sessionStorage.removeItem("NOME")
  
    this.toastr.success("Deslogado com sucesso", "Ok")
    this.router.navigate(["/landing-page"]);
  }
  
  changePwd(){
    this.router.navigate(["/password-recovery"]);
  
  }

  mailTo() {
    window.location.href = "mailto:felipedevhelp@outlook.com";
  }

getComentarios()
{
  let aux = new ComentarioPerfilInputDto() 
      var prof = sessionStorage.getItem("LAST_PROFILE")
      if(prof != null && prof != "" && prof != undefined){
        aux.IdPerfil = Number(prof)
      this.http.post<any>('https://localhost:7131/api/Comentario/ListarComentariosPerfil', aux)
      .subscribe(data => {
       if(data.erros == null){

        this.comentarios = data.dados
        if(this.comentarios.length === 0)
          this.found = false
        else
          this.found = true


         
          this.comentarios.forEach(element => {
            this.auxIdadeRec += Number(element.idadeRecomendada)
            this.auxNumComentarios += 1
        });


        this.IdadeRecomendada = this.auxIdadeRec / this.auxNumComentarios
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
    else{
    this.toastr.error("Erro ao carregar a pagina, realize novo acesso pela página de pesquisa", "Carregamento Falhou")
    this.router.navigate(["/search"])
  }

}


getPerfil()
{
  let aux = new PerfilInputDto() 
      var prof = sessionStorage.getItem("LAST_PROFILE")
      if(prof != null && prof != "" && prof != undefined){
        aux.IdPerfil = Number(prof)
      this.http.post<any>('https://localhost:7131/api/PerfilInstagram/ObterPerfil', aux)
      .subscribe(data => {
       if(data.erros == null){

        this.LinkFoto = data.dados.linkFoto
        this.NomePerfil = data.dados.nomePerfil
        this.IdPerfil = data.dados.idPerfil
        this.PCA = data.dados.pca
        //this.IdadeRecomendada = data.dados.idadeRecomendada
        this.Linkperfil = data.dados.linkPerfil
        this.isLoading = false
        console.log(this.PCA + "aa")
     }
     else
     {
       this.toastr.error(data.erros[0], "Erro")
       this.isLoading = false
     }
      }, 
      error=>{
       this.toastr.error("Erro ao comunicar com os servidores, entre em contato com o adiministrador", "Erro de conexão")
       this.isLoading = false
     });
    }
    else
    {
    this.toastr.error("Erro ao carregar a pagina, realize novo acesso pela página de pesquisa", "Carregamento Falhou")
    this.isLoading = false
    }


}


apagarComentario(idComentario: number, idUsuario: number){

  let aux = new ApagarComentarioInputDto() 
      
      aux.IdComentario = idComentario
      aux.IdUsuario = idUsuario
      var token = sessionStorage.getItem("TOKEN")
      aux.Token = token != null ? token : ""


      this.http.post<any>('https://localhost:7131/api/Comentario/ApagarComentario', aux)
      .subscribe(data => {
       if(data.erros == null){
        window.location.reload();
        this.toastr.success("Comentario apagado com sucesso", "Sucesso")
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


adicionarComentario(){
  this.router.navigate(["/comment-add"])
}


}


export class ComentarioPerfilInputDto{
  IdPerfil: number;
  constructor(){
    this.IdPerfil = 0
  }
}


export class PerfilInputDto{
  IdPerfil: number;
  constructor(){
    this.IdPerfil = 0
  }
}

export class ApagarComentarioInputDto{
    IdUsuario : number
   IdComentario : number
   Token : string
   constructor()
   {
    this.IdUsuario = 0;
    this.IdComentario = 0;
    this.Token = ""
   }
}