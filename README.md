# Tarea 1 Alta Disponibilidad

Trabajo de: Felipe Condore y Pamela Saldías

# Componentes del sistema:

Base de datos: se utilizo Postgrese. En donde las tablas creadas estan dadas por User, Movie y Review.


Backend: construido utilizando Golang. Sus principales funciones estan en Register, Login y el CRUD de Review (POST, GET, PUT, DELETE)


Frontend: construido utilizando React.

# Inicializacion
1.
```
- git clone https://github.com/CondePoponcio/alta-disponibilidad-01
```
2. Se debe de agregar los archivos .env:

- Backend:


SECRET_KEY=super-hype-secret


DB_USERNAME=postgres


DB_PASSWORD=postgres


DB_DATABASE=tarea1


DB_HOST=database


DB_PORT=5432


-Frontend:

3. 
```
- docker compose up
```
