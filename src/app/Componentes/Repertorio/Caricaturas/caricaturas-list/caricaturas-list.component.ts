import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AlertasService } from 'src/app/Services/alertas.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FuncionesService } from 'src/app/Shared/funciones';
import { PermisosService } from 'src/app/Services/permisos.service';
import { environment } from 'src/environments/environment';
import { Seccion } from 'src/app/enum/seccion.enum';

import { CaricaturaService } from 'src/app/Services/caricatura.service';

@Component({
  selector: 'app-caricaturas-list',
  templateUrl: './caricaturas-list.component.html',
  styleUrls: ['./caricaturas-list.component.css'],
})
export class CaricaturasListComponent implements OnInit, AfterViewInit {
  pageSize: number = environment.registrosPagina;
  Archivo: string = 'Caricaturas';
  displayedColumns: string[] = [
    'caricaturaId',
    'nombre',
    'otrosNombres',
    'genero',
    'peliculas',
    'temporadas',
    'capitulos',
    'fechaInicio',
    'fechaFin',
    'estado',
    'promedio',
    'creador',
    'duracion',
    'difusion',
    'productora',
    'distribuidora',
    'acciones',
  ];

  dataSource = new MatTableDataSource<any>();
  total: number = 0;

  Caricaturas: any = [];
  search: any;
  show: boolean = !true;
  tabla: boolean = true;

  //#region Permisos
  Seccion = Seccion;
  //#endregion Permisos

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: CaricaturaService,
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
    this.alerta.borrarCaricatura(id, () => this.obtenerLista());
  }

  obtenerLista() {
    this.service.getLista().subscribe(
      (res: any[]) => {
        if (res != null) {
          // this.Caricaturas = res;

          this.Caricaturas = res.map((x: any) => ({
            ...x,
            portadasArray: x.portada
              ? x.portada.split(' | ')
              : ['/assets/noImagen.png'],
          }));

          this.dataSource.data = res;
          this.total = res.length > 0 ? res[0].totalRegistros : 0;
        } else {
          this.Caricaturas = [];
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
    this.funcion.exportarExcel(this.Caricaturas, this.Archivo);
  }
}
