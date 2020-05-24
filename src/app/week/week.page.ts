import { Component, OnInit } from '@angular/core';
import { CommonService } from '../core/Common';

@Component({
  selector: 'app-week',
  templateUrl: './week.page.html',
  styleUrls: ['./week.page.scss'],
})
export class WeekPage implements OnInit {
  private row: any;
  private data: any;
  private indexStartWeek = 0;
  private diaInicioSemana = 1;

  constructor(private commonService : CommonService) { }

  ngOnInit() {
    this.indexStartWeek = this.commonService.getIndextStartEventDate();
    this.row = this.commonService.getData(this.commonService.weekView_key);
    this.diaInicioSemana = (this.row.Titulo.replace('Semana ', '') * 7) - 6;
    this.CarregarInformacoesDiarias();
  }

  CarregarInformacoesDiarias(){
    
    this.data = 
    [
      this.CarregarInformacoesDia(1),
      this.CarregarInformacoesDia(2),
      this.CarregarInformacoesDia(3),
      this.CarregarInformacoesDia(4),
      this.CarregarInformacoesDia(5),
      this.CarregarInformacoesDia(6),
      this.CarregarInformacoesDia(7)
    ];
  }

  CarregarInformacoesDia(dia) {
    //day-open | closed | finished

    if(this.indexStartWeek > 6)
      this.indexStartWeek = 0;

    const titulo =  this.commonService.dias[this.indexStartWeek] + ' - Dia ' + this.diaInicioSemana ;
    const atividade = this.row.InfoSemana.atividades.filter(x => x.dia === dia)[0];

    let result = this.getResul(titulo);

    this.indexStartWeek++;
    this.diaInicioSemana++;

    if(this.row.InfoSemana.length === 0 || !atividade) { 
      return result; 
    }
      
    result.Titulo = titulo;
    result.Concluido = true;
    result.Class = "day-finished";
    result.tempo = this.commonService.formatarMinutos(atividade.tempo);
    result.pontuacao = atividade.pontuacao;

    return result;

    };

    getResul(titulo){
      return {
        Concluido : false,
        Class: "day-closed",
        Titulo: titulo,
        tempo: '00:00',
        pontuacao: 0
      };
    }
}
