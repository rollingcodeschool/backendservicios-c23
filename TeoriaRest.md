# Apoyo Teórico: Introducción al Estándar REST y Buenas Prácticas en APIs

Al construir el backend de nuestras aplicaciones con Node.js y Express, no escribimos el código a ciegas ni inventamos nuestras propias reglas. Seguimos un estándar de la industria conocido como **REST**.

## 1. ¿Qué es REST?

**REST** (*Representational State Transfer* / Transferencia de Estado Representacional) no es un lenguaje de programación, ni un framework, ni una tecnología. **Es un conjunto de reglas, restricciones y buenas prácticas de arquitectura** utilizadas para diseñar APIs web utilizando el protocolo HTTP. 

Cuando nuestra API cumple con todas estas reglas, se la denomina una **API RESTful**. Su objetivo principal es lograr que cualquier frontend (React, Angular, una app móvil, etc.) pueda comunicarse con nuestro backend de forma universal, clara y predecible.

---

## 2. Los 3 Pilares Fundamentales de REST

Para diseñar una API bajo este estándar, debemos dominar tres conceptos clave:

### A. Los Recursos (Las URLs)
En REST, absolutamente todo lo que vive en nuestra base de datos es un **recurso** (usuarios, servicios, productos, turnos). Cada recurso debe tener una dirección web única e irrepetible llamada **URI** (comúnmente conocida como URL).

* ⚠️ **Regla de oro:** Las URLs deben nombrar al recurso utilizando **sustantivos en plural**. Nunca debemos usar verbos en la URL para indicar la acción.
  * ❌ *Incorrecto (Basado en acciones):* `/obtenerServicios`, `/crearServicio`, `/borrarServicio/5`
  * *Correcto (Basado en recursos):* `/servicios`, `/servicios/5`

### B. Los Métodos HTTP (Las Acciones)
Como las URLs solo se encargan de nombrar al recurso en plural (`/servicios`), la acción que queremos realizar sobre ese recurso la define el **Método HTTP** de la petición. De esta forma mapeamos nuestro CRUD tradicional:

* **`GET /servicios`** ➡️ Trae la lista de todos los servicios (Leer todos).
* **`GET /servicios/:id`** ➡️ Trae un servicio específico según su ID (Leer uno).
* **`POST /servicios`** ➡️ Crea un nuevo servicio (Crear).
* **`PUT /servicios/:id`** ➡️ Reemplaza por completo el servicio con el ID enviado (Actualizar todo).
* **`PATCH /servicios/:id`** ➡️ Modifica solo algunos campos del servicio con el ID enviado (Actualizar parcialmente).
* **`DELETE /servicios/:id`** ➡️ Elimina permanentemente el servicio según su ID (Borrar).

### C. Las Respuestas del Servidor (Códigos de Estado HTTP)
Una API RESTful no solo devuelve datos (JSON), sino que siempre debe acompañar esa respuesta con un código de estado numérico que le indique al frontend el resultado de la operación:

* **`2xx` (Éxito):** * `200 OK`: La operación fue exitosa (común en GET, PUT, PATCH, DELETE).
  * `201 Created`: El recurso se creó correctamente en la base de datos (exclusivo de POST).
* **`4xx` (Errores del Cliente):** * `400 Bad Request`: Los datos enviados por el frontend son inválidos o están mal formateados.
  * `401 Unauthorized`: El usuario no está autenticado (falta loguearse).
  * `404 Not Found`: El recurso solicitado (o el ID enviado) no existe.
* **`5xx` (Errores del Servidor):** * `500 Internal Server Error`: Ocurrió un fallo inesperado o un colapso en el código de nuestro servidor (por ejemplo, se cayó la base de datos).

---

## 3. Principios de Diseño de una API REST

Para que nuestra arquitectura sea robusta y escalable, REST nos exige cumplir con las siguientes restricciones obligatorias:

1. **Separación Cliente-Servidor:** El frontend y el backend son totalmente independientes. Al frontend no le importa si usamos MongoDB o MySQL; al backend no le importa si la interfaz está hecha en React o es una app de Android. Solo se comunican intercambiando formato **JSON**.
2. **Sin Estado (Stateless):** El servidor no almacena "memoria" o "sesiones" de las peticiones anteriores. Cada petición HTTP que viaja del cliente al servidor debe ser independiente y contener toda la información necesaria (como tokens de autenticación) para ser procesada con éxito.
3. **Interfaz Uniforme:** Todas las rutas, respuestas y manejos de datos de nuestra aplicación deben seguir la misma consistencia y estructura para que la API sea fácil de entender por cualquier desarrollador ajeno al proyecto.

---

> 💡 **En resumen:** REST es el manual de convivencia de la web. Nos asegura que, sin importar qué tan grande sea nuestro proyecto, la comunicación entre el cliente y el servidor se mantendrá ordenada, predecible y estandarizada bajo las reglas globales del protocolo HTTP.