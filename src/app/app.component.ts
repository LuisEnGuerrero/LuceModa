import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModules } from './shared/material-modules'; // Importa los módulos compartidos
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from "./components/footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ...MaterialModules,
    NavbarComponent,
    FooterComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LuceModa';
}
