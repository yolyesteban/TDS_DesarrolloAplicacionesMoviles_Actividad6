import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs, query } from 'firebase/firestore';

export interface IContactos {
  idcontacto?: string;
  nombre?: string;
  direccion?: string;
  correo?: string;
  telefonomovil?: string;
  telefonocasa?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactosService {
  contactos: IContactos[] = [];

  constructor(private fireStore: Firestore) {}

  async obtenerContactos() {
    this.contactos = [];
    const q = query(collection(this.fireStore, 'contactos'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const filter = doc.data() as IContactos;
      this.contactos.push(filter);
    });

    return this.contactos;
  }

  filtrarContacto(numero: string) {
    const contactoFiltrado =
      numero.trim() === ''
        ? this.contactos
        : this.contactos.filter(
            (x) => x.telefonomovil === numero || x.telefonocasa === numero
          );

    return contactoFiltrado;
  }
}
