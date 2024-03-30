import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class BaseService{
    private readonly serviceUrl: string;

    constructor(private http: HttpClient)
    {
        this.serviceUrl = "https://localhost:7131/"
    }

    get(endPoint: string)
    {
        var options = this.createRequestHeader();

        return this.http.get<any>(this.serviceUrl + endPoint, options)
    }

    createRequestHeader(){
        let token = sessionStorage.getItem("TOKEN")

        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `${token}`)
        }
        return options;
    }

}