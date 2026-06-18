import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertasService } from 'src/app/Services/alertas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  fieldTextType: boolean = false;
  form: FormGroup;

  user: User = {
    usuarioId: 0,
    usuario: '',
    correo: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    password: '',
    fechaNacimiento: '',
    rolId: 0,
    activo: true,
  };

  ngOnInit(): void {
    if (this.userService.estaAutenticado()) {
      this.router.navigate(['/repertorio']);
    }

    document.body.style.overflowY = 'auto';
    document.documentElement.style.overflowY = 'auto';
  }

  constructor(
    private userService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private alerta: AlertasService,
  ) {
    this.form = this.fb.group({
      Usuario: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  iniciarSesion() {
    this.userService.login(this.user.usuario!, this.user.password!).subscribe(
      (res) => {
        this.userService.guardarTokens(
          res.accessToken,
          res.refreshToken,
          res.expiraEn,
        );
        this.userService.guardarPermisos(res.permisos);
        this.userService.guardarUsuario(this.user.usuario!);

        this.router.navigate(['repertorio/']);
        this.alerta.successtroast(
          `Bienvenido '${this.user.usuario}'`,
          'Usuario Logeado',
        );
      },
      (err) => {
        const msg = err.error?.message || 'Error de autenticación';
        if (err.status === 400 || err.status === 401) {
          this.alerta.warning(msg, 'Error de autenticación');
        } else {
          this.alerta.errorServidor();
        }
      },
    );
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
