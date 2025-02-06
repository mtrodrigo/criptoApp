import styles from './footer.module.css'

export function Footer(){
    return(
        <footer className={styles.container}>
            <p>© 2025 Cripto App - Todos direitos reservados</p>
            <p>Criado por <a href="https://www.linkedin.com/in/rodrigo-marques-tavares-9482b4226/" target='_blank'>Rodrigo Marques Tavares</a></p>
        </footer>
    )
}