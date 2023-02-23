import { useState, useEffect } from 'react'
import './App.css'

function App () {
  const [fact, setFact] = useState()
  const [imageURL, setImageURL] = useState()

  const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

  const getKittenPic = async (words) => {
    const response = await fetch(`https://cataas.com/cat/says/${words}?size=50&color=red&json=true`)
    const data = await response.json()
    const { url } = data
    console.log(url)

    setImageURL(url)
  }

  // igual que el fetch pero asincrono
  const getRandomFact = async () => {
    const response = await fetch(CAT_ENDPOINT_RANDOM_FACT)
    const data = await response.json()
    const { fact } = data // del objeto data (respuesta de fetch), saca FACT y la guarda

    setFact(fact)

    const firstWords = fact.split(' ', 3).join(' ') // con split transformamos la frase a array usando el separador " ". el segundo elemento (3) le dices cuántos tiene que quedarse
    // vuelve a ponerlo string
    console.log(firstWords)

    getKittenPic(firstWords)
  }

  // de las formas más básicas de hacer fetch -> useEffect.  Con variable en el array entra cada vez que cambie dicha variable, sin ella entra al useEffect siempre que se recargue
  useEffect(() => {
    // fecth URL, primer THEN respuesta (JSON), segundo THEN manejas los datos
    getRandomFact()
  }, [])

  return (
    <div className='App'>
      <h1> Kittens App </h1>
      {fact && <p>{fact}</p>}
      <img src={`https://cataas.com${imageURL}`} alt={fact} />
    </div>
  )
}

export default App
