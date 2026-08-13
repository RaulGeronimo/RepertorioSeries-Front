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
import { NavigationService } from 'src/app/Services/navigation.service';

import { TemporadaCaricatura } from 'src/app/Models/Temporada';
import { TemporadasCaricaturaService } from 'src/app/Services/temporadas-caricatura.service';

import { CaricaturaService } from 'src/app/Services/caricatura.service';

@Component({
  selector: 'app-temporada-caricatura-form',
  templateUrl: './temporada-caricatura-form.component.html',
  styleUrls: ['./temporada-caricatura-form.component.css'],
})
export class TemporadaCaricaturaFormComponent implements OnInit {
  form: FormGroup;

  temporada: TemporadaCaricatura = {
    temporadaId: 0,
    caricaturaId: 0,
    nombre: '',
    capitulos: 0,
    calificacion: 0,
    fechaInicio: '',
    fechaFin: '',
    portada: '',
  };

  edit: boolean = false;

  Caricaturas: any = [];

  search: any;

  constructor(
    private service: TemporadasCaricaturaService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private alerta: AlertasService,
    public funciones: FuncionesService,
    private navigationService: NavigationService,

    private caricaturaService: CaricaturaService,
  ) {
    this.form = this.fb.group(
      {
        Caricatura: [''],

        CaricaturaId: [
          this.temporada.caricaturaId || 0,
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
    this.obtenerCaricatura();
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

  obtenerCaricatura() {
    this.caricaturaService.getLista().subscribe(
      (res) => {
        this.Caricaturas = res;
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      },
    );
  }

  getNombreCaricatura(id: number): string {
    if (!this.Caricaturas || this.Caricaturas.length === 0)
      return 'Caricaturas';

    const nombre = this.Caricaturas.find(
      (caricatura: any) => +caricatura.caricaturaId === +id,
    );
    return nombre ? nombre.nombre : 'Nombre de la Caricatura no encontrada';
  }

  regresar() {
    this.navigationService.goBack();
  }

  //#region Refresh
  refrescarCaricatura() {
    this.obtenerCaricatura();
    this.alerta.successtroast(
      'Lista de caricaturas actualizada',
      'Actualizada',
    );
  }
  //#endregion Refresh
}
