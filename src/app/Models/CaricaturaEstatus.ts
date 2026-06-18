export interface CaricaturaSiguiendo {
  caricaturaSiguiendoId?: number;
  usuarioId?: number;
  temporadaId?: number;
  fechaInicio?: string;
  fechaFin?: string | null;
}

export interface CaricaturaProximo {
  caricaturaProximoId?: number;
  usuarioId?: number;
  temporadaId?: number;
}
