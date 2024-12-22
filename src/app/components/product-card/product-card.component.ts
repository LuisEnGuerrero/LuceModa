import { Component, Input } from '@angular/core';
import { MaterialModules } from '../../shared/material-modules'; // Importa los módulos compartidos
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    ...MaterialModules, // Importa los módulos de Angular Material que están en material-modules.ts
    CommonModule,
    RouterModule,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
    console.log(`Producto agregado: ${this.product.nombre}`); // Verifica la acción
  }
  
}
