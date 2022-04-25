import Head from 'next/head'
import Link from "next/link";
import Layout from '../components/Layout';
import BarChartComponent from '../components/BarChartComponent';
import { ChartBarIcon } from '@heroicons/react/solid'
import { server } from '../config/index'
import { meses, anos, agruparLista } from '../utils/index'
import { useState } from 'react';
import { useEffect } from 'react';

function Ranking() {

  const [formValues, setFormValues] = useState({ ano: 2021, mes: 13 })
  const [ranking, setRanking] = useState([])
  const [rankingPorMarca, setRankingPorMarca] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${server}/api/ranking/${formValues.ano}/${formValues.mes}`)
      .then(response => response.json())
      .then(res => {
        setRanking(res)
        setRankingPorMarca(separarRankingPorMarca(res))
      })
      .catch(error => console.error("Erro: ", error))
    setLoading(false)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData)
    const rankingJson2 = await rankingPorAnoEMes(data.ano, data.mes)
    setRankingPorMarca(separarRankingPorMarca(rankingJson2))
    setRanking(rankingJson2)
  };

  async function rankingPorAnoEMes(ano, mes) {
    try {
      setLoading(true)
      let ranking = await fetch(`${server}/api/ranking/${ano}/${mes}`);
      let rankingJson = await ranking.json()
      setLoading(false)
      return rankingJson
    } catch (error) {
      console.error("Erro: ", error)
    }
  };

  function separarRankingPorMarca(ranking) {
    const rankingMarca = []
    const listaAgrupadaPorMarca = agruparLista(ranking, 'marca')
    for (let marca in listaAgrupadaPorMarca) {
      let quantidade = listaAgrupadaPorMarca[marca].reduce(function (a, b) { return a + b["quantidade"]; }, 0);
      rankingMarca.push({ marca, quantidade });
    }
    return rankingMarca
  };

  return (
    <Layout>
      <Head>
        <title>Ranking de Emplacamentos</title>
        <meta name="description" content="Ranking de Novos Emplacamentos no Brasil"></meta>
      </Head>
      <div className="container">
        <div className="flex justify-between">

          <div className="mt-4">

            <h1 className="uppercase text-2xl font-bold">Ranking de Novos Emplacamentos</h1>
          </div>
        </div>
        <div className="mt-4">
          {/* <hr></hr> */}
        </div>
        <div className="mt-4">
          <form onSubmit={handleSubmit} >
            <select className="px-2 py-2 mr-2 rounded-md shadow-sm  border-2 focus:border-azul outline-none" name='ano' onChange={handleInputChange} value={formValues.ano || ''}>
              {anos.map(ano =>
                <option key={ano.value} value={ano.value}>{ano.value}</option>)}
            </select>
            <select className="px-2 py-2 mr-2 rounded-md shadow-sm  border-2 focus:border-azul outline-none" name='mes' onChange={handleInputChange} value={formValues.mes || ''}>
              {meses.map(mes =>
                <option key={mes.value} value={mes.value}>{mes.nome}</option>)}
            </select>
            <button className="bg-azul hover:bg-blue-900 text-white font-bold p-2 rounded" type='submit'>Buscar</button>
          </form>
        </div>
        {isLoading ? (
          <>
            <div className="flex justify-center items-center h-full h-screen overflow-auto">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-azul"></div>
            </div>
          </>
        ) : (
          <div>
            {ranking.length > 0 ? (
              <div>
                <div className="mt-4">
                  {/* <hr></hr> */}
                  <h4 className="mt-2 text-sm font-bold uppercase">10 primeiros {formValues.mes}/{formValues.ano}</h4>
                </div>
                <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-1">

                  <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-5">
                    {ranking?.filter(item => item.posicao <= 10).map(item => (
                      <Link href={`/carro/${encodeURIComponent(item.id_carro)}`}>
                        <a>
                          <div key={item.id} className="p-6 bg-white rounded shadow">
                            <div>
                              <span className="text-sm font-semibold text-gray-400">{item.posicao} - {item.modelo}</span>
                            </div>
                            <div className="flex justify-start items-center">
                              <ChartBarIcon className="h-6 w-6 text-azul mr-2" />
                              <h1 className="font-bold">{item.quantidade}</h1>
                            </div>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-2">
                    {/* <hr></hr> */}
                    <h4 className="mt-2 text-sm font-bold uppercase">Ranking Geral {formValues.mes}/{formValues.ano}</h4>
                  </div>
                  <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-1">
                    <div className="bg-white p-6 rounded shadow">
                      <p className="text-xs text-gray-400">Fonte: Fenabrave</p>
                      <BarChartComponent labels={ranking?.map(item => item.modelo)}
                        valores={ranking?.map(item => item.quantidade)} titulo={"Ranking"} />
                      <div className="grid gap-2 mt-4 md:grid-cols-3 lg:grid-cols-5">
                        {ranking.map(item => (
                          <Link href={`/carro/${encodeURIComponent(item.id_carro)}`}>
                            <a>
                          <div key={item.id} className="p-1 bg-white text-center rounded shadow">
                            <div>
                              <span className="text- sm font-bold text-gray-400"> {item.posicao} -</span>
                              <span className="text-sm font-bold text-gray-400"> {item.modelo}:</span>
                              <span className="text-sm font-bold text-black"> {item.quantidade}</span>
                            </div>
                          </div>
                          </a>
                          </Link>
                        ))
                        }
                      </div>
                    </div>
                  </div >

                </div>

                <div className="mt-6">
                  <h4 className="mt-2 text-sm font-bold uppercase">Novos Emplacamentos por Marca {formValues.mes}/{formValues.ano} (1)</h4>
                </div>
                <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
                  <div className="grid mt-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
                    {rankingPorMarca.map(item => (
                      <div key={item.id} className="p-4 bg-white  rounded shadow">
                        <div>
                          <span className="text-xs font-semibold text-gray-400">{item.marca}</span>
                        </div>
                        <div className="flex justify-start items-center">
                          <ChartBarIcon className="h-6 w-6 text-azul mr-2" />
                          <h1 className="text-xs font-bold">{item.quantidade}</h1>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-1">
                    <div className="bg-white p-6 rounded shadow">
                      <BarChartComponent labels={rankingPorMarca.map(item => item.marca)}
                        valores={rankingPorMarca.map(item => item.quantidade)} titulo={"Emplacamentos"} />
                    </div>
                  </div >
                </div>
                <div className="grid mt-4 gap-2 md:grid-cols-1 lg:grid-cols-1">
                  <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-xs text-gray-400">(1): Considerando apenas a somatória dos veículos que ocupam as 50 posições do ranking.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-full h-screen overflow-auto">
                <span className="text-sm text-gray-400">Nada encontrado, refaça a pesquisa utilizando outros parâmetros.</span>
              </div>

            )}
          </div>
        )}
      </div>

    </Layout>
  )
}
export default Ranking
