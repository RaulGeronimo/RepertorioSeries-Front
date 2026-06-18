export interface TemporadaCaricatura {
  temporadaId: number;
  caricaturaId: number;
  nombre: string;
  capitulos: number;
  calificacion: number;
  fechaInicio?: string;
  fechaFin?: string | null;
  portada: string;
}

export interface TemporadaSerie {
  temporadaId: number;
  serieId: number;
  nombre: string;
  capitulos: number;
  calificacion: number;
  fechaInicio?: string;
  fechaFin?: string | null;
  portada: string;
}
