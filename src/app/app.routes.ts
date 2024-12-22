import { Routes } from '@angular/router';
import { ProductListComponent } from './features/product/product-list.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductFormComponent } from './features/product/product-form.component';
import { HomeComponent } from './features/home/home.component';
import { ClientFormComponent } from './features/client/client-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent,  },
  { path: 'clients/new', component: ClientFormComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent }, // Ruta para agregar productos
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/:id/edit', component: ProductFormComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'},
];
