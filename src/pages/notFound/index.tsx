import { Link } from "react-router-dom"
import styles from './notFound.module.css'

export function NotFound(){
    return(
        <section className={styles.container}>
            <div className={styles.notFound}>
                <h1>404 Page is not found</h1>
                <Link to='/'>Página incial</Link>
            </div>
        </section>
    )
}