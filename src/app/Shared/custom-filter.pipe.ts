import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customGlobalFilter'
})
export class CustomGlobalFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      // Recorremos todas las propiedades del objeto
      for (const key in item) {
        if (item[key] && item[key].toString().toLowerCase().includes(searchText)) {
          return true; // si encuentra coincidencia en alguna propiedad
        }
      }
      return false; // si no encontró en ninguna propiedad
    });
  }
}
