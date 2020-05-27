import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform, ModalController } from '@ionic/angular';
import { ModalPage } from '../components/modal/modal.page';
import { CommonService } from '../core/Common';

@Component({
  selector: 'app-day',
  templateUrl: './day.page.html',
  styleUrls: ['./day.page.scss'],
})
export class DayPage implements OnInit {
  row: any;

  public centesimas = 0;
  public segundos = 0;
  public minutos = 0;
  public horas = 0;
  public contador: any;

  public Centesimas = '00';
  public Segundos = '00';
  public Minutos = '00';
  public Horas = '00';

  isRun = false;
  estado = 'play';
  refreshColor = 'light';

  constructor(
    public navCtrl: NavController, 
    private plt: Platform, 
    alertCtrl: AlertController, 
    public modalController: ModalController,
    private commonService : CommonService) { }

  estadoSwap() {
    this.isRun = !this.isRun;
    if (this.isRun) {
      this.estado = 'pause';
      this.refreshColor = 'gris';
      this.start();
    } else {
      this.estado = 'play';
      this.refreshColor = 'light';
      this.pause();
    }
  }

  start() {
    this.contador = setInterval(() => {
      this.centesimas += 1;
      if (this.centesimas < 10) { this.Centesimas = '0' + this.centesimas; } else { this.Centesimas = '' + this.centesimas; }
      if (this.centesimas === 10) {
        this.centesimas = 0;
        this.segundos += 1;

        if (this.segundos < 10) { this.Segundos = '0' + this.segundos; } else { this.Segundos = '' + this.segundos; }
        if (this.segundos === 60) {
          this.segundos = 0;
          this.minutos += 1;

          if (this.minutos < 10) { this.Minutos = '0' + this.minutos; } else { this.Minutos = '' + this.minutos; }
          this.Segundos = '00';
          if (this.minutos === 60) {
           this.minutos = 0;
           this.horas += 1;

           if (this.horas < 10) { this.Horas = '0' + this.horas; } else { this.Horas = '' + this.horas; }
          }
        }
      }
    }, 100 );
  }

  pause() {
    clearInterval(this.contador);
  }

  stop() {

    if (!this.isRun) {
      clearInterval(this.contador);
      this.horas = 0;
      this.minutos = 0;
      this.segundos = 0;
      this.centesimas = 0;

      this.Centesimas = '00';
      this.Segundos = '00';
      this.Minutos = '00';
      this.Horas = '00';

      this.estado = 'play';
      this.isRun = false;
      this.contador = null;
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage
    });
    return await modal.present();
  }

  ngOnInit() {

    this.row = this.commonService.getData(this.commonService.DAY_VIEW_KEY);

    this.CarregarInformacoesDia();
  }

  CarregarInformacoesDia() {

    //console.log(this.row);
  }


}
