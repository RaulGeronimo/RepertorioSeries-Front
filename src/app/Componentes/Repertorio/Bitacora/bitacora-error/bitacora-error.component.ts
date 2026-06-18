import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertasService } from 'src/app/Services/alertas.service';
import { BitacoraService } from 'src/app/Services/bitacora.service';
import { FuncionesService } from 'src/app/Shared/funciones';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bitacora-error',
  templateUrl: './bitacora-error.component.html',
  styleUrls: ['./bitacora-error.component.css'],
})
export class BitacoraErrorComponent implements OnInit, AfterViewInit {
  pageSize: number = environment.registrosPagina;
  Archivo: string = 'Bitacora Error';

  displayedColumns: string[] = [
    'bitacoraErrorId',
    'usuario',
    'fecha',
    'tabla',
    'columna',
    'mensaje',
  ];

  dataSource = new MatTableDataSource<any>();
  total: number = 0;

  Bitacora: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: BitacoraService,
    private alerta: AlertasService,
    private funcion: FuncionesService,
  ) {}

  ngOnInit(): void {
    this.obtenerDatos();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    setTimeout(() => {
      this.sort.active = 'bitacoraErrorId';
      this.sort.direction = 'desc';

      this.sort.sortChange.emit({
        active: this.sort.active,
        direction: this.sort.direction,
      });
    });
  }

  obtenerDatos() {
    this.obtenerLista();
  }

  obtenerLista() {
    this.service.getBitacoraError().subscribe(
      (res: any[]) => {
        if (res != null) {
          this.Bitacora = res;
          this.dataSource.data = res;
          this.total = res.length > 0 ? res[0].totalRegistros : 0;
        } else {
          this.Bitacora = [];
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

  export() {
    this.alerta.reporte(this.Archivo);
    this.funcion.exportarExcel(this.Bitacora, this.Archivo);
  }
}
