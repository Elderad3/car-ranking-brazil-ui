import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import Head from 'next/head'
import { ChartBarIcon } from '@heroicons/react/solid'
import LineChartComponent from '../../components/LineChartComponent';
import { useState } from 'react';
import { useEffect } from 'react';
import { server } from '../../config';

function Carro() {
    const router = useRouter()
    const { id } = router.query

    const [ranking, setRanking] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`${server}/api/ranking/carro/${id}`)
            .then(response => response.json())
            .then(res => {
                res.sort((x, y) => { return x.ano - y.ano })
                setRanking(res)
            })
            .catch(error => console.error("Erro: ", error))
        setLoading(false)
    }, [])

    return (
        <Layout>
            <Head>
                <title>{ranking[0]?.marca} - {ranking[0]?.modelo}</title>
                <meta name="description" content="Informações do Carros"></meta>
            </Head>
            <div className="container">
                <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-1">
                        <div className="p-6 bg-white rounded shadow">
                            <div>
                                <span className="text-5xl font-semibold text-gray-400">{ranking[0]?.marca}</span>
                                <span className="text-8xl font-bold">{ranking[0]?.modelo}</span>
                            </div>
                        </div>
                </div>

                <div className="mt-2">
                    <h4 className="uppercase text-base font-bold text-gray-500">Ranking Geral</h4>
                </div>

                <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-5">
                    {ranking?.map(item => (

                        <div key={item.id} className="p-6 bg-white rounded shadow">
                            <div>
                                <p className="text-sm font-semibold text-gray-400">Ano: {item.ano}</p>
                                <p className="text-sm font-semibold text-gray-400">Posição: {item.posicao}</p>
                            </div>
                            <div className="flex justify-start items-center">
                                <ChartBarIcon className="h-6 w-6 text-azul mr-2" />
                                <h1 className="font-bold">{item.quantidade}</h1>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-2">
                    <h4 className="uppercase text-base font-bold text-gray-500">Quantidade por Ano</h4>
                </div>
                <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-1">
                    <div className="bg-white p-6 rounded shadow">
                        <p className="text-xs text-gray-400">Fonte: Fenabrave</p>
                        <LineChartComponent labels={ranking?.map(item => item.ano)}
                            valores={ranking?.map(item => item.quantidade)} titulo={"Quantidade"} />
                    </div>
                </div >
                <div className="mt-2">
                    <h4 className="uppercase text-base font-bold text-gray-500">Posição por Ano</h4>
                </div>
                <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-1">
                    <div className="bg-white p-6 rounded shadow">
                        <p className="text-xs text-gray-400">Fonte: Fenabrave</p>
                        <LineChartComponent labels={ranking?.map(item => item.ano)}
                            valores={ranking?.map(item => item.posicao)} titulo={"Posição"} />
                    </div>
                </div >
            </div>
        </Layout>)
}

export default Carro