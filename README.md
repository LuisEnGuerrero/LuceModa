# LuceModa

## Aplicación Web Angular - PWA
- Desarrollada por **LuisEnGuerrero.Co**

### Descripción del Proyecto

**Objetivo principal del proyecto:**
La empresa Rios del Desierto SAS necesita implementar una herramienta para el equipo de SAC que permita consultar la información de un cliente ingresando únicamente su número de documento. Esto tiene como objetivo minimizar los tiempos en las llamadas de soporte y fidelizar a los mejores clientes.

**Descripción general del proyecto:**
1. Aplicación web Angular que gestiona los datos básicos del cliente (Tipo de documento, Número de documento, Nombre, Apellido, Correo, Teléfono), CRUD de productos de tienda de moda y modelo con las compras asociadas a cada cliente. Pensada para el apoyo a caja en las tiendas.
2. La página de inicio presenta un input para ingresar y buscar a los usuarios. Si no existen en el registro, se los crea.
3. Consume una API desarrollada con FastAPI y Flask que consulta por número de documento la información del cliente en una tabla que está en SQLite.
4. El resultado de la consulta muestra en pantalla la información del cliente y tiene la opción de exportarla en formato .csv.
5. Una vez el cliente es encontrado, se procede a generar su orden de compra y se cierra la venta, registrando todo en la base de datos de SQLite mediante petición HTTP a la API del Backend. Se genera una factura para el cliente.
6. Finalmente, un botón genera un reporte en Excel con los datos básicos del cliente y el monto total de las compras del cliente en el último mes, para fidelizar a los clientes que superen un monto de compras de 5’000.000 de pesos COP.

### Arquitectura del Proyecto

**Estructura de carpetas y archivos principales:**

- **index.html**: Archivo principal de la aplicación web.
- **main.ts**: Punto de entrada principal de la aplicación Angular.
- **manifest.webmanifest**: Archivo de configuración para PWA.
- **styles.css**: Archivo de estilos globales.
- **app/**: Carpeta principal de la aplicación Angular que contiene los componentes, servicios, modelos y configuraciones.
  - **components/**: Contiene los componentes reutilizables de la aplicación como navbar, footer, etc.
  - **environments/**: Configuraciones de entorno para desarrollo y producción.
  - **features/**: Contiene los componentes principales que realizan las funcionalidades de la aplicación.
  - **models/**: Define los modelos de datos utilizados en la aplicación.
  - **services/**: Contiene los servicios que manejan la lógica del negocio y las interacciones con la API.
  - **shared/**: Contiene módulos compartidos como Angular Material.
- **assets/**: Carpeta que contiene los recursos estáticos como iconos e imágenes.

```
|   index.html
|   main.ts
|   manifest.webmanifest
|   styles.css
|   
+---app
|   |   app.component.css
|   |   

app.component.html


|   |   app.component.ts
|   |   app.config.ts
|   |   app.routes.ts
|   |   
|   +---components
|   |   +---cart-sidebar
|   |   |       cart-sidebar.component.css
|   |   |       cart-sidebar.component.html
|   |   |       cart-sidebar.component.ts
|   |   |       
|   |   +---dialog
|   |   |       dialog.component.css
|   |   |       dialog.component.html
|   |   |       dialog.component.ts
|   |   |       
|   |   +---footer
|   |   |       footer.component.css
|   |   |       footer.component.html
|   |   |       footer.component.ts
|   |   |       
|   |   +---navbar
|   |   |       navbar.component.css
|   |   |       navbar.component.html
|   |   |       navbar.component.ts
|   |   |       
|   |   +---product-card
|   |   |       product-card.component.css
|   |   |       product-card.component.html
|   |   |       product-card.component.ts
|   |   |       
|   |   +---product-list
|   |   \---shopping-cart
|   |           shopping-cart.component.css
|   |           shopping-cart.component.html
|   |           shopping-cart.component.ts
|   |           
|   +---environments
|   |       environment.prod.ts
|   |       
|   +---features
|   |   +---client
|   |   |       client-form.component.css
|   |   |       client-form.component.html
|   |   |       client-form.component.ts
|   |   |       
|   |   +---home
|   |   |       home.component.css
|   |   |       home.component.html
|   |   |       home.component.ts
|   |   |       
|   |   \---product
|   |           product-form.component.css
|   |           product-form.component.html
|   |           product-form.component.ts
|   |           product-list.component.css
|   |           product-list.component.html
|   |           product-list.component.ts
|   |           
|   +---models
|   |       product.model.ts
|   |       
|   +---services
|   |       api.service.ts
|   |       cart.service.ts
|   |       clients.service.ts
|   |       products.service.ts
|   |       
|   \---shared
|           material-modules.ts
|           
\---assets
    \---icons
            icon-128x128.png
            icon-144x144.png
            icon-152x152.png
            icon-192x192.png
            icon-384x384.png
            icon-512x512.png
            icon-72x72.png
            icon-96x96.png
```

**Descripción de los componentes principales:**

- **Components**: Herramientas que dan forma a la aplicación web.
- **Environments**: Configuraciones para la puesta en marcha del servicio PWA en producción.
- **Features**: Componentes que realizan todas las funcionalidades de la aplicación:
  - **Client**: Gestión del CRUD de los clientes de la empresa.
  - **Home**: Página principal e inicial de la aplicación.
  - **Product**: Componente que gestiona el inventario y CRUD de productos.
- **Services**: Lógica del negocio.
- **Shared**: Gestión del diseño y estilos mediante Angular Material.

### Tecnologías Utilizadas

#### **Dependencias:**
- **Angular**: Framework principal para el desarrollo de la aplicación.
- **Angular Material**: Biblioteca de componentes UI para Angular.
- **jsPDF**: Biblioteca para generar archivos PDF.
- **QRCode**: Biblioteca para generar códigos QR.
- **RxJS**: Biblioteca para programación reactiva.
- **Zone.js**: Biblioteca para manejo de contexto asincrónico en Angular.


- `@angular/animations`: ^18.2.0
- `@angular/cdk`: ^17.0.0
- `@angular/common`: ^18.2.0
- `@angular/compiler`: ^18.2.0
- `@angular/core`: ^18.2.0
- `@angular/forms`: ^18.2.0
- `@angular/material`: ^17.0.0
- `@angular/platform-browser`: ^18.2.0
- `@angular/platform-browser-dynamic`: ^18.2.0
- `@angular/pwa`: ^0.5.3
- `@angular/router`: ^18.2.0
- `jspdf`: ^2.5.2
- `qrcode`: ^1.5.4
- `rxjs`: ~7.8.0
- `tslib`: ^2.3.0
- `zone.js`: ~0.14.10

### **DevDependencies:**
- **Angular CLI:** Herramienta de línea de comandos para Angular.
- **TypeScript:** Lenguaje de programación utilizado para desarrollar la aplicación.
- **Karma:** Herramienta de pruebas para JavaScript.
- **Jasmine:** Framework de pruebas para JavaScript.

- `@angular-devkit/build-angular`: ^18.2.2
- `@angular/cli`: ^18.2.2
- `@angular/compiler-cli`: ^18.2.0
- `@types/jasmine`: ~5.1.0
- `@types/qrcode`: ^1.5.5
- `jasmine-core`: ~5.2.0
- `karma`: ~6.4.0
- `karma-chrome-launcher`: ~3.2.0
- `karma-coverage`: ~2.2.0
- `karma-jasmine`: ~5.1.0
- `karma-jasmine-html-reporter`: ~2.1.0
- `typescript`: ~5.5.2

### Lógica del Proyecto

**Descripción de la lógica principal del proyecto:**
Aplicación desarrollada en Angular con soporte PWA, para la gestión de Caja y Clientes de la empresa LuceModa del consorcio empresarial Rios del Desierto SAS. La aplicación busca hacer una gestión rápida y sencilla de los clientes y poder tener la información clara para fidelizar a los más fieles. Se apoya de la conexión a una API desarrollada con FastAPI y Flask llamada SAC Optimizer, mediante endpoints HTTP.

**Funcionalidades clave:**
- La página de inicio presenta un input para ingresar y buscar a los usuarios. Si no existen en el registro, se los crea.
- Tiene un formulario inicial con los campos: Tipo de documento (NIT, Cédula, Pasaporte), Número de documento, y un botón buscar.
- Consulta por número de documento la información del cliente y muestra en pantalla la información del cliente con opción de exportar el registro en formato .csv.
- Genera una orden de compra y cierra la venta, registrando todo en la base de datos de SQLite mediante petición HTTP a la API del Backend. Genera una factura para el cliente.
- Un botón genera un reporte en Excel con los datos básicos del cliente y el monto total de las compras del cliente en el último mes, para fidelizar a los clientes que superen un monto de compras de 5’000.000 de pesos COP.
- Gestión de productos para tener un registro de ventas.

### Guía de Implementación

**Pasos para configurar el proyecto en un entorno de desarrollo:**
1. Clonar el repositorio:
   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd luce-moda
   ```

2. Instalar las dependencias:
   ```sh
   npm install
   ```

3. Ejecutar el proyecto en modo desarrollo:
   ```sh
   ng serve
   ```

**Pasos para desplegar el proyecto en un entorno de producción:**
1. Compilar el proyecto:
   ```sh
   ng build --configuration production
   ```

2. Subir los archivos compilados a un servidor web o servicio de hosting (por ejemplo, Netlify o Firebase).

3. Configurar el servidor para servir el archivo `index.html` en todas las rutas.


### Dependencias y Paquetes

**Lista de dependencias y paquetes utilizados en el proyecto:**

- **Angular**: Framework principal para el desarrollo de la aplicación.
- **Angular Material**: Biblioteca de componentes UI para Angular.
- **jsPDF**: Biblioteca para generar archivos PDF.
- **QRCode**: Biblioteca para generar códigos QR.
- **RxJS**: Biblioteca para programación reactiva.
- **Zone.js**: Biblioteca para manejo de contexto asincrónico en Angular.
- **Angular CLI**: Herramienta de línea de comandos para Angular.
- **TypeScript**: Lenguaje de programación utilizado para desarrollar la aplicación.
- **Karma**: Herramienta de pruebas para JavaScript.
- **Jasmine**: Framework de pruebas para JavaScript.

### Configuración del Proyecto Angular

**angular.json:**
Este archivo contiene la configuración del proyecto Angular, incluyendo las opciones de compilación, los activos, los estilos y los scripts. Es crucial para definir cómo se construye y sirve la aplicación.

### Configuración de Módulos y Rutas

**app.config.ts:**
Define los proveedores y configuraciones principales de la aplicación, incluyendo la configuración del router y el cliente HTTP.

**app.routes.ts:**
Define las rutas de la aplicación, mapeando las URL a los componentes correspondientes.

### Componente Principal

**app.component.ts:**
El componente principal de la aplicación que actúa como contenedor para otros componentes y define la estructura básica de la aplicación.

**app.component.html:**
La plantilla HTML del componente principal que incluye el navbar, el router outlet y el footer.

### Registro del Service Worker

**main.ts:**
El punto de entrada principal de la aplicación que también maneja el registro del Service Worker para habilitar las capacidades PWA en producción.


# Guía de Construcción del Proyecto LuceModa

Esta guía detalla los pasos necesarios para construir el proyecto LuceModa de forma correcta, incluyendo la configuración de dependencias y la resolución de posibles problemas.

## Requisitos Previos

Asegúrate de tener instalados los siguientes requisitos previos:

- Node.js (versión 14 o superior)
- Angular CLI (versión 12 o superior)

## Pasos para Construir el Proyecto

### 1. Clonar el Repositorio

Clona el repositorio del proyecto desde GitHub:

```sh
git clone https://github.com/LuisEnGuerrero/LuceModa.git
cd LuceModa
```

### 2. Instalar Dependencias

Instala las dependencias del proyecto utilizando npm:

```sh
npm install
```

### 3. Configurar los Archivos de Entorno

Asegúrate de que los archivos de entorno estén presentes en la carpeta:

**src/environments**


#### environment.ts


```typescript
export const environment = {
  production: false,
  // otras configuraciones específicas para desarrollo
};
```

#### environment.prod.ts


```typescript
export const environment = {
  production: true,
  // otras configuraciones específicas para producción
};
```

### 4. Configurar el Service Worker

Asegúrate de que el archivo 

ngsw-config.json

 esté presente en la raíz del proyecto.

#### ngsw-config.json


```json
{
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": [
          "/favicon.ico",
          "/index.html",
          "/*.css",
          "/*.js"
        ]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": [
          "/assets/**",
          "/*.(png|jpg)"
        ]
      }
    }
  ]
}
```

### 5. Instalar `@angular/service-worker`

Instala el paquete `@angular/service-worker` utilizando npm con la opción `--legacy-peer-deps` para resolver conflictos de dependencias:

```sh
npm install @angular/service-worker --save --legacy-peer-deps
```

### 6. Configurar el Registro del Service Worker

Asegúrate de que el `ServiceWorkerModule` esté registrado en tu archivo `main.ts`.

#### main.ts


```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/ngsw-worker.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
}

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }))
  ]
}).catch((err) => console.error(err));
```

### 7. Configurar angular.json


Asegúrate de que 

angular.json

 esté configurado correctamente para permitir dependencias CommonJS y ajustar el presupuesto de tamaño.

#### angular.json


```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "LuceModa": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/luce-moda",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.app.json",
            "assets": [
              "src/favicon.ico",
              "src/assets",
              "src/manifest.webmanifest",
              {
                "glob": "**/*",
                "input": "public",
                "output": "/public"
              }
            ],
            "styles": [
              "src/styles.css",
              "./node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css"
            ],
            "scripts": [],
            "allowedCommonJsDependencies": [
              "core-js",
              "raf",
              "rgbcolor",
              "qrcode"
            ]
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "1.5MB",
                  "maximumError": "2MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kB",
                  "maximumError": "4kB"
                }
              ],
              "outputHashing": "all",
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "serviceWorker": true,
              "ngswConfigPath": "ngsw-config.json"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "LuceModa:build:production"
            },
            "development": {
              "buildTarget": "LuceModa:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n"
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "polyfills": [
              "zone.js",
              "zone.js/testing"
            ],
            "tsConfig": "tsconfig.spec.json",
            "assets": [
              {
                "glob": "**/*",
                "input": "public",
                "output": "/public"
              }
            ],
            "styles": [
              "src/styles.css"
            ],
            "scripts": []
          }
        }
      }
    }
  },
  "cli": {
    "analytics": false
  }
}
```

### 8. Construir el Proyecto

Finalmente, construye el proyecto para producción:

```sh
ng build --configuration production
```

## Notas Adicionales

- Asegúrate de que todas las dependencias estén actualizadas y compatibles con la versión de Angular que estás utilizando.
- Si encuentras problemas de dependencias, puedes utilizar la opción `--legacy-peer-deps` al instalar paquetes con npm.

Con estos pasos, deberías poder construir el proyecto LuceModa de forma correcta y sin problemas. **¡Buena suerte!**

### **[LuisEnGuerrero.Co](https://LuisEnGuerrero.netlify.app)**
--------------


# LuceModa

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
