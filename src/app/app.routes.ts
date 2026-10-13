import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { NoticiasComponent } from './pages/noticias.component';
import { DetalleComponent } from './pages/detalle.component';
import { FavoritosComponent } from './pages/favoritos.component';
import { ContactoComponent } from './pages/contacto.component';
import { AdministrarComponent } from './pages/administrar.component';

/** Mapa de navegación (Figura 1 de la Entrega previa 1). */
export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Inicio | Noti Zowl' },
  { path: 'noticias', component: NoticiasComponent, title: 'Noticias | Noti Zowl' },
  { path: 'noticia/:id', component: DetalleComponent, title: 'Detalle de noticia | Noti Zowl' },
  { path: 'favoritos', component: FavoritosComponent, title: 'Favoritos | Noti Zowl' },
  { path: 'contacto', component: ContactoComponent, title: 'Contacto | Noti Zowl' },
  { path: 'administrar', component: AdministrarComponent, title: 'Administrar noticias | Noti Zowl' },
  { path: '**', redirectTo: '' },
];
