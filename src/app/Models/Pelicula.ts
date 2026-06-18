export interface Pelicula {
  peliculaId: number;
  caricaturaId: number;
  serieId: number;
  nombre: string;
  otrosNombres: string;
  director: string;
  estreno?: string;
  estrenoMexico?: string;
  calificacion: number;
  genero: string;
  duracion: string;
  clasificacionId: number;
  productora: string;
  distribuidora: string;
  portada: string;
}
