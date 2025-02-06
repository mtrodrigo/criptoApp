import styles from './home.module.css'
import { PiMagnifyingGlass } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import { useState, FormEvent, useEffect } from 'react';

export interface CoinProps{
    id: string
    name: string
    symbol: string
    vwap24Hr: string
    priceUsd: string
    changePercent24Hr: string
    rank: string
    supply: string
    maxSupply: string
    marketCapUsd: string
    volumeUsd24Hr: string
    explorer: string
    formatedPrice?: string
    formatedMarket?: string
    formatedVolume?: string
}
interface DataProps{
    data: CoinProps[]
}

export function Home(){

    const [input, setInput] = useState("")
    const [coins, setCoins] = useState<CoinProps[]>([])
    const [offSet, setOffSet] = useState(0)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        getData()
    },[offSet])

    async function getData() {
        fetch(`https://api.coincap.io/v2/assets?limit=10&offset=${offSet}`)
        .then(respose => respose.json())
        .then((data: DataProps) =>{
            const coinsData = data.data
           
            const price = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }) 
            const priceCompact = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                notation: "compact"
            }) 
        
            const formatedResult = coinsData.map((item) => {
                const formated = {
                    ...item,
                    formatedPrice: price.format(Number(item.priceUsd)),
                    formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
                    formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr))
                }
                return formated;
            })
            const listCoins = [...coins, ...formatedResult]
            setCoins(listCoins);
            setLoading(false)
        })
    }
    const handleSubmit = (e: FormEvent) =>{
        e.preventDefault();
        if(input === "") return;
        navigate(`/detalhes/${input}`)
    }
    const handleGetMore = () =>{
        if(offSet === 0){
            setOffSet(10)
            return
        }
        setOffSet(offSet + 10)
    }
    if(loading){
        return(
            <div className={styles.loading}>
                <h1>Carregando...</h1>
            </div>
    )}
    return(
        <main className={styles.main}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder='Pesquise a criptomoeda...'
                    value={input}
                    onChange={ (e) => setInput((e.target.value).toLocaleLowerCase())}
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
                    {coins.length > 0 && coins.map((item) => (
                        <tr className={styles.tr} key={item.id}>
                        <td className={styles.tdLabel} data-Label="Moeda">
                            <div className={styles.name}>
                                <img
                                    className={styles.logo}
                                    src={`https://assets.coincap.io/assets/icons/${item.symbol.toLocaleLowerCase()}@2x.png`}
                                    alt="Logo Cripto" 
                                />
                                <Link to={`/detalhes/${item.id}`}>
                                    <span>{item.name}</span> | {item.symbol}
                                </Link>
                            </div>
                        </td>
                        <td className={styles.tdLabel} data-Label="Valor Mercado">
                            {item.formatedMarket}
                        </td>
                        <td className={styles.tdLabel} data-Label="Preço">
                            {item.formatedPrice}
                        </td>
                        <td className={styles.tdLabel} data-Label="Volume">
                            {item.formatedVolume}
                        </td>
                        <td className={styles.tdLabel} data-Label="Mudança 24h">
                            <span className={Number(item.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss}>
                                {Number(item.changePercent24Hr).toFixed(3)}%
                            </span>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleGetMore} className={styles.buttonMore}>
                Carregar mais
            </button>
        </main>
    )
}