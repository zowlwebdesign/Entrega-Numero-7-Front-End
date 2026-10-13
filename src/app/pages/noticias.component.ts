import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoticiasService } from '../services/noticias.service';
import { NoticiaCardComponent } from '../components/noticia-card.component';

const POR_PAGINA = 6;

/** Listado (RF-01): búsqueda, filtro por categoría, orden y paginación con two-way binding ([(ngModel)]). */
@Component({
  selector: 'app-noticias',
  imports: [FormsModule, NoticiaCardComponent],
  template: `
  <section class="seccion"><div class="container">
    <h1 class="h2">Noticias</h1><p class="text-muted">Explora el catálogo y filtra por categoría.</p>
    <div class="row g-2 mb-3">
      <div class="col-md-8">
        <input type="search" class="form-control" placeholder="Buscar noticias..." aria-label="Buscar noticias"
               [ngModel]="texto()" (ngModelChange)="texto.set($event); pagina.set(1)">
      </div>
      <div class="col-md-4">
        <select class="form-select" aria-label="Ordenar" [ngModel]="orden()" (ngModelChange)="orden.set($event)">
          <option value="recientes">Ordenar: Más recientes</option>
          <option value="antiguas">Más antiguas</option>
          <option value="az">Título (A-Z)</option>
        </select>
      </div>
    </div>
    <div class="d-flex flex-wrap gap-2 mb-2">
      @for (c of categorias; track c) {
        <button type="button" class="filtro" [class.activo]="categoria() === c"
                (click)="categoria.set(c); pagina.set(1)">{{ c }}</button>
      }
    </div>
    <p class="small text-muted" role="status">{{ filtradas().length }} noticia(s) encontrada(s)</p>
    <div class="row g-4">
      @for (n of visibles(); track n.id) {
        <div class="col-12 col-md-6 col-lg-4"><app-noticia-card [noticia]="n" /></div>
      } @empty {
        <p class="text-muted">No se encontraron noticias con esos criterios.</p>
      }
    </div>
    <nav class="mt-4" aria-label="Paginación"><ul class="pagination justify-content-center">
      <li class="page-item" [class.disabled]="pagina() === 1">
        <button class="page-link" (click)="pagina.set(pagina() - 1)">Anterior</button></li>
      @for (p of numeros(); track p) {
        <li class="page-item" [class.active]="p === pagina()">
          <button class="page-link" (click)="pagina.set(p)">{{ p }}</button></li>
      }
      <li class="page-item" [class.disabled]="pagina() === totalPaginas()">
        <button class="page-link" (click)="pagina.set(pagina() + 1)">Siguiente</button></li>
    </ul></nav>
  </div></section>`,
})
export class NoticiasComponent {
  private datos = inject(NoticiasService);
  categorias = ['Todas', 'Educación', 'Tecnología', 'Turismo', 'Comercial'];

  texto = signal('');
  categoria = signal('Todas');
  orden = signal('recientes');
  pagina = signal(1);

  /** Búsqueda + filtro + orden: se recalcula sola cuando cambia cualquier signal usado. */
  filtradas = computed(() => {
    const t = this.texto().trim().toLowerCase();
    const lista = this.datos.noticias().filter((n) =>
      (this.categoria() === 'Todas' || n.categoria === this.categoria()) &&
      `${n.titulo} ${n.descripcion}`.toLowerCase().includes(t));
    return lista.sort((a, b) =>
      this.orden() === 'recientes' ? b.fecha.localeCompare(a.fecha)
      : this.orden() === 'antiguas' ? a.fecha.localeCompare(b.fecha)
      : a.titulo.localeCompare(b.titulo));
  });
  totalPaginas = computed(() => Math.max(1, Math.ceil(this.filtradas().length / POR_PAGINA)));
  numeros = computed(() => Array.from({ length: this.totalPaginas() }, (_, i) => i + 1));
  visibles = computed(() => {
    const p = Math.min(this.pagina(), this.totalPaginas());
    return this.filtradas().slice((p - 1) * POR_PAGINA, p * POR_PAGINA);
  });
}
