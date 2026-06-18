import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//#region Idioma
import localeEsMX from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEsMX);
//#endregion Idioma

//#region Formularios
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomGlobalFilterPipe } from './Shared/custom-filter.pipe';
//#endregion Formularios

//#region EnvioAuth
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { AuthService } from './Services/auth.service';
//#endregion EnvioAuth

//#region Angular Material
import { ExportButtonComponent } from './Shared/Components/export-button/export-button.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlEsp } from './Shared/mat-paginator-intl';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { NgChartsModule } from 'ng2-charts';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
//#endregion Angular Material

//#region Nav
import { NavigationComponent } from './Componentes/navigation/navigation.component';
import { FooterComponent } from './Componentes/footer/footer.component';
import { PrincipalComponent } from './Componentes/Repertorio/principal/principal.component';
import { SinPermisoComponent } from './Componentes/Repertorio/sin-permiso/sin-permiso.component';
//#endregion Nav

//#region Login
import { LoginComponent } from './Componentes/Auth/login/login.component';
import { RegisterComponent } from './Componentes/Auth/register/register.component';
import { ResetPasswordComponent } from './Componentes/Auth/reset-password/reset-password.component';
//#endregion Login

//#region Usuario
import { UsuarioListComponent } from './Componentes/Repertorio/Usuarios/usuario-list/usuario-list.component';
import { PerfilComponent } from './Componentes/Repertorio/Usuarios/perfil/perfil.component';
import { BitacoraErrorComponent } from './Componentes/Repertorio/Bitacora/bitacora-error/bitacora-error.component';
import { BitacoraCargaComponent } from './Componentes/Repertorio/Bitacora/bitacora-carga/bitacora-carga.component';
//#endregion Usuario

//#region CRUD
import { PeliculaListComponent } from './Componentes/Repertorio/Pelicula/pelicula-list/pelicula-list.component';
import { PeliculaFormComponent } from './Componentes/Repertorio/Pelicula/pelicula-form/pelicula-form.component';
import { CaricaturasFormComponent } from './Componentes/Repertorio/Caricaturas/caricaturas-form/caricaturas-form.component';
import { CaricaturasListComponent } from './Componentes/Repertorio/Caricaturas/caricaturas-list/caricaturas-list.component';
import { CNoVistosComponent } from './Componentes/Repertorio/CaricaturaEstatus/no-vistos/no-vistos.component';
import { CVistosComponent } from './Componentes/Repertorio/CaricaturaEstatus/vistos/vistos.component';
import { CVistosFormComponent } from './Componentes/Repertorio/CaricaturaEstatus/vistos-form/vistos-form.component';
import { CProximosComponent } from './Componentes/Repertorio/CaricaturaEstatus/proximos/proximos.component';
import { SNoVistosComponent } from './Componentes/Repertorio/SeriesEstatus/no-vistos/no-vistos.component';
import { SVistosComponent } from './Componentes/Repertorio/SeriesEstatus/vistos/vistos.component';
import { SVistosFormComponent } from './Componentes/Repertorio/SeriesEstatus/vistos-form/vistos-form.component';
import { SProximosComponent } from './Componentes/Repertorio/SeriesEstatus/proximos/proximos.component';

import { SeriesFormComponent } from './Componentes/Repertorio/Series/series-form/series-form.component';
import { SeriesListComponent } from './Componentes/Repertorio/Series/series-list/series-list.component';
import { TemporadaCaricaturaListComponent } from './Componentes/Repertorio/Temporada/temporada-caricatura-list/temporada-caricatura-list.component';
import { TemporadaCaricaturaFormComponent } from './Componentes/Repertorio/Temporada/temporada-caricatura-form/temporada-caricatura-form.component';
import { TemporadaSerieListComponent } from './Componentes/Repertorio/Temporada/temporada-serie-list/temporada-serie-list.component';
import { TemporadaSerieFormComponent } from './Componentes/Repertorio/Temporada/temporada-serie-form/temporada-serie-form.component';
import { BuscarCaricaturaComponent } from './Componentes/Repertorio/Busqueda/buscar-caricatura/buscar-caricatura.component';
import { BuscarSerieComponent } from './Componentes/Repertorio/Busqueda/buscar-serie/buscar-serie.component';
//#endregion CRUD

@NgModule({
  declarations: [
    AppComponent,
    ExportButtonComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    FooterComponent,
    NavigationComponent,
    BitacoraCargaComponent,
    BitacoraErrorComponent,
    PrincipalComponent,
    SinPermisoComponent,
    PerfilComponent,
    UsuarioListComponent,
    CustomGlobalFilterPipe,
    CaricaturasFormComponent,
    CaricaturasListComponent,
    PeliculaListComponent,
    PeliculaFormComponent,
    SeriesFormComponent,
    SeriesListComponent,
    TemporadaCaricaturaListComponent,
    TemporadaCaricaturaFormComponent,
    TemporadaSerieListComponent,
    TemporadaSerieFormComponent,
    BuscarCaricaturaComponent,
    BuscarSerieComponent,
    CNoVistosComponent,
    CVistosComponent,
    CVistosFormComponent,
    CProximosComponent,
    SNoVistosComponent,
    SVistosComponent,
    SVistosFormComponent,
    SProximosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatSelectModule,
    NgChartsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' },
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlEsp },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
