import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform, ModalController } from '@ionic/angular';
import { ModalPage } from '../components/modal/modal.page';
import { CommonService } from '../core/Common';
import { IfStmt } from '@angular/compiler';
import { Router } from '@angular/router';

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
  TempoAtividadePadrao;
  concluido = false;

  isRun = false;
  estado = 'play';
  refreshColor = 'light';

  constructor(
    private router: Router,
    public navCtrl: NavController,
    private plt: Platform,
    alertCtrl: AlertController,
    public modalController: ModalController,
    private commonService: CommonService) { }

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
    let atividadeConcluida = false;

    this.contador = setInterval(() => {
      if (!atividadeConcluida) {
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
      }

      if (this.minutos == this.TempoAtividadePadrao) {
        atividadeConcluida = true;
        this.concluido = true;
        this.Centesimas = '00';
      }
    }, 100);
  }

  pause() {
    clearInterval(this.contador);
  }


  stop() {

    if (!this.isRun) {
      clearInterval(this.contador);
      this.horas = 0;
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

  ngOnInit() {
    this.row = this.commonService.getData(this.commonService.DAY_VIEW_KEY);
    this.TempoAtividadePadrao = this.row.TempoAtividade || 5;
  }

  async presentModal() {

    const modal = await this.modalController.create({
      component: ModalPage
    });

    modal.onDidDismiss().then(result => {

      if (result) {
        if (result.data) {
          // this.row.Concluido = result.data.concluido;
          // this.row.Observacao = result.data.observacao;
          // this.row.MensagemPontuacao = result.data.pontuacao_mensagem;
          // this.row.Esforco = result.data.esforco;
        }
      }

    });
    return await modal.present();
  }

}
