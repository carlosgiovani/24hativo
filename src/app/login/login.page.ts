import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { AutenticacaoService } from '../services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  email;
  senha;

  constructor(
    private router: Router,
    private apiService : ApiService,
    private autenticaoService: AutenticacaoService
  ) { }

  ngOnInit() {
    if(this.autenticaoService.isLogged()){
      this.router.navigate(['home']);
    }
  }

  login() {
    this.apiService
        .autenticar(this.email, this.senha)
        .subscribe( resp => 
          {
            const isValid = this.autenticaoService.checkAndSaveIfValid(resp);
            
            if(isValid)
            {
              this.router.navigate(['home']);
            }
          });
  }

  

}
