import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiasService } from '../services/noticias.service';
import { imagenRespaldo, slugCategoria } from '../utils';

/** Detalle (RF-02, RF-03). El :id de la ruta llega como input() gracias a withComponentInputBinding(). */
@Component({
  selector: 'app-detalle',
  imports: [RouterLink],
  template: `
  <section class="seccion"><div class="container"><div class="row g-4">
    <div class="col-lg-8">
      @if (noticia(); as n) {
        <nav aria-label="breadcrumb" class="mb-3 text-muted small">
          <a routerLink="/">Inicio</a> &gt; <a routerLink="/noticias">Noticias</a> &gt; {{ n.titulo }}
        </nav>
        <img class="detalle-img mb-3" [src]="n.imagen" [alt]="'Imagen de la noticia: ' + n.titulo"
             (error)="respaldo($event, n.categoria)">
        <span [class]="'etiqueta cat-' + slug(n.categoria)">{{ n.categoria }}</span>
        <h1 class="h2 mt-2">{{ n.titulo }}</h1>
        <p class="text-muted small">Publicado el {{ fecha(n.fecha) }} | Por {{ n.autor }}</p>
        <p>{{ n.contenido }}</p>
        <div class="d-flex flex-wrap gap-2 mt-3">
          <button class="btn btn-primario" (click)="alternar(n.id)">
            {{ datos.esFavorito(n.id) ? '★ Quitar de favoritos' : '☆ Agregar a favoritos' }}
          </button>
          <a class="btn btn-secundario" routerLink="/contacto">Contactar</a>
        </div>
        @if (aviso()) { <div class="msg-exito mt-3" role="status">{{ aviso() }}</div> }
      } @else if (datos.cargado()) {
        <div class="alert alert-warning">La noticia no existe o fue eliminada. <a routerLink="/noticias">Volver al listado</a></div>
      } @else { <p>Cargando...</p> }
    </div>
    <aside class="col-lg-4">
      <h2 class="h5">Noticias relacionadas</h2>
      @for (x of relacionadas(); track x.id) {
        <a class="relacionada" [routerLink]="['/noticia', x.id]"><strong>{{ x.titulo }}</strong><br>
          <small class="text-muted">{{ x.categoria }}</small></a>
      }
    </aside>
  </div></div></section>`,
})
export class DetalleComponent {
  datos = inject(NoticiasService);
  id = input<string>();                       // parámetro de la ruta /noticia/:id
  aviso = signal('');
  slug = slugCategoria;
  respaldo = imagenRespaldo;

  noticia = computed(() => this.datos.noticias().find((n) => n.id === Number(this.id())));
  /** Primero las de la misma categoría, luego las demás (máx. 3). */
  relacionadas = computed(() => {
    const actual = this.noticia();
    return this.datos.noticias().filter((x) => x.id !== actual?.id)
      .sort((a, b) => Number(b.categoria === actual?.categoria) - Number(a.categoria === actual?.categoria))
      .slice(0, 3);
  });

  /** 2026-09-12 -> 12 de septiembre de 2026 */
  fecha(iso: string) {
    return new Date(iso + 'T12:00:00').toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  alternar(id: number) {
    const guardada = this.datos.alternarFavorito(id);
    this.aviso.set(guardada ? 'Noticia guardada en tus favoritos.' : 'Noticia quitada de tus favoritos.');
  }
}
