import { NavLink, Outlet } from 'react-router-dom';

const navigationItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Clientes', path: '/clientes' },
  { label: 'Veiculos', path: '/veiculos' },
  { label: 'Agendamentos', path: '/agendamentos' },
];

function AppShell() {
  return (
    <div className="app-shell">
      <header className="app-navbar">
        <div className="brand-row">
          <div className="brand-card">
            <span className="brand-badge">Sistema</span>
            <h1>Lava Jato Pro</h1>
            <p>Operacao diaria, agenda e relacionamento com clientes.</p>
          </div>
        </div>

        <nav className="app-navbar-nav" aria-label="Navegacao principal">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="content-area">
        <header className="topbar">
          <div>
            <span className="eyebrow">Painel administrativo</span>
            <h2>Gestao profissional do lava jato</h2>
          </div>
          <div className="status-pill">Base inicial pronta para evolucao</div>
        </header>

        <section className="page-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default AppShell;
