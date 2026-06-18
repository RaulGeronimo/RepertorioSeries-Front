import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import { AlertasService } from 'src/app/Services/alertas.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FuncionesService } from 'src/app/Shared/funciones';
import { PermisosService } from 'src/app/Services/permisos.service';
import { environment } from 'src/environments/environment';
import { Seccion } from 'src/app/enum/seccion.enum';
import { CatalogosService } from 'src/app/Services/catalogos.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css'],
})
export class UsuarioListComponent implements OnInit, AfterViewInit {
  pageSize: number = environment.registrosPagina;
  Archivo: string = 'Usuarios';

  displayedColumns: string[] = [
    'usuarioId',
    'usuario',
    'correo',
    'nombre',
    'registro',
    'fechaNacimiento',
    'edad',
    'diasCumple',
    'rol',
    'activo',
  ];

  dataSource = new MatTableDataSource<any>();
  total: number = 0;

  Usuarios: any = [];
  usuarioLogeado: string = '';

  Roles: any = [];

  //#region Permisos
  Seccion = Seccion;
  //#endregion Permisos

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: UsuariosService,
    private catalogo: CatalogosService,
    private alerta: AlertasService,
    public permiso: PermisosService,
    private funcion: FuncionesService,
  ) {}

  ngOnInit(): void {
    this.obtenerDatos();
    this.usuarioLogeado = localStorage.getItem('usuario') || '';
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    setTimeout(() => {
      this.sort.active = 'usuario';
      this.sort.direction = 'asc';

      this.sort.sortChange.emit({
        active: this.sort.active,
        direction: this.sort.direction,
      });
    });
  }

  obtenerDatos() {
    this.obtenerLista();
    this.obtenerRoles();
  }

  obtenerLista() {
    this.service.getUsuarios().subscribe(
      (res: any[]) => {
        if (res != null) {
          this.Usuarios = res;
          this.dataSource.data = res;
          this.total = res.length > 0 ? res[0].totalRegistros : 0;
        } else {
          this.Usuarios = [];
          this.alerta.SinResultados();
        }
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      },
    );
  }

  obtenerRoles() {
    this.catalogo.getRol().subscribe(
      (res) => {
        this.Roles = res;
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

  cambiarEstado(usuario: any, nuevoEstado: boolean) {
    // Validar reglas
    if (usuario.usuarioId === 1) {
      this.alerta.mostrarAlertaSimple(
        'Operación no permitida',
        'El usuario Admin no puede ser modificado.',
        'info',
      );
      return;
    }

    if (usuario.usuario === this.usuarioLogeado) {
      this.alerta.mostrarAlertaSimple(
        'Operación no permitida',
        'No puedes modificar tu propio estado.',
        'info',
      );
      return;
    }

    const usuarioActualizado = { ...usuario, activo: nuevoEstado };

    this.service.update(usuario.usuarioId, usuarioActualizado).subscribe({
      next: () => {
        usuario.activo = nuevoEstado;
        this.alerta.mostrarAlertaSimple(
          'Usuario actualizado',
          `El usuario '${usuario.usuario}' ha sido ${
            nuevoEstado ? 'activado' : 'desactivado'
          }.`,
          'success',
        );
      },
      error: (err) => {
        console.error(err);
        this.alerta.errorServidor();
      },
    });
  }

  cambiarRol(usuario: any, nuevoRolId: number) {
    // Validaciones
    if (usuario.usuarioId === 1) {
      this.alerta.mostrarAlertaSimple(
        'Operación no permitida',
        'El usuario Admin no puede cambiar de rol.',
        'info',
      );
      return;
    }

    if (usuario.usuario === this.usuarioLogeado) {
      this.alerta.mostrarAlertaSimple(
        'Operación no permitida',
        'No puedes cambiar tu propio rol.',
        'info',
      );
      return;
    }

    // Buscar nombre del rol en el catálogo
    const rolEncontrado = this.Roles.find((r: any) => r.RolId === nuevoRolId);
    const nombreRol = rolEncontrado ? rolEncontrado.Rol : nuevoRolId;

    // Actualizar usuario
    const usuarioActualizado = { ...usuario, rol: nuevoRolId };

    this.service.update(usuario.usuarioId, usuarioActualizado).subscribe({
      next: () => {
        usuario.rol = nuevoRolId; // aquí sigues guardando el id
        this.alerta.mostrarAlertaSimple(
          'Rol actualizado',
          `El usuario '${usuario.usuario}' ahora tiene el rol: ${nombreRol}.`,
          'success',
        );
      },
      error: (err) => {
        console.error(err);
        this.alerta.errorServidor();
      },
    });
  }

  export() {
    this.alerta.reporte(this.Archivo);
    this.funcion.exportarExcel(this.Usuarios, this.Archivo);
  }
}
