import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertasService } from 'src/app/Services/alertas.service';
import {
  calificacionRequeridaSiFechaFin,
  FechaFinMayorQueFechaInicio,
  formatearFechaInput,
  FuncionesService,
  LimiteFecha,
} from 'src/app/Shared/funciones';

import { TemporadaSerie } from 'src/app/Models/Temporada';
import { TemporadasSerieService } from 'src/app/Services/temporadas-serie.service';

import { SerieService } from 'src/app/Services/serie.service';
import { NavigationService } from 'src/app/Services/navigation.service';

@Component({
  selector: 'app-temporada-serie-form',
  templateUrl: './temporada-serie-form.component.html',
  styleUrls: ['./temporada-serie-form.component.css'],
})
export class TemporadaSerieFormComponent implements OnInit {
  form: FormGroup;

  temporada: TemporadaSerie = {
    temporadaId: 0,
    serieId: 0,
    nombre: '',
    capitulos: 0,
    calificacion: 0,
    fechaInicio: '',
    fechaFin: '',
    portada: '',
  };

  edit: boolean = false;

  Series: any = [];

  search: any;

  constructor(
    private service: TemporadasSerieService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private alerta: AlertasService,
    public funciones: FuncionesService,
    private navigationService: NavigationService,

    private serieService: SerieService,
  ) {
    this.form = this.fb.group(
      {
        Serie: [''],

        SerieId: [
          this.temporada.serieId || 0,
          [Validators.required, this.funciones.noCeroValidator()],
        ],
        Temporada: ['', Validators.required],
        Capitulos: [0, [Validators.min(0), Validators.pattern('^[0-9]+$')]],
        Calificacion: [0, [Validators.min(0), Validators.max(10)]],
        FechaInicio: ['', Validators.required],
        FechaFin: ['', null],
        Portada: [
          '',
          [Validators.pattern('(https?:\\/\\/.*\\.(?:png|jpg|jpeg|webp))')],
        ],
      },
      {
        validators: [
          FechaFinMayorQueFechaInicio(true),
          LimiteFecha(),
          calificacionRequeridaSiFechaFin(),
        ],
      },
    );
  }

  //#region Fechas
  setDefaultDates() {
    const fechaActual: Date = new Date();
    const primerDiaMes: Date = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth(),
      1,
    );
    const ultimoDiaMes: Date = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth() + 1,
      0,
    );
    const primerDiaMesFormato: string = primerDiaMes
      .toISOString()
      .split('T')[0];
    const ultimoDiaMesFormato: string = ultimoDiaMes
      .toISOString()
      .split('T')[0];
    this.temporada.fechaInicio = primerDiaMesFormato;
    //this.temporada.FechaFin = ultimoDiaMesFormato;
  }
  //#endregion Fechas

  ngOnInit(): void {
    this.obtenerDatos();

    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.service.getById(params['id']).subscribe(
        (res) => {
          this.temporada = res; //Muestra en el navegador
          this.edit = true; //Asignamos que es verdadero

          this.form.patchValue({
            FechaInicio: formatearFechaInput(this.temporada.fechaInicio!),
            FechaFin: formatearFechaInput(this.temporada.fechaFin!),
          });
        },
        (err) => {
          this.alerta.errorServidor();
        },
      );
    }
    this.setDefaultDates();
  }

  obtenerDatos() {
    this.obtenerSerie();
  }

  add() {
    this.temporada.fechaFin = this.temporada.fechaFin || null;
    this.temporada.calificacion =
      this.temporada.calificacion === 0 ? null : this.temporada.calificacion;
    this.temporada.capitulos =
      this.temporada.capitulos === 0 ? null : this.temporada.capitulos;
    this.service.create(this.temporada).subscribe(
      (res) => {
        this.regresar();
        this.alerta.successtroast(
          `La temporada '${this.temporada.nombre}' fue agregada con éxito`,
          'Temporada Agregada',
        );
      },
      (err) => {
        const msg = err.error?.message || 'Error al Registrar';
        if (err.status === 400 || err.status === 401) {
          this.alerta.warning(msg, 'Error al Registrar');
        } else {
          this.alerta.errorServidor();
        }
      },
    );
  }

  actualiza() {
    this.temporada.fechaFin = this.temporada.fechaFin || null;
    this.temporada.calificacion =
      this.temporada.calificacion === 0 ? null : this.temporada.calificacion;
    this.temporada.capitulos =
      this.temporada.capitulos === 0 ? null : this.temporada.capitulos;
    const params = this.activatedRoute.snapshot.params;
    this.service.update(params['id'], this.temporada).subscribe(
      (res) => {
        this.regresar();
        this.alerta.infotroast(
          `La temporada '${this.temporada.nombre}' fue actualizada con éxito`,
          'Temporada Actualizada',
        );
      },
      (err) => {
        const msg = err.error?.message || 'Error al Registrar';
        if (err.status === 400 || err.status === 401) {
          this.alerta.warning(msg, 'Error al Registrar');
        } else {
          this.alerta.errorServidor();
        }
      },
    );
  }

  obtenerSerie() {
    this.serieService.getLista().subscribe(
      (res) => {
        this.Series = res;
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      },
    );
  }

  getNombreSerie(id: number): string {
    if (!this.Series || this.Series.length === 0) return 'Series';

    const nombre = this.Series.find((serie: any) => +serie.serieId === +id);
    return nombre ? nombre.nombre : 'Nombre de la Serie no encontrada';
  }

  regresar() {
    this.navigationService.goBack();
  }

  //#region Refresh
  refrescarSerie() {
    this.obtenerSerie();
    this.alerta.successtroast('Lista de series actualizada', 'Actualizada');
  }
  //#endregion Refresh
}
