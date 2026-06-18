import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CaricaturaService } from './caricatura.service';
import { SerieService } from './serie.service';
import { TemporadasCaricaturaService } from './temporadas-caricatura.service';
import { TemporadasSerieService } from './temporadas-serie.service';
import { PeliculaService } from './pelicula.service';
import { CaricaturaEstatusService } from './caricatura-estatus.service';
import { SerieEstatusService } from './serie-estatus.service';

@Injectable({
  providedIn: 'root',
})
export class AlertasService {
  timeOut: number = 2500;
  alertResponseTime: number = environment.tiempoAlerta;

  //Mensajes eliminacion
  Titulo: string = '¿Estas seguro de eliminar el registro?';
  Mensaje: string = '¡No podrás revertir esto!';
  MsjConfirmacion: string = '¡Sí, bórralo!';
  MsjCancelacion: string = 'Cancelar';

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private caricaturaService: CaricaturaService,
    private serieService: SerieService,
    private temporadaCaricaturaService: TemporadasCaricaturaService,
    private temporadaSerieService: TemporadasSerieService,
    private peliculaService: PeliculaService,
    private caricaturaEstatusService: CaricaturaEstatusService,
    private serieEstatusService: SerieEstatusService,
  ) {}

  //#region Sweet Alert
  public errorServidor() {
    localStorage.clear();
    this.router.navigate(['login']);

    Swal.fire({
      title: 'Error de Servidor',
      text: 'Espere un momento',
      icon: 'question',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: this.timeOut,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  }

  public SinResultados() {
    this.warning(
      'Sin Registros',
      'No existen registros ingresados que coincidan con los criterios proporcionados.',
    );
  }

  public mostrarAlertaConfirmacion(
    titulo: string,
    msg: string,
    msjConfirm: string,
    msjCancel: string,
  ): Promise<boolean> {
    return Swal.fire({
      title: titulo,
      text: msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: msjConfirm,
      cancelButtonText: msjCancel,
      timer: this.alertResponseTime,
      timerProgressBar: true,
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  public error(titulo: string, texto: string) {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: 'error',
      showConfirmButton: false,
      timer: this.timeOut,
      timerProgressBar: true,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  }

  public info(titulo: string, texto: string) {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: 'info',
      showConfirmButton: false,
      timer: this.timeOut,
      timerProgressBar: true,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  }

  public question(titulo: string, texto: string) {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: 'question',
      showConfirmButton: false,
      timer: this.timeOut,
      timerProgressBar: true,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  }

  public success(titulo: string, texto: string) {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: 'success',
      showConfirmButton: false,
      timer: this.timeOut,
      timerProgressBar: true,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  }

  public warning(titulo: string, texto: string) {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: 'warning',
      showConfirmButton: false,
      timer: this.timeOut,
      timerProgressBar: true,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  }

  public mostrarAlertaSimple(
    titulo: string,
    texto: string,
    icono: 'success' | 'error' | 'info',
  ) {
    return Swal.fire({
      title: titulo,
      text: texto,
      icon: icono,
      timer: this.alertResponseTime,
      timerProgressBar: true,
    });
  }
  //#endregion Sweet Alert

  //#region Troast
  public successtroast(titulo: string, mensaje: string) {
    this.toastr.success(titulo, mensaje, { timeOut: this.timeOut });
  }

  public errortroast(titulo: string, mensaje: string) {
    this.toastr.error(titulo, mensaje, { timeOut: this.timeOut });
  }

  public infotroast(titulo: string, mensaje: string) {
    this.toastr.info(titulo, mensaje, { timeOut: this.timeOut });
  }

  public warningtroast(titulo: string, mensaje: string) {
    this.toastr.warning(titulo, mensaje, { timeOut: this.timeOut });
  }
  //#endregion Troast

  public reporte(archivo: string) {
    Swal.fire({
      title: 'Reporte Generado Correctamente',
      text: 'Reporte de ' + archivo,
      icon: 'success',
      showConfirmButton: false,
      timer: this.timeOut,
      showClass: {
        popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
      },
      hideClass: {
        popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
      },
    });
  }

  //#region Caricatura
  public borrarCaricatura(id: number, callback: () => void) {
    this.mostrarAlertaConfirmacion(
      this.Titulo,
      this.Mensaje,
      this.MsjConfirmacion,
      this.MsjCancelacion,
    ).then((confirmed) => {
      if (confirmed) {
        this.caricaturaService.delete(id).subscribe(
          (res) => {
            callback();
            this.warningtroast(
              'La Caricatura fue eliminada con éxito',
              'Caricatura eliminada',
            );
          },
          (err) => {
            console.error(err);
            this.errorServidor();
          },
        );
      }
    });
  }
  //#endregion Caricatura

  //#region Serie
  public borrarSerie(id: number, callback: () => void) {
    this.mostrarAlertaConfirmacion(
      this.Titulo,
      this.Mensaje,
      this.MsjConfirmacion,
      this.MsjCancelacion,
    ).then((confirmed) => {
      if (confirmed) {
        this.serieService.delete(id).subscribe(
          (res) => {
            callback();
            this.warningtroast(
              'La Serie fue eliminada con éxito',
              'Serie eliminada',
            );
          },
          (err) => {
            console.error(err);
            this.errorServidor();
          },
        );
      }
    });
  }
  //#endregion Serie

  //#region Temporadas
  public borrarTemporadaCaricatura(id: number, callback: () => void) {
    this.mostrarAlertaConfirmacion(
      this.Titulo,
      this.Mensaje,
      this.MsjConfirmacion,
      this.MsjCancelacion,
    ).then((confirmed) => {
      if (confirmed) {
        this.temporadaCaricaturaService.delete(id).subscribe(
          (res) => {
            callback();
            this.warningtroast(
              'La temporada fue eliminada con éxito',
              'Temporada eliminada',
            );
          },
          (err) => {
            console.error(err);
            this.errorServidor();
          },
        );
      }
    });
  }

  public borrarTemporadaSerie(id: number, callback: () => void) {
    this.mostrarAlertaConfirmacion(
      this.Titulo,
      this.Mensaje,
      this.MsjConfirmacion,
      this.MsjCancelacion,
    ).then((confirmed) => {
      if (confirmed) {
        this.temporadaSerieService.delete(id).subscribe(
          (res) => {
            callback();
            this.warningtroast(
              'La temporada fue eliminada con éxito',
              'Temporada eliminada',
            );
          },
          (err) => {
            console.error(err);
            this.errorServidor();
          },
        );
      }
    });
  }
  //#endregion Temporadas

  //#region Pelicula
  public borrarPelicula(id: number, callback: () => void) {
    this.mostrarAlertaConfirmacion(
      this.Titulo,
      this.Mensaje,
      this.MsjConfirmacion,
      this.MsjCancelacion,
    ).then((confirmed) => {
      if (confirmed) {
        this.peliculaService.delete(id).subscribe(
          (res) => {
            callback();
            this.warningtroast(
              'La película fue eliminada con éxito',
              'Película eliminada',
            );
          },
          (err) => {
            console.error(err);
            this.errorServidor();
          },
        );
      }
    });
  }
  //#endregion Pelicula

  //#region Caricatura Siguiendo
  public borrarCaricaturaSiguiendo(id: number, callback: () => void) {
    this.mostrarAlertaConfirmacion(
      this.Titulo,
      this.Mensaje,
      this.MsjConfirmacion,
      this.MsjCancelacion,
    ).then((confirmed) => {
      if (confirmed) {
        this.caricaturaEstatusService.deleteSiguiendo(id).subscribe(
          (res) => {
            callback();
            this.warningtroast(
              'La temporada fue eliminada con éxito',
              'Temporada eliminada',
            );
          },
          (err) => {
            console.error(err);
            this.errorServidor();
          },
        );
      }
    });
  }
  //#endregion Caricatura Siguiendo

  //#region Caricatura Proximo
  public borrarCaricaturaProximo(id: number, callback: () => void) {
    this.mostrarAlertaConfirmacion(
      this.Titulo,
      this.Mensaje,
      this.MsjConfirmacion,
      this.MsjCancelacion,
    ).then((confirmed) => {
      if (confirmed) {
        this.caricaturaEstatusService.deleteProximo(id).subscribe(
          (res) => {
            callback();
            this.warningtroast(
              'La temporada fue eliminada con éxito',
              'Temporada eliminada',
            );
          },
          (err) => {
            console.error(err);
            this.errorServidor();
          },
        );
      }
    });
  }
  //#endregion Caricatura Proximo

  //#region Serie Siguiendo
  public borrarSerieSiguiendo(id: number, callback: () => void) {
    this.mostrarAlertaConfirmacion(
      this.Titulo,
      this.Mensaje,
      this.MsjConfirmacion,
      this.MsjCancelacion,
    ).then((confirmed) => {
      if (confirmed) {
        this.serieEstatusService.deleteSiguiendo(id).subscribe(
          (res) => {
            callback();
            this.warningtroast(
              'La temporada fue eliminada con éxito',
              'Temporada eliminada',
            );
          },
          (err) => {
            console.error(err);
            this.errorServidor();
          },
        );
      }
    });
  }
  //#endregion Serie Siguiendo

  //#region Serie Proximo
  public borrarSerieProximo(id: number, callback: () => void) {
    this.mostrarAlertaConfirmacion(
      this.Titulo,
      this.Mensaje,
      this.MsjConfirmacion,
      this.MsjCancelacion,
    ).then((confirmed) => {
      if (confirmed) {
        this.serieEstatusService.deleteProximo(id).subscribe(
          (res) => {
            callback();
            this.warningtroast(
              'La temporada fue eliminada con éxito',
              'Temporada eliminada',
            );
          },
          (err) => {
            console.error(err);
            this.errorServidor();
          },
        );
      }
    });
  }
  //#endregion Serie Proximo
}
