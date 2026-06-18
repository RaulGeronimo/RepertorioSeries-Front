import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CaricaturaSiguiendo } from '../Models/CaricaturaEstatus';
import { CaricaturaProximo } from '../Models/CaricaturaEstatus';

@Injectable({
  providedIn: 'root'
})
export class CaricaturaEstatusService {
  API_URL = `${environment.apiUrl}/CaricaturaSiguiendo`;
  API_URL2 = `${environment.apiUrl}/CaricaturaProximo`;

  constructor(private http: HttpClient) {}

  //#region Siguiendo
  getListaSiguiendo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/Vistos`);
  }

  getByIdSiguiendo(id: number): Observable<CaricaturaSiguiendo> {
    return this.http.get<CaricaturaSiguiendo>(`${this.API_URL}/${id}`);
  }

  createSiguiendo(form: CaricaturaSiguiendo): Observable<CaricaturaSiguiendo> {
    return this.http.post<CaricaturaSiguiendo>(`${this.API_URL}`, form);
  }

  updateSiguiendo(id: number, form: CaricaturaSiguiendo): Observable<CaricaturaSiguiendo> {
    return this.http.put<CaricaturaSiguiendo>(`${this.API_URL}/${id}`, form);
  }

  deleteSiguiendo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
  //#endregion Siguiendo

  //#region No Siguiendo
  getListaNoSiguiendo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/NoVistos`);
  }
  //#endregion No Siguiendo

  //#region Proximos
  getListaProximo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL2}`);
  }

  createProximo(form: CaricaturaProximo): Observable<CaricaturaProximo> {
    return this.http.post<CaricaturaProximo>(`${this.API_URL2}`, form);
  }

  deleteProximo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL2}/${id}`);
  }
  //#endregion Proximos
}
