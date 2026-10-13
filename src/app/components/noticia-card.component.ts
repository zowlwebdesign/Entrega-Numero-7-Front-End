import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Noticia } from '../models/noticia';
import { imagenRespaldo, slugCategoria } from '../utils';

/** Tarjeta reutilizable (RF-01). Recibe la noticia por @Input (property binding) y se usa en Home y Listado. */
@Component({
  selector: 'app-noticia-card',
  imports: [RouterLink],
  template: `
  <article class="tarjeta">
    <img [src]="noticia().imagen" [alt]="'Imagen de la noticia: ' + noticia().titulo"
         (error)="respaldo($event)">
    <div class="cuerpo">
      <span [class]="'etiqueta cat-' + slug(noticia().categoria)">{{ noticia().categoria }}</span>
      <h3>{{ noticia().titulo }}</h3>
      <p>{{ noticia().descripcion }}</p>
      <a class="btn btn-sm btn-primario align-self-start" [routerLink]="['/noticia', noticia().id]">Ver más</a>
    </div>
  </article>`,
})
export class NoticiaCardComponent {
  noticia = input.required<Noticia>();
  slug = slugCategoria;
  respaldo(e: Event) { imagenRespaldo(e, this.noticia().categoria); }
}
