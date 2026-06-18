import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Models/User';
import { AlertasService } from 'src/app/Services/alertas.service';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  email: FormGroup;
  user: FormGroup;
  password: FormGroup;
  fieldTextType = {
    password1: false,
    password2: false,
  };

  currentStep: number = 1;

  usuario: User = {};
  UsuarioEncontrado: User = {};

  UsuarioId: number = 0;

  ngOnInit(): void {
    document.body.style.overflowY = 'auto';
    document.documentElement.style.overflowY = 'auto';
  }

  constructor(
    private service: UsuariosService,
    private fb: FormBuilder,
    private alerta: AlertasService,
  ) {
    this.email = this.fb.group({
      Correo: [
        '',
        [
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          Validators.required,
        ],
      ],
    });
    this.user = this.fb.group({
      Usuario: ['', Validators.required],
    });
    this.password = this.fb.group(
      {
        Password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/,
            ),
          ],
        ],
        Password2: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator },
    );
  }

  buscarCorreo() {
    this.service.Validar(this.usuario).subscribe(
      (res) => {
        this.UsuarioEncontrado = res;
        this.currentStep = 2;
      },
      (err) => {
        const msg = err.error?.message || 'Error al Validar';
        if (err.status === 400 || err.status === 401) {
          this.alerta.warning(msg, 'Error al Validar');
        } else {
          this.alerta.errorServidor();
        }
      },
    );
  }

  buscarUsuario() {
    this.service.Validar(this.usuario).subscribe(
      (res: any) => {
        // Si el usuario viene dentro de result
        this.UsuarioEncontrado = Array.isArray(res) ? res[0] : res;
        this.UsuarioId = this.UsuarioEncontrado?.usuarioId ?? 0;
        this.currentStep = 3;
      },
      (err) => {
        const msg = err.error?.message || 'Error al Validar';
        if (err.status === 400 || err.status === 401) {
          this.alerta.warning(msg, 'Error al Validar');
        } else {
          this.alerta.errorServidor();
        }
      },
    );
  }

  cambiarPassword() {
    this.service.update(this.UsuarioId, this.usuario).subscribe(
      (res) => {
        this.currentStep = 4;
      },
      (err) => {
        const msg = err.error?.message || 'Error al Actualizar';
        if (err.status === 400 || err.status === 401) {
          this.alerta.warning(msg, 'Error al Actualizar');
        } else {
          this.alerta.errorServidor();
        }
      },
    );
  }

  toggleFieldTextType(field: 'password1' | 'password2') {
    this.fieldTextType[field] = !this.fieldTextType[field];
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const pass = formGroup.get('Password')?.value;
    const confirm = formGroup.get('Password2')?.value;
    return pass === confirm ? null : { mismatch: true };
  }
}
