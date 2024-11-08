import './layout.css';

export default function Layout({ children }) {
  return (
    <main className="main-layout">
      <nav className="layout-nav">Navegación de la app de empresa</nav>
      {children}
    </main>
  );
}
