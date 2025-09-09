## 🚀 Requisitos
- Node.js 18+
- npm 9+

## Instalación
```bash
cd gestor-turnos-frontend
npm install
```

## Variables de entorno
Crea un archivo `.env` en la raíz:

```env
VITE_API_URL=http://localhost:4000
```

## Scripts
- `npm run dev` → iniciar en modo desarrollo (http://localhost:5173)
- `npm run build` → compilar para producción
- `npm run test` → ejecutar tests (Vitest + React Testing Library)

## Funcionalidades
- Login con dark mode y diseño moderno.
- Navbar con estilos consistentes (dark/light toggle).
- Vista de médicos con calendario de turnos.
- Modal de confirmación para reservar turno.
- Gestión de pacientes, médicos y turnos desde UI.

## Flujo de uso
1. Loguearse como **admin** (`admin@gestor.com / admin123`).
2. Crear médicos desde el panel de admin.
3. Registrar pacientes en `/auth/register` o desde el frontend.
4. Iniciar sesión como paciente → seleccionar médico → elegir fecha en el calendario → reservar turno.
5. Iniciar sesión como médico → visualizar sus turnos.





# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
