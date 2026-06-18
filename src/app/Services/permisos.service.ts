import { Injectable } from '@angular/core';
import { Permiso } from '../Models/Permisos';

@Injectable({
  providedIn: 'root',
})
export class PermisosService {
  constructor() {}

  private get permisos(): Permiso[] {
    const permisos = localStorage.getItem('permisos');
    return permisos ? JSON.parse(permisos) : [];
  }

  puedeVer(seccionId: number): boolean {
    return this.permisos.some((p) => p.seccionId === seccionId && p.puedeVer);
  }

  puedeCrear(seccionId: number): boolean {
    return this.permisos.some((p) => p.seccionId === seccionId && p.puedeCrear);
  }

  puedeEditar(seccionId: number): boolean {
    return this.permisos.some(
      (p) => p.seccionId === seccionId && p.puedeEditar,
    );
  }

  puedeEliminar(seccionId: number): boolean {
    return this.permisos.some(
      (p) => p.seccionId === seccionId && p.puedeEliminar,
    );
  }
}
