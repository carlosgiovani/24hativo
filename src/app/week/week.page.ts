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

  constructor(private commonService : CommonService) { }

  ngOnInit() {
    this.row = this.commonService.getData(this.commonService.weekView_key);
    this.carregarInformacoesDiarias();
  }

  carregarInformacoesDiarias(){

    console.log(this.row);

    this.data = 
    [
      { Titulo: 'Dia 1', InfoDia: this.VerificarSeConcluido(1)  } ,
      { Titulo: 'Dia 2', InfoDia: this.VerificarSeConcluido(2)  },
      { Titulo: 'Dia 3', InfoDia: this.VerificarSeConcluido(3)  },
      { Titulo: 'Dia 4', InfoDia: this.VerificarSeConcluido(4)  },
      { Titulo: 'Dia 5', InfoDia: this.VerificarSeConcluido(5)  },
      { Titulo: 'Dia 6', InfoDia: this.VerificarSeConcluido(6)  },
      { Titulo: 'Dia 7', InfoDia: this.VerificarSeConcluido(7)  }
    ];
  }

  VerificarSeConcluido(dia) {
    //day-open | closed | finished

    let cssClass = "day-closed";
    let concluido = false;

    let atividade = this.row.InfoSemana.atividades.filter(x => x.dia === dia)[0];

    if(this.row.InfoSemana.length === 0 || !atividade)
      return {
        Concluido : concluido,
        Class: cssClass
      };

      cssClass = "day-finished";
      concluido = true;

      return {
        Concluido : concluido,
        Class: cssClass,
        tempo: this.commonService.formatarMinutos(atividade.tempo),
        pontuacao: atividade.pontuacao
      };

    };

}
