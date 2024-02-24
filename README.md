# Api gestion de inventario

### Como probar

Antes de empezar a utilizar la api y poder modificarla es encesario instalar las dependencias del proyecto utilizando *npm* (Node Package Manager), dentro de la carpeta abrimos una terminal y ejecutamos

``` shell
npm i
```

Esperamos a que se instalen las dependencias y ya podremos trabajar con nuestra API de inventario de manera local, para mayor comodidad podemos ejecutar (en la terminal que abrimos anteriormente).

``` shell
npm run dev
```

Para desplegar el archivo *index.js* con *nodemon* y no tener que recargar el servicio de manera manual, ya que *nodemon* lo hara de manera automatica despues de que guardemos los cambios en los archivos que estemos trabajando.


#### Como funciona *nodemon* dentro este proyecto

Dentro del archivo *package.json* hemos creado un script asociado a 'dev' para que ejecute el binario de *nodemon* para el archivo *index.js*.
Para poder replicarlo en otros proyectos es necesario instalar *nodemon* utilizando

```shell
npm install nodemon
```
Y dentro del archivo *package.json* agregar la siguiente linea en al seccion de 'scripts', siendo este el resultado.

```json
 "scripts": {
    "dev": "./node_modules/nodemon/bin/nodemon.js index.js"
  },
```