import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Caricatura } from '../Models/Caricatura';

@Injectable({
  providedIn: 'root',
})
export class CaricaturaService {
  API_URL = `${environment.apiUrl}/Caricatura`;

  constructor(private http: HttpClient) {}

  getLista(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}`);
  }

  getById(id: number): Observable<Caricatura> {
    return this.http.get<Caricatura>(`${this.API_URL}/${id}`);
  }

  create(form: Caricatura): Observable<Caricatura> {
    return this.http.post<Caricatura>(`${this.API_URL}`, form);
  }

  update(id: number, form: Caricatura): Observable<Caricatura> {
    return this.http.put<Caricatura>(`${this.API_URL}/${id}`, form);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
