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
  periodos: any;
  semanas:any;
  private rows: any;
  private registros: any;
  private EventoPadrao;
  dotsCount = [0,1,2,3];
  DisplayNone = true;
  private Helper;
  id_atleta;
  id_evento;

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

  BuscarAtividades(user, id_evento){

    this.id_atleta = user._id;
    this.id_evento = id_evento;

    this.apiService.buscarAtividadesPorEventoAtleta(user, id_evento).subscribe(resp => {

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
    if(semana.Concluida || semana.Desbloqueada()) {
      this.commonService.setData(semana, this.commonService.weekView_key);
      this.router.navigate(['../week']);
    }
  }

  CarregarAtividades(e)
  {
    const dataReferencia = this.commonService.addDays(new Date(), -1);
    let periodoAtivo = e == null ? 2 : e.target.value;
    
    let periodoAtual = this.EventoPadrao.Periodos.filter(x => x.Periodo == Number.parseInt(periodoAtivo))[0];

    periodoAtual.Semanas.forEach(semana => {

      let atividadesSemana = this.registros.atividades.filter( x => x.semana == semana.Numero)
      let tempoTotal = 0;

      semana.Dias.forEach(dia => {

        if(atividadesSemana.length != 0) {

          let atividadeDia = this.registros.atividades.filter( x => x.semana == semana.Numero && x.dia === dia.Numero)[0];

          if(atividadeDia) {
            tempoTotal += atividadeDia.tempo;
            semana.Tempo +=  atividadeDia.tempo;
            semana.Pontuacao += atividadeDia.pontuacao;
  
            //day-open | closed | finished  
            dia.Tempo = atividadeDia.tempo; 
            dia.Pontuacao = atividadeDia.pontuacao;
            dia.Observacao = atividadeDia.observacao;
            dia.MensagemPontuacao = atividadeDia.pontuacao_mensagem;
            dia.Esforco = atividadeDia.esforco;
            dia.Concluido = atividadeDia.concluido;
          }        
        }      
        
        dia.Class = dia.Data <= dataReferencia ? 'day-open' : 'day-closed';
        dia.Desbloqueado = dia.Data <= dataReferencia;
        dia.TempoAtividade = semana.TempoAtividade;
        
        dia.Id_atleta = this.id_atleta;
        dia.Id_evento = this.id_evento;

      });

      semana.Tempo = this.commonService.formatarMinutos(tempoTotal);
      semana.Concluida = this.registros.atividades.filter( x => x.semana == semana.Numero).length == 7;      
      semana.Class = semana.DataInicio <= dataReferencia ? 'week-open' : 'week-closed';

      semana.Desbloqueada = function(){
        return semana.Class === 'week-open';
      };
    });

    this.semanas = periodoAtual.Semanas;
    this.DisplayNone = false;
  }
}
