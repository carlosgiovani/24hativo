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
    this.Inicializar();
  }

  Inicializar() {
    const helper = this.commonService;
    
    this.indexStartWeek = helper.getIndextStartEventDate();
    this.row = this.commonService.getData(helper.weekView_key);
    const nroSemana = this.row.Titulo.replace('Semana ', '');
    this.diaInicioSemana = (nroSemana * 7) - 6;

    this.data = this.row.Dias;
  }
}
