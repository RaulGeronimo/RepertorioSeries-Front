import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { TemporadaCaricatura } from '../Models/Temporada';

@Injectable({
  providedIn: 'root',
})
export class TemporadasCaricaturaService {
  API_URL = `${environment.apiUrl}/TemporadaCaricatura`;

  constructor(private http: HttpClient) {}

  getLista(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}`);
  }

  getById(id: number): Observable<TemporadaCaricatura> {
    return this.http.get<TemporadaCaricatura>(`${this.API_URL}/${id}`);
  }

  create(form: TemporadaCaricatura): Observable<TemporadaCaricatura> {
    return this.http.post<TemporadaCaricatura>(`${this.API_URL}`, form);
  }

  update(id: number, form: TemporadaCaricatura): Observable<TemporadaCaricatura> {
    return this.http.put<TemporadaCaricatura>(`${this.API_URL}/${id}`, form);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
