import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoticiasService } from '../services/noticias.service';
import { CATEGORIAS, Noticia } from '../models/noticia';

/** Administración (RF-06): mini CRUD para crear y eliminar noticias. */
@Component({
  selector: 'app-administrar',
  imports: [ReactiveFormsModule],
  template: `
  <section class="seccion"><div class="container">
    <h1 class="h2 mb-4">Gestión de noticias</h1>
    <div class="row g-4">
      <div class="col-lg-5">
        <h2 class="h5">Crear noticia</h2>
        <form [formGroup]="form" (ngSubmit)="guardar()" novalidate>
          <div class="mb-2"><label class="form-label" for="titulo">Título *</label>
            <input class="form-control" id="titulo" formControlName="titulo" placeholder="Título de la noticia"
                   [class.campo-error]="malo('titulo')">
            @if (malo('titulo')) { <div class="msg-error">Este campo es obligatorio.</div> }</div>
          <div class="mb-2"><label class="form-label" for="categoria">Categoría *</label>
            <select class="form-select" id="categoria" formControlName="categoria" [class.campo-error]="malo('categoria')">
              <option value="">Seleccionar categoría</option>
              @for (c of categorias; track c) { <option [value]="c">{{ c }}</option> }
            </select>
            @if (malo('categoria')) { <div class="msg-error">Este campo es obligatorio.</div> }</div>
          <div class="mb-2"><label class="form-label" for="imagen">URL de la imagen</label>
            <input class="form-control" id="imagen" formControlName="imagen" placeholder="https://... (opcional)"></div>
          <div class="mb-2"><label class="form-label" for="descripcion">Descripción breve *</label>
            <textarea class="form-control" id="descripcion" rows="2" formControlName="descripcion"
                      [class.campo-error]="malo('descripcion')"></textarea>
            @if (malo('descripcion')) { <div class="msg-error">Este campo es obligatorio.</div> }</div>
          <div class="mb-3"><label class="form-label" for="contenido">Contenido *</label>
            <textarea class="form-control" id="contenido" rows="4" formControlName="contenido"
                      [class.campo-error]="malo('contenido')"></textarea>
            @if (malo('contenido')) { <div class="msg-error">Este campo es obligatorio.</div> }</div>
          <button class="btn btn-primario" type="submit">Guardar noticia</button>
          @if (exito()) { <div class="msg-exito mt-3" role="status">Noticia creada correctamente.</div> }
        </form>
      </div>
      <div class="col-lg-7">
        <h2 class="h5">Noticias existentes</h2>
        <div class="table-responsive"><table class="table align-middle">
          <thead><tr><th>ID</th><th>Título</th><th>Categoría</th><th>Acción</th></tr></thead>
          <tbody>
            @for (n of datos.noticias(); track n.id) {
              <tr><td>{{ n.id.toString().padStart(2, '0') }}</td><td>{{ n.titulo }}</td><td>{{ n.categoria }}</td>
                <td><button class="btn btn-sm btn-eliminar" (click)="eliminar(n)">Eliminar</button></td></tr>
            }
          </tbody></table></div>
        <small class="text-muted">Mostrando {{ datos.noticias().length }} de {{ datos.noticias().length }} noticias</small>
      </div>
    </div>
  </div></section>`,
})
export class AdministrarComponent {
  datos = inject(NoticiasService);
  private fb = inject(FormBuilder);
  categorias = CATEGORIAS;
  exito = signal(false);

  form = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.pattern(/\S/)]],
    categoria: ['', Validators.required],
    imagen: [''],
    descripcion: ['', [Validators.required, Validators.pattern(/\S/)]],
    contenido: ['', [Validators.required, Validators.pattern(/\S/)]],
  });

  malo(campo: 'titulo' | 'categoria' | 'descripcion' | 'contenido'): boolean {
    const c = this.form.controls[campo];
    return c.invalid && c.touched;
  }

  guardar() {
    this.exito.set(false);
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.getRawValue();
    const categoria = v.categoria as Noticia['categoria'];
    this.datos.crear({
      titulo: v.titulo.trim(), categoria, descripcion: v.descripcion.trim(), contenido: v.contenido.trim(),
      imagen: v.imagen.trim() || `img/${categoria.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()}.svg`,
    });
    this.form.reset();
    this.exito.set(true);
  }

  /** Confirmación previa para prevenir errores (heurística de Nielsen). */
  eliminar(n: Noticia) {
    if (confirm('¿Seguro que deseas eliminar esta noticia? Esta acción no se puede deshacer.')) this.datos.eliminar(n.id);
  }
}
