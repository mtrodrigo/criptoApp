import styles from './home.module.css'
import { PiMagnifyingGlass } from "react-icons/pi";
import { Link } from 'react-router-dom';

export function Home(){
    return(
        <main className={styles.main}>
            <form className={styles.form}>
                <input 
                    type="text" 
                    placeholder='Pesquise a criptomoeda...'
                />
                <button type='submit'>
                    <PiMagnifyingGlass/>
                </button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th scope='col'>Moeda</th>
                        <th scope='col'>Valor Mercado</th>
                        <th scope='col'>Preço</th>
                        <th scope='col'>Volume</th>
                        <th scope='col'>Mudança 24h</th>
                    </tr>
                </thead>
                <tbody id='tbody'>
                    <tr className={styles.tr}>
                        <td className={styles.tdLabel} data-Label="Moeda">
                            <div className={styles.name}>
                                <Link to='/'>
                                    <span>Bitcoin</span> | BTC
                                </Link>
                            </div>
                        </td>
                        <td className={styles.tdLabel} data-Label="Valor Mercado">
                            1T
                        </td>
                        <td className={styles.tdLabel} data-Label="Preço">
                            8.000
                        </td>
                        <td className={styles.tdLabel} data-Label="Volume">
                            16B
                        </td>
                        <td className={styles.tdLabel} data-Label="Mudança 24h">
                            <span>1.20</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    )
}