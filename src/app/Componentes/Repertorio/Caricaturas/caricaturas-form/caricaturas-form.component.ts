import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/Services/alertas.service';

import { Caricatura } from 'src/app/Models/Caricatura';
import { CaricaturaService } from 'src/app/Services/caricatura.service';
import { NavigationService } from 'src/app/Services/navigation.service';

@Component({
  selector: 'app-caricaturas-form',
  templateUrl: './caricaturas-form.component.html',
  styleUrls: ['./caricaturas-form.component.css'],
})
export class CaricaturasFormComponent implements OnInit {
  form: FormGroup;

  caricatura: Caricatura = {
    caricaturaId: 0,
    nombre: '',
    otrosNombres: '',
    creador: '',
    genero: '',
    productora: '',
    distribuidora: '',
    difusion: '',
    duracion: '00:23:00',
    portada: '',
  };

  edit: boolean = false;

  Estatus: any = [];

  constructor(
    private service: CaricaturaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private alerta: AlertasService,
    private navigationService: NavigationService,
  ) {
    this.form = this.fb.group({
      Nombre: ['', Validators.required],
      OtrosNombres: ['', Validators.required],
      Creador: ['', Validators.required],
      Genero: ['', Validators.required],
      Productora: ['', Validators.required],
      Distribuidora: ['', Validators.required],
      Difusion: ['', Validators.required],
      Duracion: ['', Validators.required],
      Portada: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.service.getById(params['id']).subscribe(
        (res) => {
          this.caricatura = res; //Muestra en el navegador
          this.edit = true; //Asignamos que es verdadero
        },
        (err) => {
          this.alerta.errorServidor();
        },
      );
    }
  }

  add() {
    this.service.create(this.caricatura).subscribe(
      (res) => {
        this.router.navigate(['..'], { relativeTo: this.activatedRoute });
        this.alerta.successtroast(
          `La caricatura '${this.caricatura.nombre}' fue agregada con éxito`,
          'Caricatura Agregada',
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
    const params = this.activatedRoute.snapshot.params;
    this.service.update(params['id'], this.caricatura).subscribe(
      (res) => {
        this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
        this.alerta.infotroast(
          `La caricatura '${this.caricatura.nombre}' fue actualizada con éxito`,
          'Caricatura Actualizada',
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

  regresar() {
    this.navigationService.goBack();
  }
}
