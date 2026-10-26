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
