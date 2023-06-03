import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {

    constructor(private authService: AuthService){}

    public formulario!: FormGroup;

    ngOnInit(): void {
        
        this.handleFormulario();

    }

    handleFormulario(){
        this.formulario = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });
    }

    login(){
        this.authService.login(this.formulario.value.email, this.formulario.value.password).subscribe({
            next: (res)=>{
                console.log('RESPOSTA DO LOGIN: ', res.message);
            },
            error: (error: any)=>{
                console.log('ERRO NO LOGIN: ', error.error.errors);
            }
        })
    }

}