import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import DashboardPage from '../pages/dashboard';
import ClientesPage from '../pages/clientes';
import VeiculosPage from '../pages/veiculos';
import AgendamentosPage from '../pages/agendamentos';
import PaymentsPage from '../pages/pagamentos';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/veiculos" element={<VeiculosPage />} />
          <Route path="/agendamentos" element={<AgendamentosPage />} />
          <Route path="/pagamentos" element={<PaymentsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
