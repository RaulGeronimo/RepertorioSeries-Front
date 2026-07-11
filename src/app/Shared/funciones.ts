import { Injectable, Pipe } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import * as XLSX from 'xlsx';

//#region Columnas Exportar
const EXCLUIR = [
  'totalRegistros',
  'usuarioId',
  'activo',
  'rolId',
  'portada',
  'portadasArray',
  'caricaturaId',
  'serieId',
  'peliculaId',
  'temporadaId',
  'esProximo',
  'caricaturaSiguiendoId',
  'caricaturaProximoId',
  'serieSiguiendoId',
  'serieProximoId',
];

const FECHAS = [
  'fechaNacimiento',
  'fechaInicio',
  'fechaFin',
  'estreno',
  'estrenoMexico',
  'inicioVisualizacion',
  'finVisualizacion',
];

const FECHAS_HORA = ['modificado', 'registro', 'fecha'];

const ENCABEZADOS: Record<string, string> = {
  fechaNacimiento: 'Fecha Nacimiento',
  registro: 'Fecha Registro',
  diasCumple: 'Días Cumpleaños',
  nombreCompleto: 'Nombre Completo',
  fechaInicio: 'Primera Emisión',
  fechaFin: 'Última Emisión',
  otrosNombres: 'Otros Nombres',
  anios: 'Años Emisión',
  estreno: 'Fecha Estreno',
  estrenoMexico: 'Fecha Estreno México',
  inicioVisualizacion: 'Inicio Visualización',
  finVisualizacion: 'Fin Visualización',
};
//#endregion Columnas Exportar

@Injectable({
  providedIn: 'root',
})
@Pipe({
  name: 'orderBy',
})
export class FuncionesService {
  Lista: any = [];
  constructor() {}

  //#region Validacion Formularios
  noCeroValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const val = control.value;
      if (val === 0 || val === '0') {
        return { noCero: true };
      }
      return null;
    };
  }
  //#endregion Validacion Formularios

  //#region Excel
  public exportarExcel(lista: any, archivo: string) {
    const data = lista.map((registro: any) => {
      const formateado: any = {};

      for (const key in registro) {
        if (EXCLUIR.includes(key)) continue;

        let valor = registro[key];

        if (FECHAS.includes(key)) {
          valor = formatearFecha(valor);
          if (valor === '') continue;
        }

        if (FECHAS_HORA.includes(key)) {
          valor = formatearFechaTime(valor);
          if (valor === '') continue;
        }

        const nuevoKey = capitalizar(ENCABEZADOS[key] || key);
        formateado[nuevoKey] = valor;
      }

      return formateado;
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, archivo);

    const nombreArchivo = `${archivo}_${FechaActual()}.xlsx`;
    XLSX.writeFile(wb, nombreArchivo);
  }

  public exportarExcelMultiple(
    hojas: { nombre: string; data: any[] }[],
    archivo: string,
  ) {
    const wb = XLSX.utils.book_new();

    hojas.forEach((hoja) => {
      const data = hoja.data.map((registro: any) => {
        const formateado: any = {};

        for (const key in registro) {
          if (EXCLUIR.includes(key)) continue;

          let valor = registro[key];

          if (FECHAS.includes(key)) {
            valor = formatearFecha(valor);
            if (valor === '') continue;
          }

          if (FECHAS_HORA.includes(key)) {
            valor = formatearFechaTime(valor);
            if (valor === '') continue;
          }

          const nuevoKey = capitalizar(ENCABEZADOS[key] || key);
          formateado[nuevoKey] = valor;
        }

        return formateado;
      });

      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, hoja.nombre);
    });

    const nombreArchivo = `${archivo}_${FechaActual()}.xlsx`;
    XLSX.writeFile(wb, nombreArchivo);
  }

  //#endregion Excel
}

export function formatearFecha(fecha: string | number | Date): string {
  if (fecha == '' || fecha == null) {
    return '';
  } else {
    const date = new Date(fecha);
    const dia = date.getDate().toString().padStart(2, '0'); // Asegurar que tenga 2 dígitos
    const meses = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];
    const mes = meses[date.getMonth()];
    const año = date.getFullYear();
    return `${dia} de ${mes} de ${año}`;
  }
}

export function formatearFechaTime(fecha: string | number | Date): string {
  if (fecha == '' || fecha == null) {
    return '';
  } else {
    const date = new Date(fecha);
    const dia = date.getDate().toString().padStart(2, '0'); // Asegurar que tenga 2 dígitos
    const meses = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];
    const mes = meses[date.getMonth()];
    const año = date.getFullYear();

    let horas = date.getHours();
    const minutos = date.getMinutes().toString().padStart(2, '0');
    const segundos = date.getSeconds().toString().padStart(2, '0');
    const ampm = horas >= 12 ? 'PM' : 'AM';

    // Convertir de formato 24 horas a 12 horas
    horas = horas % 12;
    horas = horas ? horas : 12; // El valor 0 debe ser 12
    const horasFormateadas = horas.toString().padStart(2, '0');

    return `${dia} de ${mes} de ${año} ${horasFormateadas}:${minutos}:${segundos} ${ampm}`;
  }
}

export function FechaActual() {
  const fechaActual = new Date();
  const dia = fechaActual.getDate().toString().padStart(2, '0'); // Asegurar que tenga 2 dígitos
  const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Asegurar que tenga 2 dígitos
  const año = fechaActual.getFullYear();
  const segundos = fechaActual.getMilliseconds();
  return `${año}${mes}${dia}${segundos}`;
}

function capitalizar(texto: string): string {
  return texto
    .split(' ')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
}

export function fechaMayorQueValidator(
  campoInicio: string,
  campoFin: string,
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const inicio = formGroup.get(campoInicio)?.value;
    const fin = formGroup.get(campoFin)?.value;

    // Si alguno no tiene valor, no validamos
    if (!inicio || !fin) {
      return null;
    }

    const fechaInicio = new Date(inicio);
    const fechaFin = new Date(fin);

    // Si la fecha fin es menor o igual, retorna error
    if (fechaFin <= fechaInicio) {
      const error = { [`${campoFin}MayorQue${campoInicio}`]: true };
      formGroup.get(campoFin)?.setErrors(error);
      return error;
    }

    // Limpia error si antes estaba inválido y ahora es correcto
    if (
      formGroup.get(campoFin)?.hasError(`${campoFin}MayorQue${campoInicio}`)
    ) {
      formGroup.get(campoFin)?.setErrors(null);
    }

    return null;
  };
}

export function formatearFechaInput(fecha: string): string {
  return fecha ? fecha.split('T')[0] : '';
}

//#region Temporadas
export function calificacionRequeridaSiFechaFin(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fechaFin = control.get('FechaFin')?.value;

    const calificacion = control.get('Calificacion')?.value;
    const capitulos = control.get('Capitulos')?.value;

    const errores: any = {};

    if (
      fechaFin &&
      (calificacion === null ||
        calificacion === '' ||
        calificacion == undefined ||
        calificacion == 0)
    ) {
      errores.Calificacion = true;
    }

    if (
      fechaFin &&
      (capitulos === null ||
        capitulos === '' ||
        capitulos == undefined ||
        capitulos == 0)
    ) {
      errores.Capitulos = true;
    }

    return Object.keys(errores).length > 0 ? errores : null;
  };
}

export function calificacionRequeridaPelicula(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const estrenoValue = control.get('Estreno')?.value;
    const calificacion = control.get('Calificacion')?.value;

    if (!estrenoValue) {
      return null;
    }

    const fechaEstreno = new Date(estrenoValue);
    fechaEstreno.setHours(0, 0, 0, 0);

    const fechaLimite = new Date(fechaEstreno);
    fechaLimite.setMonth(fechaLimite.getMonth() + 3);

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (hoy <= fechaEstreno) {
      return null;
    }

    const esRequerida = hoy >= fechaLimite;

    if (
      esRequerida &&
      (calificacion === null ||
        calificacion === '' ||
        calificacion === undefined ||
        calificacion === 0)
    ) {
      return {
        Calificacion: true,
      };
    }

    return null;
  };
}

export function FechaFinMayorQueFechaInicio(permitirIgual: boolean = false): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const fechaInicio = formGroup.get('FechaInicio')?.value;
    const fechaFin = formGroup.get('FechaFin')?.value;

    if (!fechaInicio || !fechaFin) {
      return null;
    }

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    const esValida = permitirIgual ? fin >= inicio : fin > inicio;

    return esValida ? null : { fechaFinInvalida: true };
  };
}

export function LimiteFecha(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const fechaFin = formGroup.get('FechaFin')?.value;

    if (!fechaFin) {
      return null;
    }

    const fin = new Date(fechaFin);
    const actual = new Date();

    return fin <= actual ? null : { fechaFinFutura: true };
  };
}
//#endregion Temporadas
