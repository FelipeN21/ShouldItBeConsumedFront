import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchInputDto } from 'src/app/Dtos/search-input-dto';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  nomeLogado : string
  valido: boolean
  searchForm: FormGroup;
  perfis: any[] = [];
  found: boolean = false;

  constructor(private router: Router,private http: HttpClient, private toastr: ToastrService){
    this.nomeLogado = ""
    this.valido = false


    this.searchForm = new FormGroup({
      query: new FormControl('', [Validators.required])
    })

  }

ngOnInit(): void {
  this.getUserName()
  this.searchQueryBase("")
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

searchQuery()
{
  let aux = new SearchInputDto() 
    aux.Query = this.searchForm.value.query
    if(aux.Query != ""){
    sessionStorage.setItem("LAST_QUERY", aux.Query)
    this.router.navigate(["/search"]);
  }
  else
  this.toastr.warning("O campo de pesquisa não pode ser nulo","Campo nulo")



}


searchQueryBase(nome: string)
{
  let aux = new SearchInputDto() 
    aux.Query = nome
    if(true){

      this.http.post<any>('https://shoulditbeconsumed20240330142139.azurewebsites.net/api/PerfilInstagram/ListarPerfis', aux)
      .subscribe(data => {
       if(data.erros == null){

        this.perfis = data.dados
        if(this.perfis.length === 0)
          this.found = false
        else
        this.found = true
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

Pitchceil(valor: number)
{

 var aux = parseFloat(valor.toFixed(1));
return aux
}

goToComment(index: number){
  console.log(this.perfis[index].id)
  sessionStorage.setItem("LAST_PROFILE",this.perfis[index].id)
  sessionStorage.setItem("LAST_PROFILE_NAME", this.perfis[index].nomePerfil)
  this.router.navigate(["/comment"])
  }

}