import { Component, OnInit } from '@angular/core';
import { MaterialModules } from '../../shared/material-modules';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ...MaterialModules, // Módulos de Angular Material
    CommonModule,
    ProductCardComponent,
    MatPaginatorModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  paginatedProducts: any[] = [];
  pageSize: number = 6; // Tamaño por página
  currentPage: number = 0;

  constructor(
    private productsService: ProductsService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.setResponsivePageSize();
    this.fetchProducts();
  }

  setResponsivePageSize() {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe((result) => {
      this.pageSize = result.matches ? 2 : 6; // 2 productos para pantallas pequeñas, 6 para grandes
    });
  }

  fetchProducts() {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.updatePaginatedProducts();
      },
      error: (error) => {
        console.error('Error fetching products: ', error);
      },
    });
  }

  updatePaginatedProducts() {
    const startIndex = this.currentPage * this.pageSize;
    this.paginatedProducts = this.products.slice(startIndex, startIndex + this.pageSize);
  }

  handlePageEvent(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedProducts();
  }

  confirmDeleteProduct(productId: number) {
    const confirmed = window.confirm('¿Está seguro de que desea eliminar este producto? Esta acción no se puede deshacer!.');
    if (confirmed) {
      this.deleteProduct(productId);
    }
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter((product) => product.id !== id);
        this.updatePaginatedProducts();
      },
      error: (err) => console.error('Error deleting product', err),
    });
  }

  navigateToAddProduct() {
    this.router.navigate(['/products/new']);
  }
}
