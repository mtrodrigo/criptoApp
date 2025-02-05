import styles from './header.module.css'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.png'

export function Header(){
    return(
        <header className={styles.header}>
            <Link to='/'>
                <img src={Logo} alt="Logo Cripto App" />
                <h1>Cripto App</h1>
            </Link>
            
        </header>
    )
}