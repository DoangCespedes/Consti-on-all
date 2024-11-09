import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <main className={styles.main}>
      <Image src='https://segurosconstitucion.com/wp-content/uploads/logo.webp' alt='logo' width={500} height={250}/>
        <h1 className={styles.title}>Bienvenido a Consti-on-all</h1>
        <section className={styles.content}>
          <h2>Nuestra Misión</h2>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum..</p>
        </section>
      
      </main>

    </>
  )
}