import { Component } from '@angular/core';
import { AlertasService } from 'src/app/Services/alertas.service';
import { AuthService } from 'src/app/Services/auth.service';
import { NavigationService } from 'src/app/Services/navigation.service';

@Component({
  selector: 'app-sin-permiso',
  templateUrl: './sin-permiso.component.html',
  styleUrls: ['./sin-permiso.component.css'],
})
export class SinPermisoComponent {
  constructor(
    private navigationService: NavigationService,
    private userService: AuthService,
    private alertaService: AlertasService,
  ) {}

  Salir() {
    this.alertaService
      .mostrarAlertaConfirmacion(
        '¿Estas seguro de salir de la aplicación?',
        '',
        '¡Salir!',
        'Cancelar',
      )
      .then((confirmed) => {
        if (confirmed) {
          this.userService.logout();
        }
      })
      .catch(() => {
        this.userService.logout();
      });
  }

  regresar(): void {
    this.navigationService.goBack();
  }
}
