export default async function handler(req, res) {
    const {
      query: {ano},
      method,
    } = req
  
    if (method === 'GET') {
       try {
        const ranking = await fetch(`${process.env.API_URL}/ranking/${ano}`)
        const json = await ranking.json()
        return res.status(200).json(json)
       } catch (error) {
        return res.status(500).json({message: error.message})
       }
      
  } else{
        res.status(405).end(`Método ${method} não suportado`)
  }
}