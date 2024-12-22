import { Component, OnInit } from '@angular/core';
import { MaterialModules } from '../../shared/material-modules';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ...MaterialModules,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [0, [Validators.required, Validators.min(1)]],
      talla: [''],
      color: [''],
      imagen_url: [''],
    });
  }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (productId) {
      this.isEdit = true;
      this.productsService.getProducts().subscribe({
        next: (products) => {
          const product = products.find((p: any) => p.id === productId);
          if (product) {
            this.productForm.patchValue(product);
          } else {
            console.error('Producto no encontrado');
          }
        },
        error: (err) => console.error('Error al obtener productos para edición', err),
      });
    }
  }
  
  cancel() {
    this.router.navigate(['/products']);
  }
  

  submitForm() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      if (this.isEdit) {
        // Editar producto existente
        this.productsService.updateProduct(this.productForm.value).subscribe({
          next: () => {
            alert('Producto actualizado correctamente.');
            this.router.navigate(['/products']);
          },
          error: (err) => console.error('Error al actualizar producto:', err),
        });
      } else {
        // Crear nuevo producto
        this.productsService.createProduct(productData).subscribe({
          next: () => {
            alert('Producto creado correctamente.');
            this.router.navigate(['/products']);
          },
          error: (err) => console.error('Error al crear producto:', err),
        });
      }
    }
  }
  
}
