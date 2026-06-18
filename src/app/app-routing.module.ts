import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//#region Login
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { LoginComponent } from './Componentes/Auth/login/login.component';
import { RegisterComponent } from './Componentes/Auth/register/register.component';
import { ResetPasswordComponent } from './Componentes/Auth/reset-password/reset-password.component';
//#endregion Login

import { PermisosGuard } from './guards/permisos.guard';
import { PrincipalComponent } from './Componentes/Repertorio/principal/principal.component';
import { UsuarioListComponent } from './Componentes/Repertorio/Usuarios/usuario-list/usuario-list.component';
import { PerfilComponent } from './Componentes/Repertorio/Usuarios/perfil/perfil.component';
import { BitacoraCargaComponent } from './Componentes/Repertorio/Bitacora/bitacora-carga/bitacora-carga.component';
import { BitacoraErrorComponent } from './Componentes/Repertorio/Bitacora/bitacora-error/bitacora-error.component';
import { SinPermisoComponent } from './Componentes/Repertorio/sin-permiso/sin-permiso.component';
import { PeliculaListComponent } from './Componentes/Repertorio/Pelicula/pelicula-list/pelicula-list.component';
import { PeliculaFormComponent } from './Componentes/Repertorio/Pelicula/pelicula-form/pelicula-form.component';
import { CaricaturasListComponent } from './Componentes/Repertorio/Caricaturas/caricaturas-list/caricaturas-list.component';
import { CaricaturasFormComponent } from './Componentes/Repertorio/Caricaturas/caricaturas-form/caricaturas-form.component';
import { SeriesListComponent } from './Componentes/Repertorio/Series/series-list/series-list.component';
import { SeriesFormComponent } from './Componentes/Repertorio/Series/series-form/series-form.component';
import { TemporadaCaricaturaListComponent } from './Componentes/Repertorio/Temporada/temporada-caricatura-list/temporada-caricatura-list.component';
import { TemporadaCaricaturaFormComponent } from './Componentes/Repertorio/Temporada/temporada-caricatura-form/temporada-caricatura-form.component';
import { TemporadaSerieListComponent } from './Componentes/Repertorio/Temporada/temporada-serie-list/temporada-serie-list.component';
import { TemporadaSerieFormComponent } from './Componentes/Repertorio/Temporada/temporada-serie-form/temporada-serie-form.component';
import { BuscarCaricaturaComponent } from './Componentes/Repertorio/Busqueda/buscar-caricatura/buscar-caricatura.component';
import { BuscarSerieComponent } from './Componentes/Repertorio/Busqueda/buscar-serie/buscar-serie.component';
import { CVistosComponent } from './Componentes/Repertorio/CaricaturaEstatus/vistos/vistos.component';
import { CNoVistosComponent } from './Componentes/Repertorio/CaricaturaEstatus/no-vistos/no-vistos.component';
import { CVistosFormComponent } from './Componentes/Repertorio/CaricaturaEstatus/vistos-form/vistos-form.component';
import { CProximosComponent } from './Componentes/Repertorio/CaricaturaEstatus/proximos/proximos.component';
import { SVistosComponent } from './Componentes/Repertorio/SeriesEstatus/vistos/vistos.component';
import { SVistosFormComponent } from './Componentes/Repertorio/SeriesEstatus/vistos-form/vistos-form.component';
import { SNoVistosComponent } from './Componentes/Repertorio/SeriesEstatus/no-vistos/no-vistos.component';
import { SProximosComponent } from './Componentes/Repertorio/SeriesEstatus/proximos/proximos.component';

const routes: Routes = [
  //#region Rutas Públicas
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'reset',
    component: ResetPasswordComponent,
    canActivate: [NoAuthGuard],
  },
  //#endregion Rutas Públicas

  //#region Rutas Protegidas
  {
    path: 'repertorio',
    component: PrincipalComponent,
    canActivate: [AuthGuard], // Solo autenticación aquí
    canActivateChild: [PermisosGuard], // Guard para todas las rutas hijas
    children: [
      { path: '', redirectTo: 'caricaturas', pathMatch: 'full' },

      //#region Bitácoras
      {
        path: 'bitacoraCarga',
        component: BitacoraCargaComponent,
        data: { seccion: 'Bitácoras', permiso: 'puedeVer' },
      },
      {
        path: 'bitacoraError',
        component: BitacoraErrorComponent,
        data: { seccion: 'Bitácoras', permiso: 'puedeVer' },
      },
      //#endregion Bitácoras

      //#region Usuarios
      {
        path: 'users',
        component: UsuarioListComponent,
        data: { seccion: 'Usuarios', permiso: 'puedeVer' },
      },
      {
        path: 'profile',
        component: PerfilComponent,
      },
      //#endregion Usuarios

      //#region Pelicula
      {
        path: 'peliculas',
        component: PeliculaListComponent,
        data: { seccion: 'Película', permiso: 'puedeVer' },
      },
      {
        path: 'peliculas/agregar',
        component: PeliculaFormComponent,
        data: { seccion: 'Película', permiso: 'puedeCrear' },
      },
      {
        path: 'peliculas/actualizar/:id',
        component: PeliculaFormComponent,
        data: { seccion: 'Película', permiso: 'puedeEditar' },
      },
      //#endregion Pelicula

      //#region Caricatura
      {
        path: 'caricaturas',
        component: CaricaturasListComponent,
        data: { seccion: 'Caricatura', permiso: 'puedeVer' },
      },
      {
        path: 'caricaturas/agregar',
        component: CaricaturasFormComponent,
        data: { seccion: 'Caricatura', permiso: 'puedeCrear' },
      },
      {
        path: 'caricaturas/actualizar/:id',
        component: CaricaturasFormComponent,
        data: { seccion: 'Caricatura', permiso: 'puedeEditar' },
      },
      //#region Temporadas
      {
        path: 'temporadasCaricatura',
        component: TemporadaCaricaturaListComponent,
        data: { seccion: 'Temporadas Caricatura', permiso: 'puedeVer' },
      },
      {
        path: 'temporadasCaricatura/agregar',
        component: TemporadaCaricaturaFormComponent,
        data: { seccion: 'Temporadas Caricatura', permiso: 'puedeCrear' },
      },
      {
        path: 'temporadasCaricatura/actualizar/:id',
        component: TemporadaCaricaturaFormComponent,
        data: { seccion: 'Temporadas Caricatura', permiso: 'puedeEditar' },
      },
      //#endregion Temporadas
      //#endregion Caricatura

      //#region Series
      {
        path: 'series',
        component: SeriesListComponent,
        data: { seccion: 'Serie', permiso: 'puedeVer' },
      },
      {
        path: 'series/agregar',
        component: SeriesFormComponent,
        data: { seccion: 'Serie', permiso: 'puedeCrear' },
      },
      {
        path: 'series/actualizar/:id',
        component: SeriesFormComponent,
        data: { seccion: 'Serie', permiso: 'puedeEditar' },
      },
      //#region Temporadas
      {
        path: 'temporadasSerie',
        component: TemporadaSerieListComponent,
        data: { seccion: 'Temporada Serie', permiso: 'puedeVer' },
      },
      {
        path: 'temporadasSerie/agregar',
        component: TemporadaSerieFormComponent,
        data: { seccion: 'Temporada Serie', permiso: 'puedeCrear' },
      },
      {
        path: 'temporadasSerie/actualizar/:id',
        component: TemporadaSerieFormComponent,
        data: { seccion: 'Temporada Serie', permiso: 'puedeEditar' },
      },
      //#endregion Temporadas
      //#endregion Series

      //#region Busqueda
      {
        path: 'buscar/caricatura/:id',
        component: BuscarCaricaturaComponent,
        data: {
          permisos: [{ seccion: 'Temporadas Caricatura', permiso: 'puedeVer' }],
        },
      },
      {
        path: 'buscar/serie/:id',
        component: BuscarSerieComponent,
        data: {
          permisos: [{ seccion: 'Temporada Serie', permiso: 'puedeVer' }],
        },
      },
      //#endregion Busqueda

      //#region Estatus Viendo
      {
        path: 'vistos/caricatura',
        component: CVistosComponent,
        data: { seccion: 'Caricatura Siguiendo', permiso: 'puedeVer' },
      },
      {
        path: 'vistos/caricatura/agregar',
        component: CVistosFormComponent,
        data: { seccion: 'Caricatura Siguiendo', permiso: 'puedeEditar' },
      },
      {
        path: 'vistos/caricatura/actualizar/:id',
        component: CVistosFormComponent,
        data: { seccion: 'Caricatura Siguiendo', permiso: 'puedeEditar' },
      },
      {
        path: 'noVistos/caricatura',
        component: CNoVistosComponent,
        data: { seccion: 'Temporadas Caricatura', permiso: 'puedeVer' },
      },
      {
        path: 'proximos/caricatura',
        component: CProximosComponent,
        data: { seccion: 'Caricatura Próximo', permiso: 'puedeVer' },
      },
      //#endregion Estatus Viendo

      //#region Estatus Viendo
      {
        path: 'vistos/serie',
        component: SVistosComponent,
        data: { seccion: 'Serie Siguiendo', permiso: 'puedeVer' },
      },
      {
        path: 'vistos/serie/agregar',
        component: SVistosFormComponent,
        data: { seccion: 'Serie Siguiendo', permiso: 'puedeEditar' },
      },
      {
        path: 'vistos/serie/actualizar/:id',
        component: SVistosFormComponent,
        data: { seccion: 'Serie Siguiendo', permiso: 'puedeEditar' },
      },
      {
        path: 'noVistos/serie',
        component: SNoVistosComponent,
        data: { seccion: 'Temporada Serie', permiso: 'puedeVer' },
      },
      {
        path: 'proximos/serie',
        component: SProximosComponent,
        data: { seccion: 'Serie Próximo', permiso: 'puedeVer' },
      },
      //#endregion Estatus Viendo
    ],
  },
  //#endregion Rutas Protegidas
  { path: 'no-autorizado', component: SinPermisoComponent },

  { path: '**', redirectTo: '/repertorio/caricaturas', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
