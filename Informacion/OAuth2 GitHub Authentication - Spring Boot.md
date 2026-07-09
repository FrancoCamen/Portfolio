# OAuth2 GitHub Authentication con Spring Boot

Mini proyecto backend desarrollado para aprender e implementar autenticacion OAuth2 en una aplicacion Spring Boot, utilizando GitHub como proveedor externo de identidad. El objetivo fue comprender el flujo completo de autenticacion con OAuth2, integrar Spring Security OAuth2 Client y proteger endpoints que requieren un usuario autenticado.

## Descripcion general

Este proyecto se enfoco en practicar una alternativa de autenticacion distinta al login tradicional con credenciales y JWT. En lugar de validar usuario y password directamente dentro de la aplicacion, el sistema delega la autenticacion en GitHub mediante OAuth2.

La aplicacion permite iniciar sesion con una cuenta de GitHub, acceder a informacion del usuario autenticado y persistir datos basicos en una base H2 para desarrollo. Fue pensado como un proyecto educativo para entender como se configura un proveedor OAuth2, como funciona el callback de autenticacion y como Spring Security gestiona automaticamente parte del flujo.

## Objetivos del proyecto

- Comprender el funcionamiento general de OAuth2.
- Configurar GitHub como proveedor de autenticacion.
- Integrar Spring Security OAuth2 Client en una aplicacion Spring Boot.
- Proteger endpoints que requieren usuario autenticado.
- Practicar configuracion de seguridad, sesiones y usuarios.
- Diferenciar autenticacion delegada con OAuth2 de autenticacion stateless con JWT.

## Funcionalidades principales

- Login mediante GitHub OAuth2.
- Configuracion de una GitHub OAuth App.
- Callback de autenticacion en `/login/oauth2/code/github`.
- Endpoint para consultar el usuario autenticado.
- Proteccion de rutas mediante Spring Security.
- Persistencia basica de usuarios con JPA.
- Base de datos H2 en memoria para desarrollo.
- Consola H2 habilitada para inspeccionar datos.

## Flujo de autenticacion OAuth2

El flujo implementado sigue el esquema tipico de OAuth2 con un proveedor externo:

1. El usuario intenta acceder a una funcionalidad protegida.
2. Spring Security redirige al login de GitHub.
3. El usuario autoriza la aplicacion desde GitHub.
4. GitHub redirige nuevamente a la aplicacion mediante el callback configurado.
5. Spring Security procesa la respuesta del proveedor.
6. La aplicacion obtiene informacion del usuario autenticado.
7. El usuario puede acceder a endpoints protegidos.

Este flujo permite delegar la autenticacion en un proveedor confiable, reduciendo la necesidad de manejar credenciales propias para ese tipo de acceso.

## Configuracion de GitHub OAuth2

Para utilizar GitHub como proveedor, se creo una OAuth App desde la configuracion de desarrollador de GitHub. La aplicacion requiere:

- **Homepage URL:** `http://localhost:8080`
- **Authorization callback URL:** `http://localhost:8080/login/oauth2/code/github`
- **Client ID**
- **Client Secret**

Luego, esos valores se configuran en `application.properties` junto con los scopes necesarios:

```properties
spring.security.oauth2.client.registration.github.client-id=YOUR_GITHUB_CLIENT_ID
spring.security.oauth2.client.registration.github.client-secret=YOUR_GITHUB_CLIENT_SECRET
spring.security.oauth2.client.registration.github.scope=user:email,read:user
```

## Arquitectura y organizacion

El proyecto se organizo con una estructura simple, separando configuracion, controladores, modelo y acceso a datos.

La estructura principal incluye:

- **config/SecurityConfig:** configuracion de seguridad y OAuth2.
- **controller/AuthController:** endpoints relacionados con autenticacion y usuario autenticado.
- **controller/HomeController:** pagina o ruta inicial de la aplicacion.
- **model/User:** entidad para representar usuarios.
- **repository/UserRepository:** acceso a datos mediante Spring Data JPA.
- **OAuth2AuthApplication:** clase principal de Spring Boot.

Esta organizacion permitio concentrarse en entender el flujo OAuth2 sin agregar complejidad innecesaria al proyecto.

## Endpoints principales

- `GET /` - Ruta inicial de la aplicacion.
- `GET /api/auth/user` - Obtiene informacion del usuario autenticado mediante OAuth2.
- `GET /h2-console` - Consola H2 para inspeccionar la base de datos en desarrollo.

## Seguridad

La seguridad se implemento con Spring Security y OAuth2 Client. El flujo OAuth2 es manejado en gran parte por Spring Security, incluyendo redireccion al proveedor, recepcion del callback y construccion del contexto de seguridad del usuario autenticado.

Para fines de desarrollo, se utilizo H2 como base en memoria y CSRF deshabilitado. Tambien se incluyo BCryptPasswordEncoder como parte de la configuracion de seguridad, aunque el foco principal del proyecto estuvo en OAuth2 con GitHub.

## Tecnologias utilizadas

- Java 21
- Spring Boot 3.2.5
- Spring Web
- Spring Security
- OAuth2 Client
- Spring Data JPA
- H2 Database
- Lombok
- Maven
- GitHub OAuth Apps

## Aprendizajes principales

- Configuracion de OAuth2 Client en Spring Boot.
- Uso de GitHub como proveedor externo de autenticacion.
- Comprension del callback `/login/oauth2/code/github`.
- Proteccion de endpoints mediante usuario autenticado.
- Manejo basico de sesiones y contexto de seguridad con Spring Security.
- Diferencias entre autenticacion delegada con OAuth2 y autenticacion propia con JWT.
- Configuracion de scopes para acceder a informacion del usuario.

## Valor del proyecto

Este mini proyecto me permitio comprender como integrar autenticacion social en una aplicacion Spring Boot y como delegar el proceso de login en un proveedor externo como GitHub. Tambien fue util para comparar enfoques de autenticacion: por un lado JWT para APIs stateless, y por otro OAuth2 para login con proveedores externos.

La experiencia sirve como base para implementar login social en aplicaciones mas grandes, combinar OAuth2 con JWT, agregar otros proveedores como Google y construir sistemas de autenticacion mas flexibles y cercanos a escenarios reales.

[Repositorio](https://github.com/FrancoCamen/OAuth2Spring.git)
