import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient){}

    private token: string = '';

    public getToken(){
        return this.token;
    }

    public setToken(token: string) {
        this.token = token;
    }

    public login(email: string, password: string): Observable<any>{

        return this.http.post('http://localhost:5000/login', {
            email: email,
            password: password
        });

    }

}