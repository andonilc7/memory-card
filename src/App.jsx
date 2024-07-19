import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [imgUrls, setImgUrls] = useState([])

  

  useEffect(() => {
    let isMounted = true;
    console.log("effect running")
    async function fetchData() {
      try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=Seinfeld&limit=3&offset=0&rating=g&lang=en&bundle=messaging_non_clips`);
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const json = await response.json()
        console.log(json)
        
        if (isMounted) {
          setImgUrls(prevImgUrls => 
            json.data.map((item) => item.images.original.url)
          );
          //console.log(imgUrls)
        }
        
      } catch (error) {
        console.error(error)
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    }
  }, []);

  useEffect(() => {
    console.log(imgUrls)
  }, [imgUrls])

  return (
    <>
      {imgUrls.map(imgUrl => 
        <img src={imgUrl}/>
      )}
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
