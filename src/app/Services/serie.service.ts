import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Serie } from '../Models/Serie';

@Injectable({
  providedIn: 'root',
})
export class SerieService {
  API_URL = `${environment.apiUrl}/Serie`;

  constructor(private http: HttpClient) {}

  getLista(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}`);
  }

  getById(id: number): Observable<Serie> {
    return this.http.get<Serie>(`${this.API_URL}/${id}`);
  }

  create(form: Serie): Observable<Serie> {
    return this.http.post<Serie>(`${this.API_URL}`, form);
  }

  update(id: number, form: Serie): Observable<Serie> {
    return this.http.put<Serie>(`${this.API_URL}/${id}`, form);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
