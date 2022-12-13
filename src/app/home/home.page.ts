import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ContactosService, IContactos } from '../services/contactos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  contactos: IContactos[] = [];
  inputBuscar: string = '';

  constructor(
    private contactoService: ContactosService,
    private toastService: ToastController
  ) {}

  async ngOnInit() {
    this.contactos = await this.contactoService.obtenerContactos();
  }

  buscar() {
    this.contactos = this.contactoService.filtrarContacto(this.inputBuscar);
    this.toastAlert(
      '¡Busqueda realizada con éxito!',
      'success'
    );
  }

  async toastAlert(message: string, color: string) {
    const toast = await this.toastService.create({
      message,
      duration: 2000,
      color,
    });

    await toast.present();
  }
}
