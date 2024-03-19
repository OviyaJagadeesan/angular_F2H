import { Injectable } from '@angular/core';
import { Authentication } from 'src/Model/Authentication';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl:string='  http://localhost:3000/Users';

  constructor(private http:HttpClient) { }

  addUsers(data:Authentication):Observable<Authentication[]>{
    const header ={'content-type':'application/json'}
    const body = JSON.stringify(data);
    console.log(data);
    return this.http.post<Authentication[]>(this.baseUrl,body,{headers:header});
  }

  validateUser(Email:string,Password:string):Observable<any>{
    const url =`${this.baseUrl}?Email=${Email}&Password=${Password}`;
    return this.http.get(url);
  }

}
