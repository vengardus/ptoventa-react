# Proyecto: Punto de Venta con React

## Resumen

- Metodología Atomic Design
- ubuntu v.22.04
- node v.18.16.0
- react v.18.2
- pmpm v.8.9.2

## Extensiones VSCode

- styled-Components Snippets

## Creación del proyecto: YA NO, saltar a Clonar Proyecto

```pwd
# YA NO, solo clonar desde alice02
# pnpm create vite
# seleccionar react
# seleccionar javascript + swc
```

## Clonar proyecto

```pwd
git clone <alice02-url-ssh> <proyecto>

cd <proyecto>
cp ../control-gastos-curso/.env .
cp ../control-gastos-curso/.env*
rm -r .git
pnpm install

pnpm run dev
```

## Instalar dependencias: YA NO, se instalaron  con el pnpm install

```pwd
pnpm add styled-components  
pnpm add react-router-dom
pnpm add react-icons
pnpm add zustand
pnpm add @supabase/supabase-js
pnpm add iso-country-currency
pnpm add @tanstack/react-query
pnpm add sweetalert2
pnpm add react-hook-form
pnpm add react-spinners
pnpm add dayjs
pnpm add swiper
pnpm add -D tailwindcss postcss autoprefixer  

## INSTALL (invnetario))
pnpm add @tanstack/react-table
pnpm add @react-pdf/renderer --save

## INSTALL (pto venta)
pnpm add -D @iconify/react

```

## Configurar tailwind (Instalación con Vite)

Seguir pasos de: [https://tailwindcss.com/docs/guides/vite]

## Supabase

Configurada con proyecto Supabase: gardodb

## Supabase: Fnctions and Triggers

```plpgsql: YA NO VA!!! trigger & function insert_default from pv_companies
create or replace function insert_default_from_company()
returns trigger
language plpgsql
as $$
begin
  insert into pv_doc_types(description, id_company)
  values('Genérico', new.id);
  return new;
end
$$;


create or replace trigger trigger_company_default 
after insert on pv_companies
for each row
execute function insert_default_from_company();
```

```plpgsql: inser_superadmin
CREATE OR REPLACE FUNCTION insert_superadmin(
  p_id_auth text,
  p_id_role int,
  p_email text, 
  p_currency_symbol text,
  p_company_name text,
  p_doc_type_name text
)
RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE
    new_id_company INT;
    new_id_doc_type INT;
    new_id_branch INT;
    new_id_user INT;
BEGIN
    -- Verificar la existencia del rol
    IF NOT EXISTS (SELECT 1 FROM pv_roles WHERE id = p_id_role) THEN
        RAISE EXCEPTION 'El rol especificado no existe.';
    END IF;
    
    -- Verificar la existencia de la compañía para el superadmin
    IF EXISTS (SELECT 1 FROM pv_companies WHERE name = p_company_name AND id_auth = p_id_auth) THEN
        RAISE EXCEPTION 'La compañía ya existe para el superadmin %.', p_email;
    END IF;
    
    BEGIN
        -- Insert company
        INSERT INTO pv_companies(name, currency_symbol, id_auth)
        VALUES(p_company_name, p_currency_symbol, p_id_auth)
        RETURNING id INTO new_id_company;

        -- Insert doc_type
        INSERT INTO pv_doc_types(description, id_company)
        VALUES(p_doc_type_name, new_id_company)
        RETURNING id INTO new_id_doc_type;
        
        -- Insert branch
        INSERT INTO pv_branches(name, id_company)
        VALUES(p_company_name, new_id_company)
        RETURNING id INTO new_id_branch;

        -- Insert user
        INSERT INTO pv_users(id_doc_type, id_role, email, id_auth)
        VALUES(new_id_doc_type, p_id_role, p_email, p_id_auth)
        RETURNING id INTO new_id_user;

        -- insert user_branch
        INSERT INTO pv_user_branch(id_user, id_branch)
        VALUES(new_id_user, new_id_branch);

        RETURN new_id_user;
    EXCEPTION
        WHEN unique_violation THEN
            RAISE EXCEPTION 'Error de violación de unicidad al insertar la compañía.';
    END;
END;
$$;
```

## Ayuda memoria

### Deshabilitar propTypes del lint en vsCode

```json
# disable project-wide in your eslintrc.cjs:

"rules": {
  "react/prop-types": "off"
}
```

### Imagenes generadas para el carrusel

[https://www.canva.com/es_419/]

### Documentacion chartjs react

[https://react-chartjs-2.js.org/]

### Ejemplos carrusel

[http://swiperjs.com/demos]

## Deploy en Firebase

- Iniciar sesión en firebase [https://firebase.google.com]

- Ir a consola

- Crear nuevo proyecto (paso 1-3): dar nombre al proyecto

- Google analytics (Paso 2-3): deshabilitar analíticas

- Creando proyecto .... (3-3)

- Agregar app: seleccionar app web  < />

- Registar app:
  - ingresar sobrenombre app
  - agregar sdk firebase:

  ```pwd (carpeta de l proyecto)
    pnpm add firebase 
  ```

  - Opción ir a Console (botón en Registar App)

- Configurar Firebase hosting: menu compilación -> hosting
  - Iniciar Firebae Cli

  ```pwd
    pnpm add -g firebase-tools
  ```

  - Siguiente

  - Inicializar proyecto

  ```pwd
    firebase login
  ```

  - Generar proyecto
  
  ```pwd
    pnpm run build
  ```
  
  - Solución al warning:

    ```pwd
      (!) Some chunks are larger than 500 KiB after minification. Consider:
      - Using dynamic import() to code-split the application
      - Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/guide/en/#outputmanualchunks
      - Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
    ```
  
    ```vite.config.js
      export default defineConfig({
        plugins: [react()],
        build: {
          chunkSizeWarningLimit: 1600,    <==
        },
      })
    ```
  
  - Inicialiar firebase

    ```pwd
      firebase init

      Seleccionar opción: Hosting: Configure files for firebase hosting and (optionally) set up Github...
      Use an existing project
      Select project
      What do you want to use as your public directory: enter
      Configure as a simgle-page ? y
      Set up automatic builds and deploys with Github? n
    ```

  - Deploy

    ```pwd
      firebase deploy
    ```

  - Modificar firebae.json

    ```pwd
      "hosting": {
          "public": "dist",   <==

    ```

  - Configurar Url Autenticacion en Supabase

    - Opción Authentication -> URL Configuration

      - Redirects URLs -> Add URL
        - Agregar la url del proyecto de firebase

      - Modificar también en:  Site Url (asi funcionó para mi)

  - Posteriores deploys:

    ```pwd
      firebase login    # solo si es necesario
      pnpm run buid
      firebase deploy
    ```

## BD

### users

- create_at timestamptz now()
- username  varchar null
- photo varchar null
- country varchar 'PERU'
- currency  varchar 'PEN´
- theme varchar '1'   # '1':dark '0':light
- idauth_supabase varchar null

## Configurar Supabase

### Copiar keys para accesos a la Api de Supabase en archivo .env (según .env-template)

- En el proyecto de Supabase: Configuración - Api : Copiar de:
  - Project Url: URL
  - Project Api Keys: anon public

### Habiliar Autenticación y Provider

- En el proyecto de Supabase: Authenticatation - Providers
  - Habilitar Google: Enabled Sign with Google
  - Copiar en
    - Client Id (for OAuth)     : dato A (obtendido de Google Cloud)
    - Client secret (for OAuth) : dato B (obtendido de Google Cloud)

### Configurar Google Cloud

- Ingreasar y logearse en [https://cloud.google.com]
- Opción Console
- Crear Nuevo Proyecto (Si ya existen proyectos aparecer una lista despĺegable, ingresar y elegir Proyeto Nuevo)
- Dar nombre al Proyecto: ReactAlice01
- Ir a menu Google Cloud: Apis y Servicios - Credenciales
  - Botón crear credeciales
  - Elegir ID de cliente de OAuth
  - Crear ID de cliente de OAuth
    - Botón : Configurar pantalla de consentimiento
      - User Type: Externos
      - Botón: Crear
  - Editar el registro de la App
    - Pantalla de consentimiento:
      - Información de la aplicación: ReactAlice01  (Es el nombre que aparecerá en la ventana de consentimiento)
        - Correo electrónico: [ismytv@gmail.com]
        - Información de contacto del desarrollador: [ismytv@gmail.com]
        - Botón: Guardar y Continuar
      - Permisos:
        - Botón: Guardar y continuar
      - Usuario de prueba:
        - Botón: Guardar y continuar
      - Resumen:
        - Botón: Volver al Panel
  - Elegir opcion Credenciales del menu lateral
    - Botón: Crear credenciales
    - Elegir Crear ID de cliente de OAuth
      - Tipo Aplicación: Aplicación Web
      - Nombre: ReactAlice01-api
      - URL de direccionamiento autorizado:
        - Obtenrlo de Supabase: Authentication - Providers - Google - Callback URL (for OAuth)
      - Botón: Crear
  - Se crearon las credenciales para el cliente OAuth !!!
    - ID de cliente : dato A
    - Secreto del cliente: dato B
  - Copiar dato A y dato B en la configuración Provider Google de supabase
  - Listo !!!
  - OBS: Si hay problema de permisos, hacer la app en cloud : en la seción de consentimiento como publicar o bien en modo de pruebas pero ingresarel correo de prueba.
  