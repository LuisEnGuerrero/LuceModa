import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private baseUrl = 'http://127.0.0.1:8000'; // URL base centralizada

    constructor(private http: HttpClient) { }

    /**
     * Construye la URL completa basada en la ruta relativa.
     * @param path - Ruta relativa del endpoint.
     */
    private buildUrl(path: string): string {
        return `${this.baseUrl}${path}`;
    }

    /**
     * Realiza una solicitud GET.
     * @param path - Ruta relativa del endpoint.
     * @param options - Opciones adicionales para la solicitud.
     */
    get<T>(path: string, options?: { params?: any; headers?: any; responseType?: 'json' | 'blob' }): Observable<T> {
        const requestOptions: any = {
            ...options,
            observe: 'body', // Garantiza que solo se devuelva el cuerpo
            responseType: options?.responseType || 'json',
        };

        return this.http.get(this.buildUrl(path), requestOptions) as Observable<T>; // Casting explícito
    }

    /**
     * Realiza una solicitud POST.
     * @param path - Ruta relativa del endpoint.
     * @param body - Cuerpo de la solicitud.
     */
    post<T>(path: string, body: any): Observable<T> {
        return this.http.post<T>(this.buildUrl(path), body);
    }

    /**
     * Realiza una solicitud PUT.
     * @param path - Ruta relativa del endpoint.
     * @param body - Cuerpo de la solicitud.
     */
    put<T>(path: string, body: any): Observable<T> {
        return this.http.put<T>(this.buildUrl(path), body);
    }

    /**
     * Realiza una solicitud DELETE.
     * @param path - Ruta relativa del endpoint.
     */
    delete<T>(path: string): Observable<T> {
        return this.http.delete<T>(this.buildUrl(path));
    }

    /**
     * Maneja redirecciones en solicitudes GET.
     * @param path - Ruta relativa del endpoint.
     */
    getWithRedirect<T>(path: string): Observable<T> {
        return this.http.get<T>(this.buildUrl(path), { observe: 'response' }).pipe(
            switchMap((response: HttpResponse<T>) => {
                if (response.status === 307) {
                    const redirectUrl = response.headers.get('Location');
                    if (redirectUrl) {
                        return this.http.get<T>(redirectUrl);
                    } else {
                        return throwError(() => new Error('Redirect URL is null'));
                    }
                }
                return response.body
                    ? [response.body as T]
                    : throwError(() => new Error('No body in response'));
            })
        );
    }
}
