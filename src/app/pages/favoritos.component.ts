import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiasService } from '../services/noticias.service';
import { imagenRespaldo, slugCategoria } from '../utils';

/** Favoritos (RF-03): lista personalizada guardada en localStorage. */
@Component({
  selector: 'app-favoritos',
  imports: [RouterLink],
  template: `
  <section class="seccion"><div class="container">
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-3">
      <div><h1 class="h2 m-0">Mis favoritos</h1>
        <small class="text-muted" role="status">{{ datos.favoritasCompletas().length }} noticia(s) guardada(s)</small></div>
      @if (datos.favoritasCompletas().length) {
        <button class="btn btn-secundario" (click)="vaciar()">Vaciar lista</button>
      }
    </div>
    @for (n of datos.favoritasCompletas(); track n.id) {
      <div class="fila-fav">
        <img [src]="n.imagen" alt="" (error)="respaldo($event, n.categoria)">
        <div><span [class]="'etiqueta cat-' + slug(n.categoria)">{{ n.categoria }}</span>
          <h3 class="h6 mt-1 mb-1">{{ n.titulo }}</h3><small class="text-muted">{{ n.descripcion }}</small></div>
        <div class="acciones">
          <a class="btn btn-sm btn-primario" [routerLink]="['/noticia', n.id]">Ver detalle</a>
          <button class="btn btn-sm btn-secundario" (click)="datos.alternarFavorito(n.id)">Quitar</button>
        </div>
      </div>
    } @empty {
      <div class="text-center py-5"><p class="fs-5">Aún no has guardado noticias</p>
        <a class="btn btn-primario" routerLink="/noticias">Explorar noticias</a></div>
    }
  </div></section>`,
})
export class FavoritosComponent {
  datos = inject(NoticiasService);
  slug = slugCategoria;
  respaldo = imagenRespaldo;
  vaciar() { if (confirm('¿Deseas vaciar toda tu lista de favoritos?')) this.datos.vaciarFavoritos(); }
}
