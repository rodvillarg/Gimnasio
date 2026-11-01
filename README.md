## Practica 18

### ¿Cuánto se ahorró y por qué el ahorro es pequeño en esta aplicación?

El archivo principal pasó de 319.36 kB a 315.35 kB, unos 4 kB. Es poco porque cada página pesa entre 0.25 y 2.45 kB y casi todo el peso es React y React Router, que se cargan siempre.

### ¿Por qué falla la API si el preview corre en el puerto 4173?

Porque el backend solo permite peticiones desde `http://localhost:5173`. El 4173 es otro origen, entonces el navegador bloquea la respuesta por CORS aunque el backend sí responde.

### ¿Cuándo conviene un contexto y cuándo un store?

El contexto conviene para valores que casi no cambian, como la sesión. El store conviene cuando el dato cambia seguido y lo leen varias páginas, como las inscripciones, porque con un selector solo se vuelve a pintar el componente que lo usa.

## Practica 17

### ¿La ruta protegida hace segura la aplicación? ¿Qué es lo que de verdad protege los datos?

No, solo decide qué se muestra en el navegador, y ese código corre en el cliente, así que alguien lo puede saltar. Los datos los protege el backend, porque revisa el token en cada petición. Con `curl -i http://localhost:3000/inscripciones/mias` sin token y respondió `401 Unauthorized`.

### ¿Por qué no se manda el miembroId al inscribirse?

Porque el backend ya sabe quién es el miembro por el token, entonces solo se manda el `horarioId`. Si el `miembroId` lo mandara el front, cualquiera lo podría cambiar en la petición.

### ¿Qué diferencia hay entre un 401 y un 403?

El 401 es cuando la API no sabe quién eres, y el 403 es cuando sí sabe quién eres pero esa cuenta no puede hacer la acción.

## Practica 16

### ¿Por qué se usa un contexto y no props para la sesión?

Porque la sesión la necesitan varios componentes que están en partes distintas del árbol, como el `Encabezado`, `PaginaEntrar` y `PaginaRegistro`. Con props tendría que pasar `usuario`, `entrar` y `salir` por todos los componentes de en medio, aunque ellos no los usen. 

### ¿Qué pasa si un componente usa la sesión fuera del proveedor?

`useContext` regresa `null`, porque no hay un proveedor que le dé un valor. Por eso `useSesion` revisa ese caso y lanza el error «useSesion() tiene que usarse dentro del componente <ProveedorSesion>», en lugar de dejar que la app falle más adelante al intentar leer `usuario` de un `null`.

### ¿Dónde se guarda el token y qué riesgo tiene ese lugar?

En el `localStorage` del navegador, junto con el usuario, para que la sesión siga después de recargar la página. El riesgo es que cualquier script que corra en la página puede leerlo, por ejemplo si se cuela código malicioso por un XSS, y con el token se podrían hacer peticiones como si fuera el usuario. 

## Practica 15

### ¿Por qué el 404 sí tiene encabezado y pie?

Porque la ruta `path="*"` está dentro de la ruta del `Layout`. El `Layout` se pinta siempre y solo cambia lo que va en su `Outlet`, que en este caso es `NoEncontrado`. Si la ruta `*` estuviera fuera del `Layout`, el 404 saldría solo, sin encabezado ni pie.

### ¿Qué cambia en la pestaña Red si usas `<a href>` en lugar de `Link`?

Con `<a href>` el navegador recarga la página completa, vuelve a pedir el documento, los JS y los CSS, y React arranca de cero. 

### ¿En qué tipo de dato llega el id de la URL y qué pasa si no lo conviertes?

Llega como `string`, porque `useParams` regresa texto, ya que todo lo que va en la URL es texto. `traerClase` pide un `number`, así que si no uso `Number(id)` TypeScript marca error. 

### ¿Qué pasa al ir de `/clases/1` a `/clases/2` si el id no está en las dependencias del efecto?

React Router no vuelve a ejecutar el componente cuando solo cambia el parámetro, solo lo vuelve a renderizar. Si el id no está en las dependencias, el efecto no se ejecuta otra vez y no se pide la clase nueva. La URL dice `/clases/2` pero en pantalla se queda la clase 1.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
