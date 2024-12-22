export interface Product {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    talla?: string;
    color?: string;
    imagen_url?: string;
    cantidad?: number; // Opcional para el carrito
  }
  