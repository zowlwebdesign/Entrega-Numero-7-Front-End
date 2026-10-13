/** "Educación" -> "educacion": se usa para la clase CSS de la etiqueta y la ilustración SVG de respaldo. */
export function slugCategoria(categoria: string): string {
  return categoria.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

/** Si una imagen falla al cargar, se reemplaza por la ilustración de su categoría (una sola vez). */
export function imagenRespaldo(evento: Event, categoria: string): void {
  const img = evento.target as HTMLImageElement;
  if (img.dataset['respaldo']) return;
  img.dataset['respaldo'] = '1';
  img.src = `img/${slugCategoria(categoria)}.svg`;
}
