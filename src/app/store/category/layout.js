import styles from'./layout.module.css';

export default function Layout({ children }) {
  return (

    <main className={styles.mainLayout}>
      <nav className={styles.layoutNav}>Navegación de las categorías</nav>
      {children}
    </main>
  );
}

