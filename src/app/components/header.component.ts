import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NoticiasService } from '../services/noticias.service';

/** Header con logo y menú de 5 páginas. El contador de favoritos se enlaza (binding) al servicio. */
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
  <header class="site-header">
    <nav class="navbar navbar-expand-md navbar-light"><div class="container">
      <a class="navbar-brand" routerLink="/">
        <img src="img/logo.png" alt="Logo de Noti Zowl: búho y zorro" (error)="ocultar($event)">
        <span>Noti Zowl<small>Plataforma web de noticias</small></span>
      </a>
      <button class="navbar-toggler" type="button" aria-label="Abrir menú" (click)="abierto.set(!abierto())">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" [class.show]="abierto()">
        <ul class="navbar-nav gap-md-3">
          @for (p of paginas; track p.ruta) {
            <li class="nav-item">
              <a class="nav-link" [routerLink]="p.ruta" routerLinkActive="active"
                 [routerLinkActiveOptions]="{ exact: p.ruta === '/' }" (click)="abierto.set(false)">
                {{ p.texto }}
                @if (p.ruta === '/favoritos') {
                  <span class="badge badge-fav rounded-pill">{{ datos.favoritos().length }}</span>
                }
              </a>
            </li>
          }
        </ul>
      </div>
    </div></nav>
  </header>`,
})
export class HeaderComponent {
  datos = inject(NoticiasService);
  abierto = signal(false);
  paginas = [
    { ruta: '/', texto: 'Inicio' },
    { ruta: '/noticias', texto: 'Noticias' },
    { ruta: '/favoritos', texto: 'Favoritos' },
    { ruta: '/contacto', texto: 'Contacto' },
    { ruta: '/administrar', texto: 'Administrar' },
  ];
  ocultar(e: Event) { (e.target as HTMLElement).style.display = 'none'; }
}
