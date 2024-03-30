import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchInputDto } from 'src/app/Dtos/search-input-dto';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  nomeLogado : string
  valido: boolean
  searchForm: FormGroup;
  perfis: any[] = [];
  found: boolean = false;
  isLoading: boolean = false;

  constructor(private router: Router,private http: HttpClient, private toastr: ToastrService){
    this.nomeLogado = ""
    this.valido = false


    this.searchForm = new FormGroup({
      query: new FormControl('', [Validators.required])
    })

  }

  ngOnInit(): void {
    this.getUserName()

    var aux = sessionStorage.getItem("LAST_QUERY")
    var auxF = aux == null ? "" : aux

    if(aux == "" || null || undefined)
    this.toastr.warning("Busca invalida","Digite novamente o nome que deseja buscar")
    else
    this.searchQueryBase(auxF);


    
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

exibirImagemBase64(imgSrc: string) {
  // Cria um elemento de imagem
  const imgElement = document.createElement('img');

  // Define o atributo src da imagem como a string base64
  imgElement.src = imgSrc;

  // Adiciona a imagem ao corpo do documento HTML
  document.body.appendChild(imgElement);
}

// Exemplo de uso: exibir uma imagem a partir de uma string base64

Pitchceil(valor: number)
{

 var aux = parseFloat(valor.toFixed(1));
return aux
}

searchQuery()
{
  this.isLoading = true; // Mostrar o spinner
  let aux = new SearchInputDto() 
    aux.Query = this.searchForm.value.query
    if(aux.Query != ""){

      this.http.post<any>('https://localhost:7131/api/PerfilInstagram/ListarPerfis', aux)
      .subscribe(data => {
       if(data.erros == null){

        this.perfis = data.dados
        if(this.perfis.length === 0)
          this.found = false
        else
        this.found = true
        this.isLoading = false;


     }
     else
     {
       this.toastr.error(data.erros[0], "Erro")
       this.isLoading = false;
     }
      }, 
      error=>{
       this.toastr.error("Erro ao comunicar com os servidores, entre em contato com o adiministrador", "Erro de conexão")
       this.isLoading = false;
     });
 

     sessionStorage.setItem("LAST_QUERY", aux.Query)
  }
  else{
  this.toastr.warning("O campo de pesquisa não pode ser nulo","Campo nulo")
  this.isLoading = false;
}



}

mailTo() {
  window.location.href = "mailto:felipedevhelp@outlook.com";
}

searchQueryBase(nome: string)
{
  this.isLoading = true; // Mostrar o spinner
  let aux = new SearchInputDto() 
    aux.Query = nome
    if(aux.Query != ""){

      this.http.post<any>('https://localhost:7131/api/PerfilInstagram/ListarPerfis', aux)
      .subscribe(data => {
       if(data.erros == null){

        this.perfis = data.dados
        if(this.perfis.length === 0)
          this.found = false
        else
        this.found = true
        this.isLoading = false;
     }
     else
     {
       this.toastr.error(data.erros[0], "Erro")
       this.isLoading = false;
     }
      }, 
      error=>{
       this.toastr.error("Erro ao comunicar com os servidores, entre em contato com o adiministrador", "Erro de conexão")
       this.isLoading = false;
     });
 
  }
  else{
  this.toastr.warning("O campo de pesquisa não pode ser nulo","Campo nulo")
  this.isLoading = false;
}



}

goToComment(index: number){
console.log(this.perfis[index].id)
sessionStorage.setItem("LAST_PROFILE",this.perfis[index].id)
sessionStorage.setItem("LAST_PROFILE_NAME", this.perfis[index].nomePerfil)
this.router.navigate(["/comment"])
}

recommend(){

  this.isLoading = true; // Mostrar o spinner
  let aux = new recomendacoesInputDto() 
  aux.NomePerfil = this.searchForm.value.query
  if(aux.NomePerfil != ""){

      this.http.post<any>('https://localhost:7131/api/PerfilInstagram/RecomendarInfluencer', aux)
      .subscribe(data => {
       if(data.erros == null){

        if(data.dados)
          this.toastr.success("O perfil será análisado pela equipe e será adicionado caso cumpra os parâmetros (possuir mais de 100000 seguidores)","Influenciador recomendado com sucesso")
        else
        this.toastr.warning("Esse perfil já está na plataforma ou já foi recomendado e aguarda análise da equipe de gestão ","Influenciador já recomendado")

        this.isLoading = false;
     }
     else
     {
       this.toastr.error(data.erros[0], "Erro")
       this.isLoading = false;
     }
      }, 
      error=>{
       this.toastr.error("Erro ao comunicar com os servidores, entre em contato com o adiministrador", "Erro de conexão")
       this.isLoading = false;
     });
 
  }
  else{
  this.toastr.warning("Digite o nome do influenciador na barra de pesquise e recomende novamente","Campo nulo")
  this.isLoading = false;
}


}

  
}


export class recomendacoesInputDto{
  NomePerfil: string;
  constructor(){
    this.NomePerfil = ""
  }



}