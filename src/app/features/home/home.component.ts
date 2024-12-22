import { Component, OnInit } from '@angular/core';
import { MaterialModules } from '../../shared/material-modules'; // Importa los módulos compartidos
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MaterialModules,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  documentTypes: any[] = [];

  searchForm: FormGroup;
  cliente: any = null;
  searchPerformed = false;
  clientsToReward = 0;

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
    });

    // Número de clientes elegibles para fidelización (esto debería ser dinámico)
    this.clientsToReward = 3;
  }

  ngOnInit(): void {
    this.clientsService.getDocumentTypes().subscribe({
      next: (types) => {
        this.documentTypes = types;
        console.log('Document types loaded:', this.documentTypes);
      },
      error: (err) => console.error('Error fetching document types:', err),
    });
    // Obtener el número de clientes elegibles para fidelización
    this.getEligibleClientsCount();
  }

  getEligibleClientsCount() {
    this.clientsService.getEligibleClientsCount().subscribe({
      next: (count) => {
        this.clientsToReward = count;
      },
      error: (err) => console.error('Error fetching eligible clients count:', err),
    });
  }

  /**
   * Busca un cliente por tipo y número de documento.
   */
  searchClient() {
    const { tipoDocumento, numeroDocumento } = this.searchForm.value;
    this.clientsService.getClient(tipoDocumento, numeroDocumento).subscribe({
      next: (cliente) => {
        this.cliente = cliente;
        this.searchPerformed = true;
      },
      error: () => {
        this.cliente = null;
        this.searchPerformed = true;
      },
    });
  }

  /**
 * Navega a la página de selección de productos.
 */
  selectProducts() {
    if (this.cliente) {
      // Configurar el cliente en el CartService
      this.clientsService.setCliente(this.cliente);
      console.log('Cliente seleccionado:', this.cliente);

      // Navegar a la página de productos
      this.router.navigate(['/products']);
    } else {
      alert('Por favor, selecciona un cliente antes de continuar.');
    }
  }

  /**
   * Exporta los datos de los clientes en formato CSV.
   */
  exportClients() {
    this.clientsService.exportClients().subscribe({
      next: (blob) => this.downloadFile(blob, 'clientes.csv'),
      error: (err) => console.error('Error exporting clients:', err),
    });
  }

  /**
   * Genera un reporte de fidelización en formato Excel.
   */
  generateReport() {
    this.clientsService.generateReport().subscribe({
      next: (response) => {
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporte_fidelizacion.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        alert('Reporte generado y descargado con éxito.');
      },
      error: (err) => {
        console.error('Error generating report:', err);
        alert('Ocurrió un error al generar el reporte.');
      },
    });
  }

  navigateToNewClient(): void {
    const { tipoDocumento, numeroDocumento } = this.searchForm.value;
    this.router.navigate(['/clients/new'], {
      queryParams: { tipoDocumento, numeroDocumento },
    });
  }


  /**
   * Descarga un archivo generado en el backend.
   * @param blob - Archivo Blob recibido de la API.
   * @param filename - Nombre del archivo a descargar.
   */
  private downloadFile(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
