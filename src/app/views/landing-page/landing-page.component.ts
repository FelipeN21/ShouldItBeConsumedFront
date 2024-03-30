import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  nomeLogado : string
  valido: boolean

  constructor(private router: Router, private http: HttpClient){
    this.nomeLogado = ""
    this.valido = false
  }

  ngOnInit(){
    this.getUserName();
  }

  toLogin()
  {
   
    this.router.navigate(["/login"]);
  }

  toNewAcc(){
    this.router.navigate(["/new-account"])
  }

  navigate(){
    this.router.navigate(["/home-page"])
  }


  getUserName(){
    try{
      var holder = sessionStorage.getItem("NOME")
      this.nomeLogado = holder == null ? "" : holder
      if(this.nomeLogado != "")
      this.router.navigate(["/home-page"])
      else
      this.valido = false
      
      console.log(this.valido)
    }
    catch{
      ;
    }
  }
  
}

