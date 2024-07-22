import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [imgs, setImgs] = useState([])

  

  useEffect(() => {
    let isMounted = true;
    console.log("effect running")
    async function fetchData() {
      try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=Arsenal&limit=12&offset=0&rating=g&lang=en&bundle=messaging_non_clips`);
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const json = await response.json()
        console.log(json)
        
        if (isMounted) {
          setImgs(prevImgs => 
            json.data.map((item) => 
              ({
                id: item.id,
                url: item.images.fixed_height.url
        }))
          );
          //console.log(imgs)
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
    console.log(imgs)
  }, [imgs])

  return (
    <>
      {imgs.map(img => 
        <img src={img.url} key={img.id}/>
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
