import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/Services/alertas.service';
import {
  FechaFinMayorQueFechaInicio,
  formatearFechaInput,
  FuncionesService,
  LimiteFecha,
} from 'src/app/Shared/funciones';

import { CaricaturaSiguiendo } from 'src/app/Models/CaricaturaEstatus';
import { CaricaturaEstatusService } from 'src/app/Services/caricatura-estatus.service';
import { TemporadasCaricaturaService } from 'src/app/Services/temporadas-caricatura.service';

@Component({
  selector: 'app-vistos-form',
  templateUrl: './vistos-form.component.html',
  styleUrls: ['./vistos-form.component.css'],
})
export class CVistosFormComponent implements OnInit {
  form: FormGroup;

  siguiendo: CaricaturaSiguiendo = {
    caricaturaSiguiendoId: 0,
    temporadaId: 0,
    fechaInicio: '',
    fechaFin: '',
  };

  edit: boolean = false;

  Temporadas: any = [];

  search: any;
  soloNoVistos: boolean = false;

  constructor(
    private service: CaricaturaEstatusService,
    private router: Router,
    private funciones: FuncionesService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private alerta: AlertasService,
    private temporadaService: TemporadasCaricaturaService,
  ) {
    this.form = this.fb.group(
      {
        Temporada: [''],

        TemporadaId: [
          this.siguiendo.temporadaId || 0,
          [Validators.required, this.funciones.noCeroValidator()],
        ],
        FechaInicio: ['', Validators.required],
        FechaFin: ['', null],
      },
      {
        validators: [FechaFinMayorQueFechaInicio(), LimiteFecha()],
      },
    );
  }

  //#region Fechas
  setDefaultDates() {
    const fechaActual: Date = new Date();

    const fechaHoyFormato: string = new Date(
      fechaActual.getTime() - fechaActual.getTimezoneOffset() * 60000,
    )
      .toISOString()
      .split('T')[0];
    this.siguiendo.fechaInicio = this.edit
      ? this.siguiendo.fechaInicio
      : fechaHoyFormato;

    this.siguiendo.fechaFin = this.edit
      ? this.siguiendo.fechaFin == ''
        ? fechaHoyFormato
        : this.siguiendo.fechaFin
      : '';
  }
  //#endregion Fechas

  ngOnInit(): void {
    this.obtenerDatos();

    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.service.getByIdSiguiendo(params['id']).subscribe(
        (res) => {
          this.siguiendo = res; //Muestra en el navegador
          this.edit = true; //Asignamos que es verdadero

          this.form.patchValue({
            FechaInicio: formatearFechaInput(this.siguiendo.fechaInicio!),
            FechaFin: formatearFechaInput(this.siguiendo.fechaFin!),
          });
          this.setDefaultDates();
        },
        (err) => {
          this.alerta.errorServidor();
        },
      );
    } else {
      this.setDefaultDates();
    }
  }

  obtenerDatos() {
    this.obtenerTemporada();
  }

  add() {
    this.siguiendo.fechaFin = this.siguiendo.fechaFin || null;
    this.service.createSiguiendo(this.siguiendo).subscribe(
      (res) => {
        this.router.navigate(['..'], { relativeTo: this.activatedRoute });
        this.alerta.successtroast(
          `La temporada fue agregada con éxito`,
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
    this.siguiendo.fechaFin = this.siguiendo.fechaFin || null;
    const params = this.activatedRoute.snapshot.params;
    this.service.updateSiguiendo(params['id'], this.siguiendo).subscribe(
      (res) => {
        this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
        this.alerta.infotroast(
          `La temporada fue actualizada con éxito`,
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

  obtenerTemporada() {
    const observable = this.soloNoVistos
      ? this.service.getListaNoSiguiendo()
      : this.temporadaService.getLista();

    observable.subscribe(
      (res) => {
        this.Temporadas = res;
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      },
    );
  }

  getNombreTemporada(id: number): string {
    if (!this.Temporadas || this.Temporadas.length === 0) return 'Temporadas';

    const nombre = this.Temporadas.find(
      (temporada: any) => +temporada.temporadaId === +id,
    );
    return nombre ? nombre.nombre : 'Nombre de la Temporada no encontrada';
  }

  getImagenTemporada(id: number): string {
    if (!this.Temporadas || this.Temporadas.length === 0) return 'Temporadas';

    const nombre = this.Temporadas.find(
      (temporada: any) => +temporada.temporadaId === +id,
    );
    return nombre ? nombre.portada : 'Portada de la Temporada no encontrada';
  }

  cambiarFiltroNoVistos() {
    this.obtenerTemporada();

    // Reinicia selección si ya no existe en la lista
    this.siguiendo.temporadaId = 0;

    this.form.patchValue({
      TemporadaId: 0,
    });
  }

  //#region Refresh
  refrescarTemporadas() {
    this.obtenerTemporada();
    this.alerta.successtroast('Lista de temporadas actualizada', 'Actualizado');
  }
  //#endregion Refresh
}
