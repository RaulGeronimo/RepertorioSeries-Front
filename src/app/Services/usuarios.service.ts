import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  API_URL = `${environment.apiUrl}/Auth`;

  constructor(private http: HttpClient) {}

  getUsuarios() {
    return this.http.get<any[]>(`${this.API_URL}`);
  }

  getUsuario() {
    return this.http.get(`${this.API_URL}/usuario`);
  }

  update(usuarioId: number, usuario: User): Observable<any> {
    return this.http.put(`${this.API_URL}/${usuarioId}`, usuario);
  }

  Validar(filtro: any) {
    return this.http.post<User>(`${this.API_URL}/validar`, filtro);
  }
}
