import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  Otimo;
  Bom;
  Ruim;
  Pessimo;
  SituacaoPosAtividade = 0;
  observacao;

  constructor(private nav: NavController, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.limparSituacoes();
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }

  SalvarAtividade(){

    if(this.SituacaoPosAtividade === 0){
      alert('Como você está se sentido?');
      return;
    }

    this.modalCtrl.dismiss({ Sentimento: this.SituacaoPosAtividade, Observacao: this.observacao });

  };

  SelecionarSituacao(index) {    
    this.limparSituacoes();
    this.SituacaoPosAtividade = index;

    switch (index) {
      case 1:        
        this.Otimo = 'selected';
        break;
        case 2:        
        this.Bom = 'selected';
        break;
        case 3:        
        this.Ruim = 'selected';
        break;
        case 4:        
        this.Pessimo = 'selected';
        break;
      default:
        this.Otimo = 'selected';
        break;
    }    
  }

  limparSituacoes() {
    this.SituacaoPosAtividade = 0;
    this.Otimo = '';
    this.Bom = '';
    this.Ruim = '';
    this.Pessimo = '';
  }
}
