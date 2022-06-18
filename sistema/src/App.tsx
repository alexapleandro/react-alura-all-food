import AdministracaoRestaurantes from 'paginas/Administracao/Restaurantes/AdministracaoRestaurantes';
import FormularioRestaurante from 'paginas/Administracao/Restaurantes/FormularioRestaurante';
import { Routes, Route } from 'react-router-dom';
import Home from 'paginas/Home';
import VitrineRestaurantes from 'paginas/VitrineRestaurantes';
import PaginaBaseAdministracao from 'paginas/Administracao/Restaurantes/PaginaBaseAdministracao';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<PaginaBaseAdministracao />}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
      </Route>
    </Routes>
  );
}

export default App;
