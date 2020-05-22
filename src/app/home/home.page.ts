import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../services/autenticacao.service';
import { ApiService } from '../services/api.service';
import { CommonService } from '../core/Common';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private atividadeInicial = false;
  private dataInicial:any;
  private meses:any;
  private semanas:any;

  constructor(
    private router: Router,
    private autenticaoService: AutenticacaoService,
    private apiService: ApiService,
    private commonService : CommonService
  ) {}

  ngOnInit() {
    const user = this.autenticaoService.getUser();
    this.configurarApp(user);
  }

  configurarApp(user: any){
    this.apiService.buscarEventoAtivo(user).subscribe( resp => {

      this.dataInicial = resp.data.evento.data_inicio;
      this.meses = this.commonService.getMonthsEvent(resp.data.evento.data_inicio);
      
      this.carregarAtividades(user, resp.data.evento._id);     

    });
  }

  carregarAtividades(id_atleta, id_evento){
    this.apiService.buscarAtividadesPorEventoAtleta(id_atleta, id_evento).subscribe(resp => {
      this.atividadeInicial = resp.atividades.length == 0;
      this.semanas = this.commonService.getWeekEvent(resp.atividades, this.dataInicial);
    });
  }

  carregarSemanaPorMes(e)
  {
    //alert(e.target.value);
  }
}
