import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];
  private cliente: any;
  private cartSubject = new BehaviorSubject<any[]>(this.cart);

  addToCart(product: Product) {
    const existingProduct = this.cart.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.cantidad = (existingProduct.cantidad || 0) + 1;
    } else {
      this.cart.push({ ...product, cantidad: 1 });
    }
    this.cartSubject.next(this.cart); // Emitir cambios
  }

  getCartObservable() {
    return this.cartSubject.asObservable();
  }

  removeItem(product: Product) {
    this.cart = this.cart.filter(p => p.id !== product.id);
  }

  updateQuantity(product: Product, increment: boolean) {
    const existingProduct = this.cart.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.cantidad = (existingProduct.cantidad || 0) + (increment ? 1 : -1);
      if ((existingProduct.cantidad || 0) <= 0) {
        this.removeItem(existingProduct);
      }
    }
  }

  getCart() {
    return this.cart;
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.precio * (item.cantidad || 0), 0);
  }

  setCliente(cliente: any) {
    this.cliente = cliente;
  }

  getCliente() {
    return this.cliente;
  }

  clearCart() {
    this.cart = [];
  }
}
