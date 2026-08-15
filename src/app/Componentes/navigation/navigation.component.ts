import { Component } from '@angular/core';
import { AlertasService } from 'src/app/Services/alertas.service';
import { AuthService } from 'src/app/Services/auth.service';
import { PermisosService } from 'src/app/Services/permisos.service';
import { Seccion } from 'src/app/enum/seccion.enum';
import { environment } from 'src/environments/environment';
import {
  NavDropdownItem,
  NavExternalLinkItem,
  NavItem,
  NavLinkItem,
} from 'src/app/Models/NavItem';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  //#region Permisos
  Seccion = Seccion;
  proyecto = environment.proyecto;
  URL_Anime = environment.urlAnime;
  URL_Musica = environment.urlMusica;
  URL_Series = environment.urlSeries;
  //#endregion Permisos

  //#region Principal
  navItemsPrincipal: NavItem[] = [
    {
      tipo: 'dropdown',
      nombre: 'Caricaturas',
      seccion: Seccion.Caricatura,
      items: [
        { nombre: 'Lista', routerLink: ['caricaturas'] },
        {
          nombre: 'Temporadas',
          routerLink: ['temporadasCaricatura'],
          seccion: Seccion.TemporadaCaricatura,
          divisorAntes: true,
        },
      ],
    },
    {
      tipo: 'dropdown',
      nombre: 'Series',
      seccion: Seccion.Serie,
      items: [
        { nombre: 'Lista', routerLink: ['series'] },
        {
          nombre: 'Temporadas',
          routerLink: ['temporadasSerie'],
          seccion: Seccion.TemporadaSerie,
          divisorAntes: true,
        },
      ],
    },
    {
      tipo: 'link',
      nombre: 'Películas',
      routerLink: ['peliculas'],
      seccion: Seccion.Pelicula,
    },
  ];
  //#endregion Principal

  //#region Auditoria
  navItemsAuditoria: NavItem[] = [
    {
      tipo: 'dropdown',
      nombre: 'Bitácora',
      seccion: Seccion.Bitacora,
      items: [
        { nombre: 'Carga', routerLink: ['bitacoraCarga'] },
        { nombre: 'Error', routerLink: ['bitacoraError'] },
      ],
    },
    {
      tipo: 'link',
      nombre: 'Usuarios',
      routerLink: ['users'],
      seccion: Seccion.Usuarios,
    },
  ];
  //#endregion Auditoria

  //#region Otros Proyectos
  otrosProyectos: NavExternalLinkItem[] = [
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
  //#endregion Otros Proyectos

  user: User;

  constructor(
    private userService: AuthService,
    public permiso: PermisosService,
    private alerta: AlertasService,
  ) {
    this.user = this.userService.obtenerDatosUsuario() ?? { usuario: '' };
  }

  get otrosProyectosFiltrados() {
    return this.otrosProyectos.filter((x) => x.id !== this.proyecto);
  }

  esLink(item: NavItem): item is NavLinkItem {
    return item.tipo === 'link';
  }

  esDropdown(item: NavItem): item is NavDropdownItem {
    return item.tipo === 'dropdown';
  }

  puedeVerSeccion(seccion?: Seccion): boolean {
    return !seccion || this.permiso.puedeVer(seccion);
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
