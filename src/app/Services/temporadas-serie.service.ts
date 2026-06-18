import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { TemporadaSerie } from '../Models/Temporada';

@Injectable({
  providedIn: 'root',
})
export class TemporadasSerieService {
  API_URL = `${environment.apiUrl}/TemporadaSerie`;

  constructor(private http: HttpClient) {}

  getLista(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}`);
  }

  getById(id: number): Observable<TemporadaSerie> {
    return this.http.get<TemporadaSerie>(`${this.API_URL}/${id}`);
  }

  create(form: TemporadaSerie): Observable<TemporadaSerie> {
    return this.http.post<TemporadaSerie>(`${this.API_URL}`, form);
  }

  update(id: number, form: TemporadaSerie): Observable<TemporadaSerie> {
    return this.http.put<TemporadaSerie>(`${this.API_URL}/${id}`, form);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
