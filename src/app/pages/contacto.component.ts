import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';

/** Contacto (RF-05): formulario reactivo con validaciones y mensaje de confirmación (solo front-end). */
@Component({
  selector: 'app-contacto',
  imports: [ReactiveFormsModule],
  template: `
  <section class="seccion"><div class="container"><div class="row g-4">
    <div class="col-lg-7">
      <h1 class="h2">Contáctanos</h1>
      <p class="text-muted">Escríbenos y te responderemos lo antes posible. Los campos con * son obligatorios.</p>
      <form [formGroup]="form" (ngSubmit)="enviar()" novalidate>
        <div class="mb-3"><label class="form-label" for="nombre">Nombre completo *</label>
          <input class="form-control" id="nombre" formControlName="nombre" placeholder="Ej. Laura Gómez"
                 [class.campo-error]="invalido('nombre')">
          @if (invalido('nombre')) { <div class="msg-error">El nombre es obligatorio.</div> }</div>
        <div class="mb-3"><label class="form-label" for="correo">Correo electrónico *</label>
          <input class="form-control" id="correo" type="email" formControlName="correo" placeholder="nombre@correo.com"
                 [class.campo-error]="invalido('correo')">
          @if (invalido('correo')) {
            <div class="msg-error">{{ form.controls.correo.hasError('required')
              ? 'El correo es obligatorio.' : 'Ingresa un correo válido (ej. nombre@correo.com).' }}</div> }</div>
        <div class="mb-3"><label class="form-label" for="asunto">Asunto</label>
          <input class="form-control" id="asunto" formControlName="asunto" placeholder="Motivo de tu mensaje"></div>
        <div class="mb-3"><label class="form-label" for="mensaje">Mensaje *</label>
          <textarea class="form-control" id="mensaje" rows="5" formControlName="mensaje"
                    placeholder="Escribe aquí tu mensaje..." [class.campo-error]="invalido('mensaje')"></textarea>
          @if (invalido('mensaje')) { <div class="msg-error">El mensaje es obligatorio.</div> }</div>
        <button class="btn btn-primario" type="submit">Enviar mensaje</button>
        @if (exito()) {
          <div class="msg-exito mt-3" role="status"><strong>Mensaje enviado correctamente</strong><br>
            Gracias por escribirnos, te responderemos pronto.</div>
        }
      </form>
    </div>
    <aside class="col-lg-5"><div class="p-4 rounded" style="background: var(--azul-claro)">
      <h2 class="h5">Información de contacto</h2>
      <p class="mb-1">politecnicograncolombiano&#64;gmail.com</p><p class="mb-1">+57 601 000 0000</p>
      <p class="mb-1">Bogotá, Colombia</p><p class="mb-0">Lun a Vie, 8:00 a. m. a 6:00 p. m.</p>
    </div></aside>
  </div></div></section>`,
})
export class ContactoComponent {
  private fb = inject(FormBuilder);
  exito = signal(false);
  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.pattern(/\S/)]],
    correo: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
    asunto: [''],
    mensaje: ['', [Validators.required, Validators.pattern(/\S/)]],
  });

  /** Un campo se marca inválido solo después de tocarlo o de intentar enviar. */
  invalido(campo: 'nombre' | 'correo' | 'mensaje'): boolean {
    const c: AbstractControl = this.form.controls[campo];
    return c.invalid && (c.touched || c.dirty);
  }

  enviar() {
    this.exito.set(false);
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.exito.set(true);          // sin servidor: solo se confirma en pantalla
    this.form.reset();
  }
}
