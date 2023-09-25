#  UP web-development project
Proyecto creado para la materia de web-devepment de la Universidad de Palermo  

##  Que hay aqui?
Este proyecto fue creado con Turborepo (monorepo) para administrar servicios de API, web-app y mongoDB en conjunto.
  
###  Apps y Packages
-  `web`: a [Next.js](https://nextjs.org/) app
-  `api`: an [Express](https://expressjs.com/) server
-  `eslint-config-custom`: `eslint` configuraciones para el cliente (incluye `eslint-config-next` y `eslint-config-prettier`)
-  `eslint-config-custom-server`: `eslint` configuraciones para el servidor (incluye `eslint-config-next` y `eslint-config-prettier`)
-  `scripts`: configuraciones de Jest
-  `logger`: Logger isomorfico (solo para abstraer, es un wrapper de console.log)
-  `tsconfig`: tsconfig.json;s usados para el monorepo
Cada package/app es 100% [TypeScript](https://www.typescriptlang.org/).

###  Docker
El repo esta creado para usarse principalmente con Docker y de esta forma con el uso de un solo comando levantar todos los  servicios.
```
# Crear una network que nos habilite a comunicarnos entre contenedores

docker network create app_network

docker network create express-mongo


# Build prod usando el BuildKit engine

COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build


# Iniciar prod en detached mode

docker-compose -f docker-compose.yml up -d
```

Abri http://localhost:3000 para visualizar la web-app.

Para parar todos los containers:
```
# Parar todos los contenedores que estan corriendo

docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```

##  Paso a paso para correr el repositorio

### Si estas utilizando Docker
Solo debes ejecutar los siguientes tres comandos y ya tendras todo corriendo sin necesidad de continuar con la guia. Caso contrario, salta este paso y ve a la seccion de instalar packages y sigue la guia.
```
docker network create app_network
docker network create express-mongo
docker-compose -f docker-compose.yml up -d
```

### Instala los packages requeridos
```
npm install
```

### Configura las variables requeridas
Dentro de `apps/api/src/config/index.ts` encontraras las variables requeridas a setear para que la API funcione correctamente. La mas importante, si no estas usando Docker, es colocar tu connection string de MongoDB como `MONGO_DB_CONNECTION_STRING`.

### Corre la applicacion en modo dev
```
npm run dev
```

### Por defecto encontraras las apps en las siguientes rutas
```
API: localhost:3001
WEB: localhost:3000
```

##  Documentacion de la API

### Postman collection
Si utilizas Postman podras importar la collection desde `./postman-collection.json`.

### User Endpoints
Endpoints necesarios para la creacion de usuario y la autenticacion para utilizar endpoints protegidos.
```
# Create User
# Para crear el usuario y configurar el pin a utilizar si es tu primera vez
POST: /user
{
	"name": "Lucas",
	"pin": "1234"
}

# Authenticate User
# Una vez hayas creado el usuario deberas autenticarte con tu pin lo que devolvera un token que deberas utilizar en las rutas protegidas pasandolo dentro del header Authorization
POST: /user/authenticate
{
	"pin": "1234"
}

# Get User Info
# Obtendras toda la info necesaria del usuario junto con todos sus caracteres e items de cada uno
GET: /user
Headers: Authorization
```

### Character Endpoints
Endpoints protegidos, recuerda pasar el token dentro del header `Authorization`, para la seleccion de personaje y seleccion de items de cada uno.
```
# Get Characters
# 
GET: /characters
Headers: Authorization


# Select Character
# Endpoint para seleccionar character pasando el id del mismo que es obtenido a traves del endpoint de "Get Selectable Characters"
POST: /characters
Headers: Authorization
{
	"id": "1"
}

# Edit Character
# Endpoint para seleccionar los items que va a vestir. Este recibe un listado de id de items que reemplazaran a los que ya estaban previamente seleccionados. Estos items se obtienen desde el endpoint "Get Selectable Items"
PATCH: /characters
Headers: Authorization
{
	"items": ["upper-body-1", "lower-body-1", "boots-1"]
}
```

### Option Endpoints
Endpoints no protegidos necesarios para seleccionar caracteres y vestir con items.
```
# Get Selectable Items
# Endpoint para obtener items posibles de vestir, type disponibles "upper_body", "lower_body", "boots". Solo es posible vestir uno de cada uno. El query parameter es opcional.
GET: /options/items?type=boots

# Get Selectable Characters
# Endpoint para obtener los personajes que pueden ser seleccionados
GET: /options/characters
```

## Datos importantes
Datos necesarios para probar la API

### Ids de items seleccionables
- upper-body-1
- upper-body-2
- lower-body-1
- lower-body-2
- boots-1
- boots-2

### Ids de characters seleccionables
- 1
- 2
- 3
- 4
- 5