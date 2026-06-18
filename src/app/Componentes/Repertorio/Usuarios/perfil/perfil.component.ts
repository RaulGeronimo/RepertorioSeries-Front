import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Perfil } from 'src/app/Models/Perfil';
import { Permiso } from 'src/app/Models/Permisos';
import { AlertasService } from 'src/app/Services/alertas.service';
import { AuthService } from 'src/app/Services/auth.service';
import { BitacoraService } from 'src/app/Services/bitacora.service';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PerfilComponent implements OnInit, AfterViewInit {
  perfil: Perfil = {};
  permisos: Permiso[] = [];

  BitacoraC: any = [];
  BitacoraE: any = [];
  TotalCorrectos: number = 0;
  TotalError: number = 0;

  usuarioId: number = 0;

  // Gráficas
  actividadChart: any;
  actividadChartOptions: any;

  // Tabla
  displayedColumns: string[] = [
    'seccion',
    'crear',
    'editar',
    'eliminar',
    'ver',
  ];
  dataSource = new MatTableDataSource<Permiso>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Totales de bitácora
  TotalAgregados: number = 0; // nuevos
  TotalActualizados: number = 0; // nuevos
  TotalEliminados: number = 0; // nuevos

  // Movimientos detallados para la tabla
  movimientos: { operacion: string; entidad: string; fecha: Date }[] = [];
  displayedColumnsMov: string[] = ['operacion', 'entidad', 'fecha'];
  dataSourceMov = new MatTableDataSource<{
    operacion: string;
    entidad: string;
    fecha: Date;
  }>();

  // Gráfica de movimientos
  movimientosChart: any;
  movimientosChartOptions: any;

  constructor(
    private service: AuthService,
    private userService: UsuariosService,
    private alerta: AlertasService,
    private bitacoraService: BitacoraService,
  ) {}

  ngOnInit(): void {
    this.usuarioId = this.service.getUsuarioId() ?? 0;
    this.obtenerDatos();

    this.userService.getUsuario(this.usuarioId).subscribe(
      (res) => {
        this.perfil = res;
        this.actualizarActividadChart();
      },
      (err) => this.alerta.errorServidor(),
    );

    this.permisos = this.service.obtenerPermisos() ?? [];
    this.dataSource.data = this.permisos;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  obtenerDatos() {
    this.BitacoraCarga();
    this.BitacoraError();
  }

  BitacoraCarga() {
    this.bitacoraService.getBitacoraCargaUsuario().subscribe(
      (res: any[] = []) => {
        this.BitacoraC = res || [];

        // Totales
        this.TotalCorrectos =
          this.BitacoraC[0]?.totalRegistros ?? this.BitacoraC.length;

        // Contadores por operación
        this.TotalAgregados = this.BitacoraC.filter((x: any) =>
          x.proceso?.toLowerCase().includes('agregad'),
        ).length;

        this.TotalActualizados = this.BitacoraC.filter((x: any) =>
          x.proceso?.toLowerCase().includes('actualizad'),
        ).length;

        this.TotalEliminados = this.BitacoraC.filter((x: any) =>
          x.proceso?.toLowerCase().includes('eliminad'),
        ).length;

        // Movimientos detallados para la tabla
        this.movimientos = this.BitacoraC.map((x: any) => ({
          operacion: x.operacion,
          entidad: x.entidad,
          fecha: x.fecha ? new Date(x.fecha) : new Date(),
        }));

        this.dataSourceMov.data = this.movimientos;

        // Actualizar gráficas
        this.actualizarActividadChart();
        this.actualizarMovimientosChart();
      },
      () => this.alerta.errorServidor(),
    );
  }

  BitacoraError() {
    this.bitacoraService.getBitacoraErrorUsuario().subscribe(
      (res: any[]) => {
        this.BitacoraE = res;
        this.TotalError = this.BitacoraE[0]?.totalRegistros ?? 0;
        this.actualizarActividadChart();
      },
      () => this.alerta.errorServidor(),
    );
  }

  actualizarActividadChart() {
    this.actividadChart = {
      labels: ['Cargas Exitosas', 'Errores'],
      datasets: [
        {
          data: [this.TotalCorrectos, this.TotalError],
          backgroundColor: ['#4caf50', '#f44336'],
          borderColor: ['#388e3c', '#d32f2f'],
          borderWidth: 2,
        },
      ],
    };

    this.actividadChartOptions = {
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: { color: '#fff' } },
        tooltip: { enabled: true },
      },
    };
  }

  actualizarMovimientosChart() {
    this.movimientosChart = {
      labels: ['Agregados', 'Actualizados', 'Eliminados'],
      datasets: [
        {
          data: [
            this.TotalAgregados,
            this.TotalActualizados,
            this.TotalEliminados,
          ],
          backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
          borderColor: ['#388e3c', '#f57c00', '#d32f2f'],
          borderWidth: 2,
        },
      ],
    };

    this.movimientosChartOptions = {
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: { color: '#fff' } },
        tooltip: { enabled: true },
      },
    };
  }
}
