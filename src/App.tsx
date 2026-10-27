import { Navigate, Route, Routes } from 'react-router'
import { Layout } from './componentes/Layout'
import PaginaClases from './paginas/PaginaClases'
import { NoEncontrado } from './componentes/NoEncontrado'
import PaginaClase from './paginas/PaginaClase'
import PaginaEntrar from './paginas/PaginaEntrar'
import PaginaRegistro from './paginas/PaginaRegistro'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/clases" replace />} />

        <Route path="/clases">
          <Route index element={<PaginaClases />} />
          <Route path=':id' element={<PaginaClase/>}></Route>
        </Route>

        <Route path='entrar' element={<PaginaEntrar></PaginaEntrar>}></Route>
        <Route path='registro' element={<PaginaRegistro></PaginaRegistro>}></Route>
        
        <Route path='*' element={<NoEncontrado />}></Route>
      </Route>
    </Routes>
  )
}

export default App