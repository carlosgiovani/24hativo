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
  private periodos: any;
  private semanas:any;
  private rows: any;
  private registros: any;
  private EventoPadrao;
  private dotsCount = [0,1,2,3];
  private DisplayNone = true;
  private Helper;

  constructor(
    private router: Router,
    private autenticaoService: AutenticacaoService,
    private apiService: ApiService,
    private commonService : CommonService
  ) {}

  ngOnInit() {
    this.Helper = this.commonService;
    const user = this.autenticaoService.getUser();
    this.ConfigurarApp(user);
  }

  ConfigurarApp(user: any) {
    this.apiService.buscarEventoAtivo(user).subscribe( resp => {
      let dataInicio = resp.data.evento.data_inicio;

      this.dataInicial = dataInicio;
      this.BuscarAtividades(user, resp.data.evento._id);     

    });
  }

  BuscarAtividades(id_atleta, id_evento){
    this.apiService.buscarAtividadesPorEventoAtleta(id_atleta, id_evento).subscribe(resp => {

      const helper = this.commonService;

      this.atividadeInicial = resp.atividades.length == 0;
      this.registros = resp;
      this.EventoPadrao = helper.CriarEventoPadrao(this.dataInicial);
      let periodos = [];

      const dataReferencia = helper.addDays(new Date(), -1);

      this.EventoPadrao.Periodos.forEach( evento => {
        let selected = '';

        if(dataReferencia >= evento.DataInicio) {
          selected = 'Selected';
        }

        periodos.push({ 
          Titulo : 'Período ' + evento.Periodo,
          Selected: selected,
          Value: evento.Periodo 
        });

      });

      this.periodos = periodos;
      this.CarregarAtividades(null);
    });
  }

  VisualizarInfoSemana(semana){
    console.log(semana);
    this.commonService.setData(semana, this.commonService.weekView_key);

     this.router.navigate(['../week']);
  }

  CarregarAtividades(e)
  {
    const dataReferencia = this.commonService.addDays(new Date(), -1);
    let periodoAtivo = e == null ? 2 : e.target.value;
    
    let periodoAtual = this.EventoPadrao.Periodos.filter(x => x.Periodo == Number.parseInt(periodoAtivo))[0];

    periodoAtual.Semanas.forEach(semana => {
      let atividadesSemana = this.registros.atividades.filter( x => x.semana == semana.Numero)
      let tempoTotal = 0;

      if(atividadesSemana.length != 0) {

        semana.Dias.forEach(dia => {

          let atividadeDia = this.registros.atividades.filter( x => x.semana == semana.Numero && x.dia === dia.Numero)[0];

          if(atividadeDia.length != 0) { 
            tempoTotal += atividadeDia.tempo;
            semana.Tempo +=  atividadeDia.tempo;
            semana.Pontuacao += atividadeDia.pontuacao;

            ////day-open | closed | finished

            dia.Tempo = atividadeDia.tempo;
            dia.Concluido = atividadeDia.concluido;
            dia.Class = atividadeDia.Data < dataReferencia ? 'day-closed' : atividadeDia.concluido ? 'day-finished' : 'day-open';
            dia.Pontuacao = atividadeDia.pontuacao;

            console.log(dia.Data);
            console.log(dataReferencia);
            console.log(atividadeDia.Data < dataReferencia ? 'day-closed' : atividadeDia.concluido ? 'day-finished' : 'day-open');
          }

        });

        semana.Tempo = this.commonService.formatarMinutos(tempoTotal);
        semana.Concluida = this.registros.atividades.filter( x => x.semana == semana.Numero).length == 7;
        semana.Class = semana.concluido ? 'week-finished' : semana.DataInicio >= dataReferencia ? 'week-open' : 'week-closed';
      }
    });

    this.semanas = periodoAtual.Semanas;
    this.DisplayNone = false;
  }
}
