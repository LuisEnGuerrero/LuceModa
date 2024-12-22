import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private path = '/productos'; // Ruta relativa específica del módulo

  constructor(private api: ApiService) {}

  getProducts(): Observable<any[]> {
    return this.api.getWithRedirect<any[]>(this.path);
  }

  createProduct(product: any): Observable<any> {
    return this.api.post<any>(this.path, product);
  }

  updateProduct(product: any): Observable<any> {
    return this.api.put<any>(`${this.path}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.api.delete<void>(`${this.path}/${id}`);
  }
}
