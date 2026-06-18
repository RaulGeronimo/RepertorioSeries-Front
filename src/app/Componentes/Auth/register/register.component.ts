import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertasService } from 'src/app/Services/alertas.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  fieldTextType = {
    password1: false,
    password2: false,
  };

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
    rolId: 3,
    activo: true,
  };

  ngOnInit(): void {
    document.body.style.overflowY = 'auto';
    document.documentElement.style.overflowY = 'auto';
  }

  constructor(
    private userService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private alerta: AlertasService,
  ) {
    this.form = this.fb.group(
      {
        Nombre: ['', Validators.required],
        ApellidoPaterno: ['', Validators.required],
        ApellidoMaterno: ['', Validators.required],
        Usuario: ['', Validators.required],
        Correo: [
          '',
          [
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            Validators.required,
          ],
        ],
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
        FechaNacimiento: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator },
    );
  }

  add() {
    this.userService.create(this.user).subscribe(
      (res) => {
        this.router.navigate(['login']);
        this.alerta.success(
          `El usuario '${this.user.usuario}' fue agregado con éxito`,
          'Usuario Agregado',
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

  toggleFieldTextType(field: 'password1' | 'password2') {
    this.fieldTextType[field] = !this.fieldTextType[field];
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const pass = formGroup.get('Password')?.value;
    const confirm = formGroup.get('Password2')?.value;
    return pass === confirm ? null : { mismatch: true };
  }
}
