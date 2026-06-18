import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { SerieSiguiendo } from '../Models/SerieEstatus';
import { SerieProximo } from '../Models/SerieEstatus';

@Injectable({
  providedIn: 'root'
})
export class SerieEstatusService {
  API_URL = `${environment.apiUrl}/SerieSiguiendo`;
  API_URL2 = `${environment.apiUrl}/SerieProximo`;

  constructor(private http: HttpClient) {}

  //#region Siguiendo
  getListaSiguiendo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/Vistos`);
  }

  getByIdSiguiendo(id: number): Observable<SerieSiguiendo> {
    return this.http.get<SerieSiguiendo>(`${this.API_URL}/${id}`);
  }

  createSiguiendo(form: SerieSiguiendo): Observable<SerieSiguiendo> {
    return this.http.post<SerieSiguiendo>(`${this.API_URL}`, form);
  }

  updateSiguiendo(id: number, form: SerieSiguiendo): Observable<SerieSiguiendo> {
    return this.http.put<SerieSiguiendo>(`${this.API_URL}/${id}`, form);
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

  createProximo(form: SerieProximo): Observable<SerieProximo> {
    return this.http.post<SerieProximo>(`${this.API_URL2}`, form);
  }

  deleteProximo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL2}/${id}`);
  }
}
