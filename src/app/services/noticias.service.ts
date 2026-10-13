import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Noticia } from '../models/noticia';

const LLAVE_NOTICIAS = 'notizowl_noticias';
const LLAVE_FAVORITOS = 'notizowl_favoritos';

/**
 * Servicio único de datos de Noti Zowl.
 * - Carga el catálogo inicial desde data/noticias.json (HttpClient).
 * - Persiste noticias y favoritos en localStorage.
 * - Expone el estado como signals: todos los componentes se actualizan solos (data binding).
 */
@Injectable({ providedIn: 'root' })
export class NoticiasService {
  private http = inject(HttpClient);

  readonly noticias = signal<Noticia[]>([]);
  readonly favoritos = signal<number[]>(this.leer<number[]>(LLAVE_FAVORITOS, []));
  readonly cargado = signal(false);

  /** Noticias marcadas como favoritas, listas para mostrar. */
  readonly favoritasCompletas = computed(() =>
    this.noticias().filter((n) => this.favoritos().includes(n.id)));

  constructor() {
    const guardadas = this.leer<Noticia[] | null>(LLAVE_NOTICIAS, null);
    if (guardadas) { this.noticias.set(guardadas); this.cargado.set(true); return; }
    this.http.get<Noticia[]>('data/noticias.json').subscribe({
      next: (datos) => { this.noticias.set(datos); this.guardarNoticias(); this.cargado.set(true); },
      error: () => this.cargado.set(true),
    });
  }

  porId(id: number): Noticia | undefined {
    return this.noticias().find((n) => n.id === id);
  }

  // ---------- Mini CRUD ----------
  crear(datos: Omit<Noticia, 'id' | 'fecha' | 'autor'>): void {
    const lista = this.noticias();
    const id = lista.length ? Math.max(...lista.map((n) => n.id)) + 1 : 1;
    const nueva: Noticia = { id, fecha: new Date().toISOString().slice(0, 10), autor: 'Redacción Noti Zowl', ...datos };
    this.noticias.set([nueva, ...lista]);   // la más reciente primero
    this.guardarNoticias();
  }

  eliminar(id: number): void {
    this.noticias.update((l) => l.filter((n) => n.id !== id));
    this.guardarNoticias();
    if (this.favoritos().includes(id)) this.alternarFavorito(id);  // evita favoritos huérfanos
  }

  // ---------- Favoritos ----------
  esFavorito(id: number): boolean { return this.favoritos().includes(id); }

  /** Agrega o quita; devuelve true si quedó guardada. */
  alternarFavorito(id: number): boolean {
    const ya = this.esFavorito(id);
    this.favoritos.update((f) => (ya ? f.filter((x) => x !== id) : [...f, id]));
    localStorage.setItem(LLAVE_FAVORITOS, JSON.stringify(this.favoritos()));
    return !ya;
  }

  vaciarFavoritos(): void {
    this.favoritos.set([]);
    localStorage.setItem(LLAVE_FAVORITOS, '[]');
  }

  // ---------- Utilidades privadas ----------
  private guardarNoticias(): void {
    localStorage.setItem(LLAVE_NOTICIAS, JSON.stringify(this.noticias()));
  }
  private leer<T>(llave: string, defecto: T): T {
    try { const v = localStorage.getItem(llave); return v ? (JSON.parse(v) as T) : defecto; }
    catch { return defecto; }
  }
}
