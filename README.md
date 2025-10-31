# Sistema de Gestión de Facturas - Invoice Search

![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.9-38bdf8?logo=tailwind-css)


https://github.com/user-attachments/assets/735c8085-4131-44d0-9d9d-7374b6e7ca0c



## Descripción del Proyecto

Sistema moderno de gestión y consulta de facturas construido con **Next.js 16**, **React 19** y **TypeScript**. La aplicación permite a los usuarios consultar sus facturas de servicios, filtrarlas por múltiples criterios y simular pagos en línea. Incluye autenticación JWT, soporte multiidioma (ES, EN, FR, DE), modo oscuro/claro, y una interfaz responsiva con animaciones fluidas.

## Tabla de Contenidos

- [Stack Tecnológico](#stack-tecnológico)
- [Características Principales](#características-principales)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Arquitectura de Carpetas](#arquitectura-de-carpetas)
- [Sistema de Providers](#sistema-de-providers)
- [Rutas y API Backend](#rutas-y-api-backend)
- [Componentes Principales](#componentes-principales)
- [Instalación y Configuración](#instalación-y-configuración)
- [Credenciales de Prueba](#credenciales-de-prueba)
- [Flujo de la Aplicación](#flujo-de-la-aplicación)
- [Mapa de Archivos](#mapa-de-archivos)

---

## Stack Tecnológico

### Frontend
- **Framework:** Next.js 16.0.1 (App Router)
- **Librería UI:** React 19.2.0
- **Lenguaje:** TypeScript 5+
- **Estilos:**
  - Tailwind CSS 4.1.9
  - PostCSS 8.5
  - Tailwind Merge & Animate
- **Manejo de Formularios:** React Hook Form 7.60.0
- **Componentes UI:** Shadcn/ui (Radix UI Primitives)
- **Iconos:** Lucide React 0.454.0
- **Notificaciones:** Sonner 1.7.4
- **Fechas:** date-fns 4.1.0

### Backend
- **Server:** Next.js API Routes
- **Autenticación:** JWT (jsonwebtoken 9.0.2 + jose 6.1.0)
- **Middleware:** Next.js Middleware con protección de rutas
- **Datos:** Mock data en memoria (desarrollo)

### Herramientas
- **HTTP Client:** Axios 1.13.1
- **Validación:** Zod 3.25.76
- **Cookies:** js-cookie 3.0.5
- **Theme Management:** next-themes 0.4.6
- **Analytics:** Vercel Analytics 1.3.1

---

## Características Principales

### Funcionalidades Implementadas

✅ **Autenticación JWT**
- Login con Customer ID
- Protección de rutas mediante middleware
- Tokens persistentes en cookies (24h de duración)

✅ **Gestión de Facturas**
- Consulta de todas las facturas del usuario
- Visualización en modo tarjetas o tabla
- Estados: Pendiente, Vencida, Pagada
- Simulación de pagos (actualización en tiempo real)

✅ **Búsqueda y Filtros Avanzados**
- Búsqueda por servicio, periodo, estado y monto
- Panel de filtros con:
  - Filtro por estado (Todos/Pendiente/Vencido/Pagado)
  - Rango de montos (mínimo y máximo)
  - Rango de fechas (inicio y fin)

✅ **Paginación**
- Configuración de filas por página (6, 12, 24, 48)
- Navegación entre páginas
- Información de registros mostrados

✅ **Internacionalización (i18n)**
- 4 idiomas soportados: Español, Inglés, Francés, Alemán
- Selector de idioma en header
- Traducciones completas de toda la UI

✅ **Temas**
- Modo claro y oscuro
- Toggle en header
- Persistencia en cookies

✅ **Diseño Responsivo**
- Optimizado para móviles, tablets y desktop
- Animaciones adaptativas según tamaño de pantalla
- Vista adaptativa (tarjetas en móvil, tabla en desktop)

✅ **Animaciones UX**
- Animaciones de entrada (primera visita)
- Transiciones suaves en búsquedas y filtros
- Animaciones escalonadas en resultados
- LocalStorage para controlar flujo de animaciones

---

## Estructura del Proyecto

### Separación Backend/Frontend

El proyecto utiliza **route groups** de Next.js para organizar el código:

```
app/
├── (backend)/      # Rutas API y lógica del servidor
└── (frontend)/     # Páginas y componentes de UI
```

Esta separación proporciona:
- **Claridad:** Código del servidor separado del cliente
- **Escalabilidad:** Fácil localización de archivos
- **Mantenibilidad:** Contexto claro al editar código

---

## Arquitectura de Carpetas

```
esapp-invoice-manager/
│
├── app/
│   ├── (backend)/                           # 🔒 Backend - Lógica del Servidor
│   │   ├── api/
│   │   │   ├── invoice/
│   │   │   │   ├── route.ts                 # GET /api/invoice
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts             # POST /api/invoice/[id]
│   │   │   ├── login/
│   │   │   │   └── route.ts                 # POST /api/login
│   │   │   └── logout/
│   │   │       └── route.ts                 # POST /api/logout
│   │   ├── lib/
│   │   │   └── jwt.ts                       # Utilidades JWT
│   │   └── mocks/
│   │       ├── MockCustomers.ts             # Datos de usuarios
│   │       └── MockInvoices.ts              # Datos de facturas
│   │
│   ├── (frontend)/                          # 🎨 Frontend - UI y Páginas
│   │   ├── (page)/
│   │   │   ├── page.tsx                     # Página principal
│   │   │   ├── translations.ts              # Traducciones (134 keys)
│   │   │   ├── components/
│   │   │   │   ├── extraHeader.tsx          # Barra de búsqueda animada
│   │   │   │   ├── table.tsx                # Tabla/Cards con paginación
│   │   │   │   └── modalPayment.tsx         # Modal de pago
│   │   │   └── contexts/
│   │   │       └── InvoiceContext.tsx       # Estado de facturas
│   │   ├── login/
│   │   │   ├── page.tsx                     # Página de login
│   │   │   ├── components/
│   │   │   │   ├── form.tsx                 # Formulario de login
│   │   │   │   └── translations.ts          # Traducciones login
│   │   │   └── lib/
│   │   │       └── proxyAxios.ts            # Instancia Axios
│   │   ├── layout.tsx                       # Layout raíz con providers
│   │   └── providers.tsx                    # Composición de providers
│   │
│   ├── globals.css                          # Estilos globales
│   └── favicon.ico
│
├── components/                              # 🧩 Componentes Compartidos
│   ├── header.tsx                           # Header con nav y toggle
│   ├── theme-toggle.tsx                     # Toggle de tema
│   ├── language-selector.tsx                # Selector de idioma
│   ├── invoice-card.tsx                     # Card de factura
│   ├── invoice-table.tsx                    # Tabla de facturas
│   ├── filters-panel.tsx                    # Panel de filtros
│   ├── theme-provider.tsx                   # Provider de tema
│   └── ui/                                  # Librería Shadcn/ui (40+ componentes)
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── table.tsx
│       └── ... (y más)
│
├── providers/                               # 🔄 Context Providers Globales
│   ├── AuthContext.tsx                      # Contexto de autenticación
│   └── LanguageContext.tsx                  # Contexto de idioma
│
├── hooks/                                   # 🎣 Custom Hooks
│   ├── use-mobile.ts                        # Detección de móvil
│   └── use-toast.ts                         # Hook de notificaciones
│
├── lib/                                     # 🛠️ Utilidades
│   ├── cookies.ts                           # Manejo de cookies (server)
│   └── utils.ts                             # Utilidades (cn function)
│
├── public/                                  # 📁 Recursos estáticos
│
├── resources/                               # 📦 Recursos del proyecto
│   └── DEMO.mp4                             # Video demo
│
├── middleware.ts                            # 🛡️ Middleware de autenticación
├── package.json                             # Dependencias y scripts
├── tsconfig.json                            # Configuración TypeScript
└── components.json                          # Configuración Shadcn/ui
```

---

## Sistema de Providers

La aplicación utiliza el **patrón de Context API** de React para gestionar el estado global. Los providers están organizados jerárquicamente:

### Jerarquía de Providers

```tsx
// app/(frontend)/layout.tsx
<html>
  <body>
    <Providers>                              # Composición de providers
      <AuthProvider>                         # 🔐 Autenticación
        <LanguageProvider>                   # 🌍 Idioma
          <ThemeProvider>                    # 🎨 Tema
            <Header />
            <InvoiceProvider>                # 📄 Estado de facturas (página específica)
              {children}
            </InvoiceProvider>
          </ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
    </Providers>
  </body>
</html>
```

### 1. AuthContext (`providers/AuthContext.tsx`)

**Propósito:** Gestión de autenticación y estado del usuario

**Estado Gestionado:**
```typescript
interface AuthContextType {
  user: User | null                          // Usuario autenticado
  token: string | null                       // JWT token
  login: (customerId: string) => Promise<void>
  logout: () => void
  loading: boolean                           // Estado de carga
}
```

**Características:**
- Carga automática del token al iniciar la app
- Almacenamiento de token en cookies (HttpOnly en producción)
- Llamadas API a `/api/login` y `/api/logout`
- Hook personalizado: `useAuth()`

**Uso:**
```tsx
const { user, token, login, logout, loading } = useAuth()
```

---

### 2. LanguageContext (`providers/LanguageContext.tsx`)

**Propósito:** Gestión del idioma de la aplicación

**Estado Gestionado:**
```typescript
interface LanguageContextType {
  language: Language                         // 'es' | 'en' | 'fr' | 'de'
  setLanguage: React.Dispatch<React.SetStateAction<Language>>
}
```

**Idiomas Soportados:**
- 🇪🇸 Español (es) - Default
- 🇺🇸 Inglés (en)
- 🇫🇷 Francés (fr)
- 🇩🇪 Alemán (de)

**Hook:** `useLanguageContext()`

**Archivos de Traducción:**
- `app/(frontend)/(page)/translations.ts` - 134 claves
- `app/(frontend)/login/components/translations.ts` - 12 claves

---

### 3. InvoiceContext (`app/(frontend)/(page)/contexts/InvoiceContext.tsx`)

**Propósito:** Gestión del estado de facturas, búsqueda y filtros

**Estado Gestionado:**
```typescript
interface InvoiceContextType {
  searchQuery: string                        // Query de búsqueda
  setSearchQuery: (query: string) => void
  searchBarMovingUp: boolean                 // Estado de animación
  setSearchBarMovingUp: (moving: boolean) => void
  showResults: boolean                       // Mostrar resultados
  setShowResults: (show: boolean) => void
  isFirstSearch: boolean                     // Primera búsqueda
  setIsFirstSearch: (first: boolean) => void
  currentPage: number                        // Página actual
  setCurrentPage: (page: number) => void
  invoices: Invoice[]                        // Facturas filtradas
  setInvoices: (invoices: Invoice[]) => void
  mockInvoices: Invoice[]                    // Facturas originales
}
```

**Características:**
- Fetch automático de facturas al montar componente
- Gestión de estados de animación
- Control de paginación
- Separación entre datos originales y filtrados

**Hook:** `useInvoice()`

**Flujo de Datos:**
```
API (/api/invoice)
    ↓
useEffect (fetch on mount)
    ↓
setMockInvoices (datos originales)
    ↓
Filter/Search Logic
    ↓
setInvoices (datos filtrados)
    ↓
Components (Table/Cards)
```

---

## Rutas y API Backend

### Modelo de Datos

#### Invoice
```typescript
interface Invoice {
  id: string                                 // ID único
  invoiceNumber: string                      // Número de factura
  service: string                            // Nombre del servicio
  amount: number                             // Monto a pagar
  period: string                             // Periodo (formato: YYYY-MM-DD)
  status: "pending" | "overdue" | "paid"     // Estado
}
```

#### User (Customer)
```typescript
interface User {
  customerId: string                         // ID del cliente
  name: string                               // Nombre
  email: string                              // Correo
}
```

### Datos Mock

**Usuarios de Prueba** (`app/(backend)/mocks/MockCustomers.ts`)
```typescript
[
  { customerId: "123", name: "Albert", email: "albert@example.com" },
  { customerId: "456", name: "Bianca", email: "bianca@example.com" }
]
```

**Facturas de Ejemplo** (`app/(backend)/mocks/MockInvoices.ts`)
- 8 facturas con diferentes estados
- Servicios: Electropaz, TIGO, Aguas del Illimani, etc.
- Montos variados: $1,250 - $5,800

---

### Endpoints API

#### 🔓 POST `/api/login`

**Archivo:** `app/(backend)/api/login/route.ts`

**Descripción:** Autenticar usuario y generar JWT token

**Request Body:**
```json
{
  "customerId": "123"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "customerId": "123",
    "name": "Albert"
  }
}
```

**Errores:**
- `400` - "CUSTOMER_REQUIRED" (falta customerId)
- `401` - "CUSTOMER_NOT_FOUND" (usuario no existe)
- `500` - "ERROR_500" (error del servidor)

**Comportamiento:**
- Busca usuario en MockCustomers
- Genera JWT con expiración de 24h
- Almacena token en cookie
- Retorna token y datos del usuario

---

#### 🔓 POST `/api/logout`

**Archivo:** `app/(backend)/api/logout/route.ts`

**Descripción:** Cerrar sesión del usuario

**Response (200 OK):**
```json
{
  "message": "Logout successful"
}
```

**Comportamiento:**
- Limpia cookie de token (maxAge: 0)
- Invalida sesión del cliente

---

#### 🔒 GET `/api/invoice`

**Archivo:** `app/(backend)/api/invoice/route.ts`

**Descripción:** Obtener todas las facturas

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "dataset": [
    {
      "id": "1",
      "invoiceNumber": "INV-2025-001",
      "service": "Electropaz S.A.",
      "amount": 1250.0,
      "period": "2025-11-15",
      "status": "pending"
    },
    ...
  ]
}
```

**Comportamiento:**
- Retorna todas las facturas de MockInvoices
- Requiere autenticación (protegido por middleware)

---

#### 🔒 POST `/api/invoice/[id]`

**Archivo:** `app/(backend)/api/invoice/[id]/route.ts`

**Descripción:** Procesar pago de una factura

**Headers:**
```
Authorization: Bearer <token>
```

**Params:**
- `id`: ID de la factura

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Pago procesado exitosamente",
  "invoice": {
    "id": "1",
    "invoiceNumber": "INV-2025-001",
    "service": "Electropaz S.A.",
    "amount": 1250.0,
    "period": "2025-11-15",
    "status": "paid"
  }
}
```

**Errores:**
- `404` - "Factura no encontrada"
- `400` - "Esta factura ya ha sido pagada"
- `500` - "Error interno del servidor"

**Comportamiento:**
1. Busca factura en MockInvoices
2. Valida que no esté pagada
3. Simula delay de 1 segundo
4. Actualiza estado a "paid"
5. Retorna factura actualizada

---

### Middleware de Autenticación

**Archivo:** `middleware.ts`

**Propósito:** Proteger rutas y validar JWT

**Rutas Protegidas:** Todas excepto:
- `/_next/*` (archivos de Next.js)
- `/_static/*` (archivos estáticos)
- `/login` (página de login)
- `/api/login` (endpoint de login)
- `*.ico` (favicons)

**Flujo:**
```
1. Request → Middleware
2. Extrae token de cookies
3. ¿Token existe?
   └─ No → Redirect a /login?redirect=/original-url
   └─ Sí → Verificar con jose.jwtVerify()
       └─ Inválido → Limpia cookie → Redirect a /login
       └─ Válido → Continúa con request
```

**Configuración JWT:**
- **Algoritmo:** HS256 (default)
- **Expiración:** 24 horas
- **Secret:** `process.env.JWT_SECRET` (fallback: "clave-super-secreta")
- **Cookie:** `token` (path: `/`, secure en producción, sameSite: strict)

---

## Componentes Principales

### 🎨 Componentes de Página

#### 1. Página Principal (`app/(frontend)/(page)/page.tsx`)

**Funcionalidad:**
- Contenedor principal de la aplicación
- Consume InvoiceContext para estado
- Renderiza ExtraHeader y Table
- Gestiona loading y error states

**Estructura:**
```tsx
<InvoiceProvider>
  <ExtraHeader />          {/* Búsqueda */}
  <Table />                {/* Resultados */}
</InvoiceProvider>
```

---

#### 2. Página de Login (`app/(frontend)/login/page.tsx`)

**Funcionalidad:**
- Formulario de autenticación
- Validación con react-hook-form
- Redirección post-login
- Mensajes de error multiidioma

**Ubicación:** `/login`

---

### 🧩 Componentes Compartidos

#### Header (`components/header.tsx`)

**Características:**
- Logo de la aplicación (EsApp)
- Selector de idioma (LanguageSelector)
- Toggle de tema (ThemeToggle)
- Avatar del usuario con dropdown
- Opción de logout

**Ubicación:** `components/header.tsx:1`

---

#### ExtraHeader (`app/(frontend)/(page)/components/extraHeader.tsx`)

**Características:**
- Barra de búsqueda animada
- Detección de primera visita (localStorage)
- Animación de entrada (700ms + 1100ms)
- Transición a posición fija al buscar
- Input con botón de búsqueda

**Animaciones:**
1. **Primera visita:**
   - Línea de búsqueda crece (700ms)
   - Header aparece con fade-in (1100ms delay)
   - Guarda flag en localStorage

2. **Primera búsqueda:**
   - Se mueve hacia arriba (600ms)
   - Cambia a posición fija

**Ubicación:** `app/(frontend)/(page)/components/extraHeader.tsx:1`

---

#### Table Component (`app/(frontend)/(page)/components/table.tsx`)

**Características:**
- **Dos modos de vista:**
  - 📱 Cards (móvil/preferencia)
  - 📊 Tabla (desktop/preferencia)
- **Paginación:**
  - Filas por página: 6, 12, 24, 48
  - Navegación: Anterior/Siguiente
  - Info: "Mostrando X-Y de Z resultados"
- **Controles:**
  - Botones de exportación (Excel/PDF - UI)
  - Toggle de panel de filtros
  - Toggle de vista (Cards/Table)

**Lógica de Paginación:**
```typescript
const startIndex = (currentPage - 1) * rowsPerPage
const endIndex = startIndex + rowsPerPage
const currentInvoices = invoices.slice(startIndex, endIndex)
```

**Ubicación:** `app/(frontend)/(page)/components/table.tsx:1`

---

#### InvoiceCard (`components/invoice-card.tsx`)

**Características:**
- Diseño tipo tarjeta responsivo
- Badge de estado (color-coded)
- Botón de pago integrado
- Hover effects
- Envuelve ModalPayment

**Estados visuales:**
- 🟡 Pending → Badge amarillo
- 🔴 Overdue → Badge rojo
- 🟢 Paid → Badge verde

**Ubicación:** `components/invoice-card.tsx:1`

---

#### InvoiceTable (`components/invoice-table.tsx`)

**Características:**
- Tabla HTML semántica
- Columnas:
  - Número de Factura
  - Servicio
  - Monto (formateado)
  - Periodo (formateado)
  - Estado (badge)
  - Acción (botón pagar)
- Hover en filas
- Responsive (scroll horizontal en móvil)

**Ubicación:** `components/invoice-table.tsx:1`

---

#### ModalPayment (`app/(frontend)/(page)/components/modalPayment.tsx`)

**Características:**
- Dialog de Shadcn/ui
- Muestra detalles completos de factura:
  - Número de factura
  - Servicio
  - Periodo (formato legible)
  - Estado actual
  - Monto total
- Botón de pago (deshabilitado si ya pagada)
- Loading state durante procesamiento
- Notificaciones toast (éxito/error)
- Refresco automático de lista post-pago

**Flujo de Pago:**
```
1. User click → Abre modal
2. Muestra datos de factura
3. User click "Pagar" → Loading
4. POST /api/invoice/[id]
5. Success → Toast → Refresca lista → Cierra modal
6. Error → Toast de error
```

**Ubicación:** `app/(frontend)/(page)/components/modalPayment.tsx:1`

---

#### FiltersPanel (`components/filters-panel.tsx`)

**Características:**
- Panel deslizable desde la derecha
- Overlay de fondo
- **Filtros disponibles:**
  1. **Estado:** Radio buttons (Todos/Pendiente/Vencido/Pagado)
  2. **Rango de Monto:** Inputs numéricos (min/max)
  3. **Rango de Fechas:** Inputs de fecha (inicio/fin)
- Botones:
  - "Aplicar Filtros" → Filtra y cierra panel
  - "Limpiar Filtros" → Resetea todo
- Responsive (full screen en móvil)

**Lógica de Filtrado:**
```typescript
// Combina todos los filtros con AND lógico
const filtered = mockInvoices.filter(invoice => {
  const matchesStatus = !status || invoice.status === status
  const matchesAmount = invoice.amount >= minAmount && invoice.amount <= maxAmount
  const matchesDate = invoice.period >= startDate && invoice.period <= endDate
  return matchesStatus && matchesAmount && matchesDate
})
```

**Ubicación:** `components/filters-panel.tsx:1`

---

### 🎨 Componentes de Tema

#### ThemeToggle (`components/theme-toggle.tsx`)

**Características:**
- Icono Sol/Luna
- Toggle entre light/dark
- Almacena preferencia en cookies
- Transición suave de colores

**Ubicación:** `components/theme-toggle.tsx:1`

---

#### LanguageSelector (`components/language-selector.tsx`)

**Características:**
- Dropdown con 4 opciones
- Flags emoji: 🇪🇸 🇺🇸 🇫🇷 🇩🇪
- Actualiza contexto global
- Persiste selección

**Ubicación:** `components/language-selector.tsx:1`

---

## Instalación y Configuración

### Requisitos Previos

- Node.js 18+
- npm, yarn, pnpm o bun

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/albrtaraya/esapp-invoice-manager
cd esapp-invoice-manager

# Instalar dependencias, se usa el --legacy-peer-deps y el --no-cache por que aun no existe compativilidad de 100% de algunos modulos usados con React 19 y Next 16
npm install --legacy-peer-deps --no-cache

# Configurar variables de entorno
cp .env.example .env
# Editar .env.local con tus valores
```

### Variables de Entorno

Crear archivo `.env`:

```env
# JWT Secret (cambia en producción)
JWT_SECRET=tu-clave-secreta-super-segura

# Base URL para API (desarrollo)
PROXY_URL=http://localhost:3000

# Entorno
NODE_ENV=development
```

### Scripts Disponibles

```bash
# Desarrollo (modo watch)
npm run dev

# Build de producción
npm run build

# Ejecutar en producción
npm run start

# Linting
npm run lint
```

### Iniciar Aplicación

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Credenciales de Prueba

### Usuarios de Prueba

| Customer ID | Nombre | Email |
|-------------|--------|-------|
| `123` | Albert | albert@example.com |
| `456` | Bianca | bianca@example.com |

### Facturas de Ejemplo

La aplicación incluye 8 facturas mock con:
- **Estados:** Pendiente (3), Vencida (3), Pagada (2)
- **Servicios:** Electropaz, TIGO, Aguas del Illimani, ENDE, Cotel, Entel
- **Montos:** Desde $1,250 hasta $5,800
- **Periodos:** Fechas variadas en 2025

---

## Flujo de la Aplicación

### 1. Flujo de Autenticación

```
┌─────────────┐
│   /login    │  Usuario no autenticado
└──────┬──────┘
       │
       │ Ingresa Customer ID (123 o 456)
       │
       ▼
┌─────────────────────┐
│ POST /api/login     │  Valida usuario
└──────┬──────────────┘
       │
       │ ✅ Success
       │
       ▼
┌─────────────────────┐
│ Genera JWT (24h)    │  Token en cookie
└──────┬──────────────┘
       │
       │ Redirect
       │
       ▼
┌─────────────────────┐
│   / (Home)          │  Página principal
└─────────────────────┘
```

### 2. Flujo de Búsqueda y Filtros

```
┌─────────────────────┐
│  Primera Visita     │
└──────┬──────────────┘
       │
       │ Animación de entrada (1.8s total)
       │
       ▼
┌─────────────────────┐
│  Barra de Búsqueda  │  Centro de pantalla
└──────┬──────────────┘
       │
       │ Usuario ingresa query
       │
       ▼
┌─────────────────────┐
│  Primera Búsqueda   │  Transición a header
└──────┬──────────────┘
       │
       │ Filtra facturas
       │
       ▼
┌─────────────────────┐
│  Muestra Resultados │  Cards o Tabla
└──────┬──────────────┘
       │
       │ Usuario aplica filtros
       │
       ▼
┌─────────────────────┐
│  Panel de Filtros   │  Estado, Monto, Fecha
└──────┬──────────────┘
       │
       │ Aplica filtros
       │
       ▼
┌─────────────────────┐
│  Resultados         │  Actualiza vista
│  Filtrados          │  Reset a página 1
└─────────────────────┘
```

### 3. Flujo de Pago

```
┌─────────────────────┐
│  Ver Factura        │  Card o Tabla
└──────┬──────────────┘
       │
       │ Click en "Pagar" o Card
       │
       ▼
┌─────────────────────┐
│  Abre Modal         │  Muestra detalles
└──────┬──────────────┘
       │
       │ Confirma pago
       │
       ▼
┌─────────────────────┐
│  Loading (1s)       │  Simula procesamiento
└──────┬──────────────┘
       │
       │ POST /api/invoice/[id]
       │
       ▼
┌─────────────────────┐
│  Actualiza Estado   │  "pending" → "paid"
└──────┬──────────────┘
       │
       │ Success toast
       │
       ▼
┌─────────────────────┐
│  Refresca Lista     │  GET /api/invoice
└──────┬──────────────┘
       │
       │ Cierra modal
       │
       ▼
┌─────────────────────┐
│  Vista Actualizada  │  Badge verde "Pagado"
└─────────────────────┘
```

---

## Mapa de Archivos

### Archivos Clave por Funcionalidad

#### 🔐 Autenticación
| Archivo | Propósito | Líneas |
|---------|-----------|--------|
| `middleware.ts` | Protección de rutas | ~50 |
| `app/(backend)/api/login/route.ts` | Endpoint de login | ~40 |
| `app/(backend)/api/logout/route.ts` | Endpoint de logout | ~15 |
| `app/(backend)/lib/jwt.ts` | Utilidades JWT | ~20 |
| `providers/AuthContext.tsx` | Context de auth | ~80 |

#### 📄 Gestión de Facturas
| Archivo | Propósito | Líneas |
|---------|-----------|--------|
| `app/(backend)/api/invoice/route.ts` | GET facturas | ~15 |
| `app/(backend)/api/invoice/[id]/route.ts` | POST pago | ~40 |
| `app/(backend)/mocks/MockInvoices.ts` | Datos mock | ~90 |
| `app/(frontend)/(page)/contexts/InvoiceContext.tsx` | Estado facturas | ~100 |

#### 🎨 UI Principal
| Archivo | Propósito | Líneas |
|---------|-----------|--------|
| `app/(frontend)/(page)/page.tsx` | Página principal | ~150 |
| `app/(frontend)/(page)/components/extraHeader.tsx` | Búsqueda animada | ~120 |
| `app/(frontend)/(page)/components/table.tsx` | Vista de resultados | ~250 |
| `app/(frontend)/(page)/components/modalPayment.tsx` | Modal de pago | ~150 |
| `components/header.tsx` | Header global | ~100 |
| `components/filters-panel.tsx` | Panel de filtros | ~200 |

#### 🌍 Internacionalización
| Archivo | Propósito | Claves |
|---------|-----------|--------|
| `app/(frontend)/(page)/translations.ts` | Traducciones main | 134 |
| `app/(frontend)/login/components/translations.ts` | Traducciones login | 12 |
| `providers/LanguageContext.tsx` | Context de idioma | ~40 |

#### 🎨 Tema y Estilos
| Archivo | Propósito | Líneas |
|---------|-----------|--------|
| `app/globals.css` | Variables CSS | ~150 |
| `components/theme-toggle.tsx` | Toggle tema | ~30 |
| `components/theme-provider.tsx` | Provider tema | ~40 |
| `lib/utils.ts` | Utilidad cn() | ~10 |

#### 🧩 Componentes UI (Shadcn)
| Directorio | Componentes | Total |
|------------|-------------|-------|
| `components/ui/` | 40+ componentes | ~2000+ |

---

## Características Técnicas Destacadas

### 🚀 Rendimiento

- **Next.js App Router:** SSR y SSG optimizados
- **React 19:** Características más recientes
- **Lazy Loading:** Componentes cargados bajo demanda
- **Memoización:** Reducción de re-renders innecesarios
- **Optimización de imágenes:** Next.js Image

### 🎨 UX/UI

- **Animaciones suaves:** Framer Motion patterns
- **Feedback visual:** Loading states, toasts
- **Responsive design:** Mobile-first approach
- **Accesibilidad:** ARIA labels, keyboard navigation
- **Dark mode:** Soporte completo con persistencia

### 🔒 Seguridad

- **JWT Authentication:** Tokens seguros
- **HTTP-only Cookies:** Protección XSS
- **Middleware Protection:** Rutas protegidas
- **Input Validation:** Validación server-side
- **CORS Ready:** Preparado para producción

### 📊 Escalabilidad

- **Separación de capas:** Backend/Frontend claro
- **Context API:** Estado global organizado
- **Componentes reutilizables:** DRY principle
- **TypeScript:** Type safety completo
- **Modular structure:** Fácil de extender

---

## Tecnologías Usadas en Detalle

### Core Framework
```json
{
  "next": "16.0.1",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "typescript": "^5"
}
```

### UI & Styling
```json
{
  "tailwindcss": "4.1.9",
  "@radix-ui/react-*": "múltiples primitivas",
  "lucide-react": "0.454.0",
  "class-variance-authority": "0.7.1"
}
```

### State & Forms
```json
{
  "react-hook-form": "7.60.0",
  "zod": "3.25.76"
}
```

### Authentication & Security
```json
{
  "jsonwebtoken": "9.0.2",
  "jose": "6.1.0",
  "js-cookie": "3.0.5"
}
```

### Utils
```json
{
  "axios": "1.13.1",
  "date-fns": "4.1.0",
  "clsx": "2.1.1",
  "tailwind-merge": "2.5.5"
}
```

---

## Licencia

Este proyecto fue desarrollado como prueba técnica.

---

## Contacto y Soporte

Para preguntas o sugerencias sobre este proyecto:

- **Email:** aaraya.dev@gmail.com

---

## Agradecimientos

- **Next.js Team** - Framework increíble
- **Shadcn** - Componentes UI de alta calidad
- **Radix UI** - Primitivas accesibles

---

**Desarrollado con ❤️ usando Next.js 16 y React 19**
