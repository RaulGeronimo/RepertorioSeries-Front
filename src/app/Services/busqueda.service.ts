import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  API_URL = `${environment.apiUrl}/Buscar`;

  URL_Caricatura = `${this.API_URL}/Caricatura`;
  URL_Serie = `${this.API_URL}/Serie`;

  constructor(private http: HttpClient) {}

  //#region Caricatura
  getCaricaturaId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_Caricatura}/${id}`);
  }

  getListaCaricaturaTemporadas(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_Caricatura}/Temporadas/${id}`);
  }

  getListaCaricaturaPeliculas(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_Caricatura}/Peliculas/${id}`);
  }
  //#endregion Caricatura

  //#region Serie
  getSerieId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_Serie}/${id}`);
  }

  getListaSerieTemporadas(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_Serie}/Temporadas/${id}`);
  }

  getListaSeriePeliculas(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_Serie}/Peliculas/${id}`);
  }
  //#endregion Serie
}
