import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CoinProps } from "../home"
import styles from './detalhes.module.css'
interface ResponseData {
    data: CoinProps
}
interface ErrorData{
    error: string
}
type DataProps = ResponseData | ErrorData

export function Detalhes(){

    const {cripto} = useParams()
    const navigate = useNavigate()
    const [coin, setCoin] = useState<CoinProps>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getCoin() {
            try{
                fetch(`https://api.coincap.io/v2/assets/${cripto}`)
                .then(response => response.json())
                .then((data: DataProps) => {
                    if("error" in data){
                        navigate("/")
                        return;
                    }
                    const price = Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD"
                    }) 
                    const priceCompact = Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        notation: "compact"
                    })
                    const resultData = {
                        ...data.data,
                        formatedPrice: price.format(Number(data.data.priceUsd)),
                        formatedMarket: priceCompact.format(Number(data.data.marketCapUsd)),
                        formatedVolume: priceCompact.format(Number(data.data.volumeUsd24Hr))
                    }
                    setCoin(resultData);
                    setLoading(false)
                })
            }catch(err){
                console.log(err);
                navigate("/")
            }
        }
        getCoin()
    }, [cripto])

    if(loading || !coin){
        return(
            <section className={styles.container}>
                <h4 className={styles.center}>Carregando detalhes...</h4>
            </section>
        )
    }
    return(
        <section className={styles.container}>
            <div className={styles.content}>
                <img 
                alt="Logo Moeda"
                src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLocaleLowerCase()}@2x.png`}
                />
                <h1>{coin.name} | {coin.symbol}</h1>
                <p><strong>Preço: </strong>{coin?.formatedPrice}</p>
                <p><strong>Mercado: </strong>{coin?.formatedMarket}</p>
                <p><strong>Volume: </strong>{coin?.formatedVolume}</p>
                <p><strong>Mudança 24h: </strong>
                    <span className={Number(coin?.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss}>{
                        Number(coin?.changePercent24Hr).toFixed(3)}%
                    </span>
                </p>
            </div>
        </section>
    )
}