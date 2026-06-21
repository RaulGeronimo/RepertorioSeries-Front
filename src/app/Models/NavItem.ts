import { Seccion } from 'src/app/enum/seccion.enum';

export interface NavSubItem {
  nombre: string;
  routerLink: string[];
  seccion?: Seccion;
  divisorAntes?: boolean;
}

export interface NavLinkItem {
  tipo: 'link';
  nombre: string;
  routerLink: string[];
  seccion?: Seccion;
}

export interface NavDropdownItem {
  tipo: 'dropdown';
  nombre: string;
  seccion?: Seccion;
  items: NavSubItem[];
}

export type NavItem = NavLinkItem | NavDropdownItem;

export interface NavExternalLinkItem {
  id: number;
  nombre: string;
  url: string;
}
