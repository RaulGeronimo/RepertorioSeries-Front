export interface TemporadaCaricatura {
  temporadaId: number;
  caricaturaId: number;
  nombre: string;
  capitulos: number | null;
  calificacion: number | null;
  fechaInicio?: string;
  fechaFin?: string | null;
  portada: string;
}

export interface TemporadaSerie {
  temporadaId: number;
  serieId: number;
  nombre: string;
  capitulos: number | null;
  calificacion: number | null;
  fechaInicio?: string;
  fechaFin?: string | null;
  portada: string;
}
