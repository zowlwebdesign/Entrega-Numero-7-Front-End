/** Modelo de datos de una noticia (coincide con data/noticias.json). */
export interface Noticia {
  id: number;
  titulo: string;
  categoria: 'Educación' | 'Tecnología' | 'Turismo' | 'Comercial';
  descripcion: string;
  contenido: string;
  imagen: string;
  fecha: string;   // AAAA-MM-DD
  autor: string;
}

export const CATEGORIAS = ['Educación', 'Tecnología', 'Turismo', 'Comercial'] as const;
