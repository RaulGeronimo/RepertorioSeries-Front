import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-export-button',
  templateUrl: './export-button.component.html',
  styleUrls: ['./export-button.component.css'],
})
export class ExportButtonComponent {
  /** Color de Bootstrap: primary, success, danger, warning, info, secondary, dark, light */
  @Input() color: string = 'success';

  /** Outline: true = btn-outline-color, false = btn-color */
  @Input() outline: boolean = true;

  /** Tamaño del ícono */
  @Input() size: number = 16;

  /** Función a ejecutar al hacer click */
  @Input() action!: () => void;

  /** Clases adicionales opcionales */
  @Input() extraClass: string = '';

  /** Genera la clase correcta de Bootstrap */
  get btnClass(): string {
    const type = this.outline ? 'btn-' : 'btn-';
    return `btn ${type}${this.color} no-radius ${this.extraClass}`;
  }
}
