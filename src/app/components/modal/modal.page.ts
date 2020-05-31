import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/core/Common';
import { ApiService } from 'src/app/services/api.service';

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
  row;

  constructor(
    private nav: NavController,
    private modalCtrl: ModalController,
    private apiService: ApiService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.limparSituacoes();
    this.row = this.commonService.getData(this.commonService.DAY_VIEW_KEY);

    console.log(this.row);
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }

  SalvarAtividade() {

    if (this.SituacaoPosAtividade === 0) {
      alert('Informe como você está se sentido');
      return;
    }

    let atividade = {
        "id_atleta": this.row.id_atleta,
        "id_evento": this.row.id_evento,
        "semana": this.row.semana,
        "dia": this.row.dia,
        "tempo": this.row.TempoAtividade,
        "concluido": true,
        "pontuacao": this.row.pontuacao,
        "pontuacao_mensagem": this.row.pontuacao_mensagem,
        "observacao": this.observacao,
        "data_cadastro": new Date(),
        "esforco": this.SituacaoPosAtividade
    };
    
    this.apiService.cadastrarAtividade(atividade).subscribe(result => {
      this.modalCtrl.dismiss({ Sentimento: this.SituacaoPosAtividade, Observacao: this.observacao });
    }, error => {
      console.log(error);
      alert('Erro ao gravar atividade');
    });
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
