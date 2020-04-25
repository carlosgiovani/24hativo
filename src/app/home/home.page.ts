import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../services/autenticacao.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private router: Router,
    private autenticaoService: AutenticacaoService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const user = this.autenticaoService.getUser();
  }

}
