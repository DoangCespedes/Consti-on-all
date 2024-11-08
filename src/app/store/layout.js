// Layout.js
import styles from './layout.module.css';  

export default function Layout({ children }) {
  return (
    <main className={styles.mainLayout}> 
      <nav className={styles.layoutNav}>Navegación store</nav>  
      {children}
    </main>
  );
}
