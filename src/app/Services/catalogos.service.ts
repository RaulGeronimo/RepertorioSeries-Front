import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CatalogosService {
  API_URL = `${environment.apiUrl}/Catalogos`;
  constructor(private http: HttpClient) {}

  getRol() {
    return this.http.get(`${this.API_URL}/Rol`);
  }

  getClasificacion() {
    return this.http.get(`${this.API_URL}/Clasificacion`);
  }
}
