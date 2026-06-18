import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BitacoraService {
  API_URL = `${environment.apiUrl}/Bitacora`;

  constructor(private http: HttpClient) {}

  getBitacoraCarga() {
    return this.http.get<any[]>(`${this.API_URL}/Carga`);
  }

  getBitacoraCargaUsuario() {
    return this.http.get<any[]>(`${this.API_URL}/Carga/Usuario`);
  }

  getBitacoraError() {
    return this.http.get<any[]>(`${this.API_URL}/Error`);
  }

  getBitacoraErrorUsuario() {
    return this.http.get<any[]>(`${this.API_URL}/Error/Usuario`);
  }
}
