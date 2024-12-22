import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ClientsService } from '../../services/clients.service';
import { MaterialModules } from '../../shared/material-modules';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    ...MaterialModules,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent implements OnInit {
  [x: string]: any;

  clientForm: FormGroup;
  documentTypes: any[] = []; // Agrega esta propiedad

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private clientsService: ClientsService,
    private route: ActivatedRoute,
  ) {
    this.clientForm = this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Obtener tipos de documentos al iniciar
    this.clientsService.getDocumentTypes().subscribe({
      next: (types) => {
        this.documentTypes = types;
      },
      error: (err) => console.error('Error al cargar tipos de documentos:', err)
    });

    // Rellenar el formulario si vienen datos desde la búsqueda
    const tipoDocumento = this.route.snapshot.queryParamMap.get('tipoDocumento');
    const numeroDocumento = this.route.snapshot.queryParamMap.get('numeroDocumento');
    if (tipoDocumento && numeroDocumento) {
      this.clientForm.patchValue({ tipoDocumento, numeroDocumento });
    }
  }

  submitForm() {
    const formData = this.clientForm.value;

    // Transforma los datos para coincidir con lo que espera el backend
    const payload = {
      numero_documento: formData.numeroDocumento,
      tipo_documento_id: formData.tipoDocumento.id,
      nombre: formData.nombre,
      apellido: formData.apellido,
      correo: formData.correo,
      telefono: formData.telefono,
      compras: [], // Si compras no es relevante al inicio, envíalo vacío
      historial: [] // Historial también vacío al inicio
    };
    console.log('tipoDocumento:', formData.tipoDocumento);
    console.log('Payload:', payload);
    this.clientsService.addClient(payload).subscribe({
      next: () => {
        alert('Cliente registrado con éxito.');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error al registrar cliente:', err);
        alert('Hubo un problema al registrar el cliente. Por favor, inténtalo de nuevo.');
      }
    });
  }


  cancel(): void {
    this.router.navigate(['/home']); // Define esta función para evitar el error
  }

}

