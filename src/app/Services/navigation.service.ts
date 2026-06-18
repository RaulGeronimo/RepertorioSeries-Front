import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private lastValidUrl: string = '/repertorio';

  private excludedRoutes = [
    '/agregar',
    '/actualizar',
    '/no-autorizado',
    '/login',
    '/register',
    '/reset',
  ];

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationStart => event instanceof NavigationStart,
        ),
      )
      .subscribe((event) => {
        const shouldExclude = this.excludedRoutes.some((route) =>
          event.url.includes(route),
        );

        if (!shouldExclude) {
          this.lastValidUrl = event.url;
        }
      });
  }

  goBack(): void {
    this.router.navigateByUrl(this.lastValidUrl);
  }

  getLastUrl(): string {
    return this.lastValidUrl;
  }

  clear(): void {
    this.lastValidUrl = '/repertorio';
  }
}
