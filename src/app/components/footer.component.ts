import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Footer con datos del autor y enlaces rápidos. */
@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
  <footer class="site-footer"><div class="container d-flex flex-wrap justify-content-between gap-3">
    <div class="autor">
      <strong>Noti Zowl © {{ anio }}</strong><br>Carlos Andrés Ovalle Marín<br>
      <a href="mailto:politecnicograncolombiano@gmail.com">politecnicograncolombiano&#64;gmail.com</a><br>
      Front End - Presentado a: John Olarte Ramos
    </div>
    <div>
      <a routerLink="/">Inicio</a><a routerLink="/noticias">Noticias</a>
      <a routerLink="/favoritos">Favoritos</a><a routerLink="/contacto">Contacto</a><br>
      <a href="#">Política de privacidad</a><a href="#">Términos de uso</a><br>
      Politécnico Grancolombiano | Bogotá, Colombia
    </div>
  </div></footer>`,
})
export class FooterComponent { anio = new Date().getFullYear(); }
