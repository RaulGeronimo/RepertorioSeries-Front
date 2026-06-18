import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AlertasService } from 'src/app/Services/alertas.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FuncionesService } from 'src/app/Shared/funciones';
import { PermisosService } from 'src/app/Services/permisos.service';
import { environment } from 'src/environments/environment';

import { SerieEstatusService } from 'src/app/Services/serie-estatus.service';
import { SerieProximo } from 'src/app/Models/SerieEstatus';

@Component({
  selector: 'app-no-vistos',
  templateUrl: './no-vistos.component.html',
  styleUrls: ['./no-vistos.component.css']
})
export class SNoVistosComponent implements OnInit, AfterViewInit {
  pageSize: number = environment.registrosPagina;
  Archivo: string = 'Temporadas';
  displayedColumns: string[] = [
    'temporadaId',
    'serie',
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

  proximo: SerieProximo = {
    serieProximoId: 0,
    temporadaId: 0,
  };

  dataSource = new MatTableDataSource<any>();
  total: number = 0;

  Temporadas: any = [];
  search: any;
  show: boolean = !true;
  tabla: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: SerieEstatusService,
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
  }

  obtenerDatos() {
    this.obtenerLista();
  }

  borrar(id: number) {
    this.alerta.borrarSerieProximo(id, () => this.obtenerDatos());
  }

  add(temporadaId: number) {
    this.proximo.temporadaId = temporadaId;
    this.service.createProximo(this.proximo).subscribe(
      (res) => {
        this.obtenerDatos();
        this.alerta.successtroast(
          `La temporada fue agregada con éxito a la lista`,
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

  obtenerLista() {
    this.service.getListaNoSiguiendo().subscribe(
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cambiarVista() {
    this.tabla = !this.tabla;

    if (this.tabla) {
      this.search = '';
    } else {
      this.dataSource.filter = '';
    }
  }

  export() {
    this.alerta.reporte(this.Archivo);
    this.funcion.exportarExcel(this.Temporadas, this.Archivo);
  }
}
