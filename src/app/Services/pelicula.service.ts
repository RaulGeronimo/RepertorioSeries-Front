import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Pelicula } from '../Models/Pelicula';

@Injectable({
  providedIn: 'root',
})
export class PeliculaService {
  API_URL = `${environment.apiUrl}/Pelicula`;

  constructor(private http: HttpClient) {}

  getLista(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}`);
  }

  getById(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.API_URL}/${id}`);
  }

  create(form: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(`${this.API_URL}`, form);
  }

  update(id: number, form: Pelicula): Observable<Pelicula> {
    return this.http.put<Pelicula>(`${this.API_URL}/${id}`, form);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
