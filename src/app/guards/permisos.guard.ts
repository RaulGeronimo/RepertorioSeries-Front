// permisos.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PermisosGuard implements CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    const seccion = route.data['seccion'];
    const permiso = route.data['permiso'];
    const permisosMultiples = route.data['permisos'];

    if (Array.isArray(permisosMultiples)) {
      const tieneTodos = permisosMultiples.every((p: any) =>
        this.authService.tienePermiso(p.seccion, p.permiso),
      );

      if (tieneTodos) return true;

      this.router.navigate(['no-autorizado']);
      return false;
    }

    if (!seccion || !permiso) return true;

    if (this.authService.tienePermiso(seccion, permiso)) {
      return true;
    }

    this.router.navigate(['no-autorizado']);
    return false;
  }
}
