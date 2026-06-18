export interface SerieSiguiendo {
  serieSiguiendoId?: number;
  usuarioId?: number;
  temporadaId?: number;
  fechaInicio?: string;
  fechaFin?: string | null;
}

export interface SerieProximo {
  serieProximoId?: number;
  usuarioId?: number;
  temporadaId?: number;
}
