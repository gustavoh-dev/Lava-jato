import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import ProtectedRoute from './ProtectedRoute';
import DashboardPage from '../pages/dashboard';
import ClientesPage from '../pages/clientes';
import VeiculosPage from '../pages/veiculos';
import AgendamentosPage from '../pages/agendamentos';
import PaymentsPage from '../pages/pagamentos';
import UsuariosPage from '../pages/usuarios';
import ServicosPage from '../pages/servicos';
import LoginPage from '../pages/auth';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/veiculos" element={<VeiculosPage />} />
            <Route path="/agendamentos" element={<AgendamentosPage />} />
            <Route path="/pagamentos" element={<PaymentsPage />} />
            <Route path="/usuarios" element={<UsuariosPage />} />
            <Route path="/servicos" element={<ServicosPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
