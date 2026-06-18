import { Component } from '@angular/core';
import { AlertasService } from 'src/app/Services/alertas.service';
import { AuthService } from 'src/app/Services/auth.service';
import { PermisosService } from 'src/app/Services/permisos.service';
import { Seccion } from 'src/app/enum/seccion.enum';
import { Rol } from 'src/app/enum/Rol.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  //#region Permisos
  Seccion = Seccion;
  Rol = Rol;
  proyecto = environment.proyecto;
  URL_Anime = environment.urlAnime;
  URL_Musica = environment.urlMusica;
  URL_Series = environment.urlSeries;
  //#endregion Permisos

  otrosProyectos = [
    {
      id: 1,
      nombre: 'Repertorio Música',
      url: environment.urlMusica,
    },
    {
      id: 2,
      nombre: 'Repertorio Series',
      url: environment.urlSeries,
    },
    {
      id: 3,
      nombre: 'Repertorio Anime',
      url: environment.urlAnime,
    },
  ];

  user: any;
  rol: any;

  constructor(
    private userService: AuthService,
    public permiso: PermisosService,
    private alerta: AlertasService,
  ) {
    this.user = this.userService.obtenerUsuario();
    this.rol = this.userService.getRolId();
  }

  get otrosProyectosFiltrados() {
    return this.otrosProyectos.filter((x) => x.id !== this.proyecto);
  }

  Salir() {
    this.alerta
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
}
