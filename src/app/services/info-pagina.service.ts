import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { infopagina } from '../interfaces/info-pagina.interface';
@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: infopagina = {};
  cargada = false;
  equipo: any[] = [];
  constructor(private http: HttpClient) {

    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    this.http.get('assets/data/data-pagina.json')
      .subscribe((resp: infopagina) => {
        this.cargada = true;
        this.info = resp;
      });
  }

  private cargarEquipo() {
    this.http.get('https://angular-html-c93d4-default-rtdb.firebaseio.com/equipo.json')
      .subscribe( (resp: any) => {
        this.equipo = resp;
        console.log(resp);
      });
  }
}


