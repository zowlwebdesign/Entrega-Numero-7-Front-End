import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiasService } from '../services/noticias.service';
import { NoticiaCardComponent } from '../components/noticia-card.component';

/** Página de inicio (RF-04): bienvenida con video, destacadas, llamado a la acción y testimonios. */
@Component({
  selector: 'app-home',
  imports: [RouterLink, NoticiaCardComponent],
  template: `
  <section class="hero-video">
    <video autoplay muted loop playsinline poster="img/tecnologia.svg" aria-hidden="true">
      <source src="video/hero.mp4" type="video/mp4">
    </video>
    <div class="container"><div class="row"><div class="col-lg-7">
      <h1 class="display-4 fw-bold">Bienvenido a Noti Zowl</h1>
      <p class="lead">Noticias educativas, tecnológicas, turísticas y comerciales en un solo lugar.</p>
      <a class="btn btn-primario me-2" routerLink="/noticias">Explorar noticias</a>
      <a class="btn btn-secundario" routerLink="/contacto">Contactar</a>
    </div></div></div>
  </section>

  <section class="seccion"><div class="container">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="h4 m-0">Noticias destacadas</h2><a routerLink="/noticias">Ver todas</a>
    </div>
    <div class="row g-4">
      @for (n of destacadas(); track n.id) {
        <div class="col-12 col-md-6 col-lg-4"><app-noticia-card [noticia]="n" /></div>
      } @empty {
        <p class="text-muted">No hay noticias disponibles.</p>
      }
    </div>
  </div></section>

  <section class="container"><div class="cta d-flex flex-wrap justify-content-between align-items-center gap-3">
    <div><h2 class="h5 m-0">¿Quieres estar al día?</h2>
      <small>Explora el catálogo completo o escríbenos para compartir una noticia.</small></div>
    <div><a class="btn btn-primario me-2" routerLink="/noticias">Explorar</a>
      <a class="btn btn-secundario" routerLink="/contacto">Contactar</a></div>
  </div></section>

  <section class="seccion"><div class="container">
    <h2 class="h4 mb-3">Lo que dicen nuestros lectores</h2>
    <div class="row g-3">
      @for (t of testimonios; track t.autor) {
        <div class="col-md-6"><blockquote class="p-3 border rounded bg-light m-0">
          "{{ t.texto }}"<footer class="small text-muted mt-2">{{ t.autor }}</footer></blockquote></div>
      }
    </div>
  </div></section>`,
})
export class HomeComponent {
  private datos = inject(NoticiasService);
  /** Las 3 noticias más recientes (el servicio guarda la más reciente primero / ordenamos por fecha). */
  destacadas = computed(() => [...this.datos.noticias()].sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 3));
  testimonios = [
    { texto: 'Encuentro todo en un solo lugar y guardo lo que me interesa.', autor: 'Camila R., estudiante' },
    { texto: 'Las noticias son claras y fáciles de guardar.', autor: 'Andrés M., lector' },
  ];
}
