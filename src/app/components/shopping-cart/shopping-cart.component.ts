import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { MaterialModules } from '../../shared/material-modules';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    ...MaterialModules, // Importa los módulos de Angular Material que están en material-modules.ts
    CommonModule,
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cart: Product[] = [];
  total = 0;
  cliente: any;

  constructor(
    private cartService: CartService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
    console.log('Cart en ShoppingCartComponent:', this.cart); // Verifica el estado del carrito al iniciar
    this.total = this.cartService.getTotal();
    this.cliente = this.cartService.getCliente();
  }

  updateQuantity(item: Product, increment: boolean) {
    this.cartService.updateQuantity(item, increment);
    this.total = this.cartService.getTotal();
  }

  removeItem(item: Product) {
    this.cartService.removeItem(item);
    this.total = this.cartService.getTotal();
  }

  checkout() {
    if (!this.cliente) {
      alert('No se ha seleccionado un cliente.');
      return;
    }
    const factura = {
      cliente: this.cliente,
      productos: this.cart,
      total: this.total,
      url: `http://localhost:4200/receipt/${this.cliente.numero_documento}`
    };
  
    this.apiService.post('/ventas', factura).subscribe({
      next: () => {
        this.generatePDF(factura);
        alert('Compra realizada con éxito.');
        this.cartService.clearCart();
        this.router.navigate(['/products']);
      },
      error: (err) => console.error('Error al procesar la compra:', err)
    });
  }

  async generatePDF(factura: any) {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [80, 200] // Ancho de 80mm y alto de 200mm (ajusta según tus necesidades)  
    });
  
    doc.setFontSize(22);
    doc.text('LuceModa', 10, 10);
  
    doc.setFontSize(16);
    doc.text('Factura de Compra', 10, 10);
  
    doc.line(20, 20, 60, 20);

    doc.setFontSize(12);
    doc.text(`Cliente: ${factura.cliente.nombre} ${factura.cliente.apellido}`, 10, 20);
    doc.text(`Número de Documento: ${factura.cliente.numero_documento}`, 10, 30);
  
    doc.line(20, 20, 60, 20);

    let y = 40;
    factura.productos.forEach((producto: any, index: number) => {
      doc.text(`${index + 1}. ${producto.nombre} - ${producto.cantidad} x ${producto.precio}`, 10, y);
      y += 10;
    });
  
    doc.line(20, 20, 60, 20);

    doc.text(`Total: ${factura.total}`, 10, y + 10);
  
    doc.line(20, 20, 60, 20);

    const qrCodeUrl = await QRCode.toDataURL(factura.url);
    doc.addImage(qrCodeUrl, 'PNG', 150, 10, 40, 40);
  
    doc.save('factura.pdf');
  }
}
