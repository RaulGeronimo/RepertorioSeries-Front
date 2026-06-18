import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AlertasService } from 'src/app/Services/alertas.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FuncionesService } from 'src/app/Shared/funciones';
import { PermisosService } from 'src/app/Services/permisos.service';
import { environment } from 'src/environments/environment';
import { Seccion } from 'src/app/enum/seccion.enum';

import { BusquedaService } from 'src/app/Services/busqueda.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buscar-caricatura',
  templateUrl: './buscar-caricatura.component.html',
  styleUrls: ['./buscar-caricatura.component.css'],
})
export class BuscarCaricaturaComponent implements OnInit, AfterViewInit {
  pageSize: number = environment.registrosPagina;
  Archivo: string = 'Temporadas';

  displayedColumns: string[] = [
    'temporadaId',
    // 'caricatura',
    'nombre',
    'capitulos',
    'calificacion',
    'fechaInicio',
    'fechaFin',
    'estado',
    'semanas',
    'anios',
    'acciones',
  ];

  displayedColumnsPelicula: string[] = [
    'peliculaId',
    'nombre',
    'otrosNombres',
    'director',
    'estreno',
    'estrenoMexico',
    'calificacion',
    'genero',
    'duracion',
    'clasificacion',
    'productora',
    'distribuidora',
    'acciones',
  ];

  dataSource = new MatTableDataSource<any>();
  dataSourcePelicula = new MatTableDataSource<any>();
  total: number = 0;
  totalPelicula: number = 0;

  Caricatura: any = [];
  Temporadas: any = [];
  Peliculas: any = [];

  search: any;
  show: boolean = !true;
  tabla: boolean = true;

  //#region Permisos
  Seccion = Seccion;
  //#endregion Permisos

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: BusquedaService,
    private alerta: AlertasService,
    private funcion: FuncionesService,
    public permiso: PermisosService,
  ) {}

  ngOnInit(): void {
    this.obtenerDatos();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.dataSourcePelicula.sort = this.sort;
    this.dataSourcePelicula.paginator = this.paginator;
  }

  obtenerDatos() {
    this.obtenerCaricatura();
    this.obtenerLista();
    this.obtenerListaPeliculas();
  }

  borrar(id: number) {
    this.alerta.borrarTemporadaCaricatura(id, () => this.obtenerLista());
  }

  borrarPelicula(id: number) {
    this.alerta.borrarPelicula(id, () => this.obtenerListaPeliculas());
  }

  obtenerCaricatura() {
    const params = this.activatedRoute.snapshot.params;
    this.service.getCaricaturaId(params['id']).subscribe(
      (res) => {
        this.Caricatura = res;
        this.alerta.successtroast(
          `Temporadas de la caricatura '${this.Caricatura.nombre}'`,
          'Lista de Temporadas',
        );
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      },
    );
  }

  obtenerLista() {
    const params = this.activatedRoute.snapshot.params;
    this.service.getListaCaricaturaTemporadas(params['id']).subscribe(
      (res: any[]) => {
        if (res != null) {
          this.Temporadas = res;
          this.dataSource.data = res;
          this.total = res.length > 0 ? res[0].totalRegistros : 0;
        } else {
          this.Temporadas = [];
          this.alerta.SinResultados();
        }
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      },
    );
  }

  obtenerListaPeliculas() {
    const params = this.activatedRoute.snapshot.params;
    this.service.getListaCaricaturaPeliculas(params['id']).subscribe(
      (res: any[]) => {
        if (res != null) {
          this.Peliculas = res;
          this.dataSourcePelicula.data = res;
          this.totalPelicula = res.length > 0 ? res[0].totalRegistros : 0;
        } else {
          this.Peliculas = [];
        }
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      },
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSourcePelicula.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (this.dataSourcePelicula.paginator) {
      this.dataSourcePelicula.paginator.firstPage();
    }
  }

  cambiarVista() {
    this.tabla = !this.tabla;

    if (this.tabla) {
      this.search = '';
    } else {
      this.dataSource.filter = '';
      this.dataSourcePelicula.filter = '';
    }
  }

  export() {
    this.alerta.reporte(this.Archivo);
    this.funcion.exportarExcelMultiple(
      [
        { nombre: 'Temporadas', data: this.Temporadas },
        { nombre: 'Películas', data: this.Peliculas },
      ],
      this.Archivo,
    );
  }
}
