import { Component, OnInit } from '@angular/core';
import { MaterialModules } from '../../shared/material-modules'; // Importa los módulos compartidos
import { RouterModule } from '@angular/router'; // Importa RouterModule para habilitar routerLink
import { CartService } from '../../services/cart.service'; // Importa el servicio CartService
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar directivas de Angular comunes

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ...MaterialModules, // Importa los módulos de Angular Material que están en material-modules.ts
    RouterModule, // Importa RouterModule para habilitar routerLink
    CommonModule, // Importa CommonModule para usar directivas de Angular comunes
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  cartCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cartCount = cart.reduce((total, item) => total + item.cantidad, 0);
    });
  }
  
}
