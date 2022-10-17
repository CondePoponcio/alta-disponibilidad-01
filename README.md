# Tarea 1 Alta Disponibilidad

Trabajo de: Felipe Condore y Pamela Saldías

# Componentes del sistema:

## Base de datos
Se utilizo Postgres. En donde las tablas creadas estan dadas por User, Movie y Review.

## Backend
Construido utilizando Golang. Sus principales funciones estan en Register, Login y el CRUD de Review (POST, GET, PUT, DELETE)

## Frontend
Construido utilizando React para preparar todos los datos estáticos de la aplicación. Luego a través de multistage se usa la imagen de Nginx para desplegarlo al puerto 80 donde puede ser visto en cualquier navegador como localhost.

# Inicializacion
1.
```
- git clone https://github.com/CondePoponcio/alta-disponibilidad-01
```
2. Se debe de agregar el archivo .env con el siguiente contenido:


```env
SECRET_KEY=my-secret-key


DB_HOST=database


DB_USERNAME=postgres


DB_PASSWORD=postgres


DB_DATABASE=tarea1


DB_PORT=5432


API_PORT=8000
```

3. Luego se ejecutan los siguientes comandos para ejecutar el entorno
```bash
docker compose build
docker compose create
docker compose start
```
