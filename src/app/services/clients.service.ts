import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private path = ''; // Ruta relativa específica del módulo

  constructor(private api: ApiService, private cartService: CartService) {}

  getDocumentTypes(): Observable<any[]> {
    const url = `${this.path}/tipo_documento`;
    return this.api.get<any[]>(url);
  }

  setCliente(cliente: any) {
    this.cartService.setCliente(cliente); // Delegar al CartService
  }

  getClient(tipoDocumento: string, numeroDocumento: string): Observable<any> {
    const url = `${this.path}/cliente?tipo_documento=${tipoDocumento}&numero_documento=${numeroDocumento}`;
    return this.api.get<any>(url);
  }

  exportClients(): Observable<Blob> {
    const url = `${this.path}/exportar`;
    return this.api.get<Blob>(url, { responseType: 'blob' });
  }

  addClient(clientData: any): Observable<any> {
    const url = `${this.path}/clientes`;
    return this.api.post<any>(url, clientData);
  }
  

  generateReport(): Observable<Blob> {
    const url = `${this.path}/reporte_fidelizacion`;
    return this.api.get<Blob>(url, { responseType: 'blob' as 'json' });
  }

  getEligibleClientsCount(): Observable<number> {
    const url = `${this.path}/reporte_fidelizacion/count`;
    return this.api.get<number>(url);
  }
  
}
