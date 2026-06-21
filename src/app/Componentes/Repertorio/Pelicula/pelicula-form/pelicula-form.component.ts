import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertasService } from 'src/app/Services/alertas.service';
import {
  calificacionRequeridaPelicula,
  formatearFechaInput,
  FuncionesService,
} from 'src/app/Shared/funciones';

import { NavigationService } from 'src/app/Services/navigation.service';

import { Pelicula } from 'src/app/Models/Pelicula';
import { PeliculaService } from 'src/app/Services/pelicula.service';
import { CatalogosService } from 'src/app/Services/catalogos.service';

import { CaricaturaService } from 'src/app/Services/caricatura.service';
import { SerieService } from 'src/app/Services/serie.service';

@Component({
  selector: 'app-pelicula-form',
  templateUrl: './pelicula-form.component.html',
  styleUrls: ['./pelicula-form.component.css'],
})
export class PeliculaFormComponent implements OnInit {
  form: FormGroup;
  tipoRelacion: 'ninguna' | 'serie' | 'caricatura' = 'ninguna';

  pelicula: Pelicula = {
    peliculaId: 0,
    caricaturaId: 0,
    serieId: 0,
    nombre: '',
    otrosNombres: '',
    director: '',
    estreno: '',
    estrenoMexico: '',
    calificacion: 0,
    genero: '',
    duracion: '',
    clasificacionId: 3,
    productora: '',
    distribuidora: '',
    portada: '',
  };

  edit: boolean = false;

  Clasificaciones: any = [];
  Series: any = [];
  Caricaturas: any = [];

  searchCaricatura: any;
  searchSerie: any;

  constructor(
    private service: PeliculaService,
    private caricaturaService: CaricaturaService,
    private serieService: SerieService,
    private funciones: FuncionesService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private alerta: AlertasService,
    private catalogoService: CatalogosService,
    private navigationService: NavigationService,
  ) {
    this.form = this.fb.group(
      {
        TipoRelacion: ['ninguna'],
        Serie: [''],
        SerieId: [0],

        Caricatura: [''],
        CaricaturaId: [0],

        Nombre: ['', Validators.required],
        OtrosNombres: ['', Validators.required],
        Director: ['', Validators.required],
        Estreno: ['', Validators.required],
        EstrenoMexico: ['', Validators.required],
        Calificacion: [null, [Validators.min(0), Validators.max(10)]],
        Genero: ['', Validators.required],
        Duracion: ['', Validators.required],
        ClasificacionId: [
          this.pelicula.clasificacionId || 0,
          [Validators.required, this.funciones.noCeroValidator()],
        ],
        Productora: ['', Validators.required],
        Distribuidora: ['', Validators.required],
        Portada: [
          '',
          [
            Validators.pattern('(https?:\\/\\/.*\\.(?:png|jpg|jpeg|webp))'),
            Validators.required,
          ],
        ],
      },
      {
        validators: [calificacionRequeridaPelicula()],
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
    const primerDiaMesFormato: string = primerDiaMes
      .toISOString()
      .split('T')[0];
    this.pelicula.estreno = primerDiaMesFormato;
    this.pelicula.estrenoMexico = primerDiaMesFormato;
  }
  //#endregion Fechas

  ngOnInit(): void {
    this.obtenerDatos();

    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.service.getById(params['id']).subscribe(
        (res) => {
          this.pelicula = res;
          this.edit = true;

          // Detectar tipo relación al editar
          if (res.serieId && res.serieId !== 0) {
            this.tipoRelacion = 'serie';
          } else if (res.caricaturaId && res.caricaturaId !== 0) {
            this.tipoRelacion = 'caricatura';
          } else {
            this.tipoRelacion = 'ninguna';
          }
          this.onTipoRelacionChange(true);

          this.form.patchValue({
            Estreno: formatearFechaInput(this.pelicula.estreno!),
            EstrenoMexico: formatearFechaInput(this.pelicula.estrenoMexico!),
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
    this.obtenerClasificacion();
    this.obtenerCaricatura();
    this.obtenerSerie();
  }

  add() {
    this.normalizarCalificacion();
    this.service.create(this.pelicula).subscribe(
      (res) => {
        this.regresar();
        this.alerta.successtroast(
          `La película '${this.pelicula.nombre}' fue agregada con éxito`,
          'Película Agregada',
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
    this.normalizarCalificacion();
    const params = this.activatedRoute.snapshot.params;
    this.service.update(params['id'], this.pelicula).subscribe(
      (res) => {
        this.regresar();
        this.alerta.infotroast(
          `La película '${this.pelicula.nombre}' fue actualizada con éxito`,
          'Película Actualizada',
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

  //#region Calificacion
  normalizarCalificacion() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaEstreno = new Date(this.pelicula.estreno!);
    fechaEstreno.setHours(0, 0, 0, 0);

    if (hoy <= fechaEstreno) {
      this.pelicula.calificacion = undefined as any;
      return;
    }

    if (this.pelicula.calificacion == 0) {
      this.pelicula.calificacion = undefined as any;
    }
  }
  //#endregion Calificacion

  //#region Catalogos
  obtenerClasificacion() {
    this.catalogoService.getClasificacion().subscribe(
      (res) => {
        this.Clasificaciones = res;
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      },
    );
  }
  //#endregion Catalogos

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

  //#region Getters nombre
  getNombreClasificacion(id: number): string {
    if (!this.Clasificaciones || this.Clasificaciones.length === 0)
      return 'Clasificaciones';

    const nombre = this.Clasificaciones.find(
      (clasificacion: any) => +clasificacion.ClasificacionId === +id,
    );
    return nombre
      ? nombre.Clasificacion
      : 'Nombre de la Clasificación no encontrada';
  }

  getNombreCaricatura(id: number): string {
    if (!this.Caricaturas || this.Caricaturas.length === 0)
      return 'Caricaturas';

    const nombre = this.Caricaturas.find(
      (caricatura: any) => +caricatura.caricaturaId === +id,
    );
    return nombre ? nombre.nombre : 'Nombre de la Caricatura no encontrada';
  }

  getNombreSerie(id: number): string {
    if (!this.Series || this.Series.length === 0) return 'Series';

    const nombre = this.Series.find((serie: any) => +serie.serieId === +id);
    return nombre ? nombre.nombre : 'Nombre de la Serie no encontrada';
  }
  //#endregion Getters nombre

  //#region Tipo Relación
  onTipoRelacionChange(esEdicion: boolean = false) {
    // Solo resetea si NO es edición
    if (!esEdicion) {
      this.pelicula.serieId = 0;
      this.pelicula.caricaturaId = 0;
      this.searchSerie = null;
      this.searchCaricatura = null;
      this.form.get('SerieId')?.setValue(0);
      this.form.get('CaricaturaId')?.setValue(0);
    }

    if (this.tipoRelacion === 'serie') {
      this.form
        .get('SerieId')
        ?.setValidators([this.funciones.noCeroValidator()]);
      this.form.get('CaricaturaId')?.clearValidators();
    } else if (this.tipoRelacion === 'caricatura') {
      this.form
        .get('CaricaturaId')
        ?.setValidators([this.funciones.noCeroValidator()]);
      this.form.get('SerieId')?.clearValidators();
    } else {
      this.form.get('SerieId')?.clearValidators();
      this.form.get('CaricaturaId')?.clearValidators();
    }

    this.form.get('SerieId')?.updateValueAndValidity();
    this.form.get('CaricaturaId')?.updateValueAndValidity();
  }
  //#endregion Tipo Relación

  regresar() {
    this.navigationService.goBack();
  }
}
