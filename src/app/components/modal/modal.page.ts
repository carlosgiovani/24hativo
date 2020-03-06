import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor(private nav: NavController, private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
}
