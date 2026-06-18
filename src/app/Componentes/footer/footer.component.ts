import { Component } from '@angular/core';
import { Navigation } from 'src/app/Models/Navigation';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  navigation: Navigation[] = [
    {
      titulo: 'Facebook',
      icono: 'fab fa-facebook-f',
      ruta: 'https://www.facebook.com/raulgabriel.geronimoherrera/',
    },
    {
      titulo: 'WhatsApp',
      icono: 'fa-brands fa-whatsapp',
      ruta: 'https://api.whatsapp.com/send?phone=5528973869',
    },
    {
      titulo: 'Outlook',
      icono: 'fa-solid fa-envelope',
      ruta: 'mailto:geronimoraul400@gmail.com',
    },
    {
      titulo: 'Instagram',
      icono: 'fab fa-instagram',
      ruta: 'https://www.instagram.com/raul_geronimoherrera/',
    },
    {
      titulo: 'Linkedin',
      icono: 'fab fa-linkedin-in',
      ruta: 'https://www.linkedin.com/in/ra%C3%BAl-gabriel-ger%C3%B3nimo-herrera-293665293/',
    },
  ];
}
