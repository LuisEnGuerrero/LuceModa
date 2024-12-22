import { Component } from '@angular/core';
import { MaterialModules } from '../../shared/material-modules'; // Importa los módulos compartidos


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    ...MaterialModules, // Importa los módulos de Angular Material que están en material-modules.ts
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
