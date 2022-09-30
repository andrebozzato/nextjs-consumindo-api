import { useEffect, useState } from 'react'

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  async function fetchApi() {
    try {
      setLoading(true)
      await sleep(1500)

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos/1'
      )
      const data = await response.json()

      if (!data) throw 'Erro na requisição'

      setData(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApi()
  }, [])

  return (
    <div>
      {loading && !data && <p>Carregando informações...</p>}

      {data && <p>{data.title}</p>}
    </div>
  )
}
