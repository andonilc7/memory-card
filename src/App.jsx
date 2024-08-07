import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MemoryCard from './MemoryCard.jsx'

function App() {
  const [imgs, setImgs] = useState([])
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [win, setWin] = useState(false);

  const numImgs = 9

  //fetches images on load
  useEffect(() => {
    let isMounted = true;
    console.log("effect running")
    async function fetchData() {
      try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=Arsenal&limit=${numImgs}&offset=0&rating=g&lang=en&bundle=messaging_non_clips`);
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const json = await response.json()
        console.log(json)
        
        if (isMounted) {
          setImgs(
            json.data.map((item) => 
              ({
                id: item.id,
                url: item.images.fixed_height.url,
                clicked: false
        }))
          );
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

  function handleCardClick(id) {
    //flag for determining whether we have to reset all imgs' clicked properties to false or not
    let resetImgs = false;

    //makes new images by setting the clicked image properly
    const newImgs = imgs.map(prevImg => {
      //if the id we clicked matches that of prevImg
      if (prevImg.id === id) {
        if (!prevImg.clicked) {
          console.log('not clicked')
          //add score if not clicked, set the img's clicked property to true
          const newScore = score + 1;
          setScore(newScore);
          if (newScore === numImgs) {
            setWin(true)
            setBestScore(newScore)
          }
          return {...prevImg, clicked: true}
        } else {
          //if it was already clicked, you lose
          if (score > bestScore) setBestScore(score);
          setScore(0);
          //we must reset all imgs
          resetImgs = true;
          return {...prevImg, clicked: false}
        }
      }
      //returning the img as is (have to for map) if its not the clicked one
      return prevImg
      
    })

    //randomly shuffles by returning random number that is between -0.5 and 0.5
    const shuffledImgs = newImgs.sort(() => Math.random() - 0.5)

    if (resetImgs) {
      const newResetImgs = shuffledImgs.map(img => {
        return {...img, clicked: false}
      })
      setImgs(newResetImgs)
    } else {
      setImgs(shuffledImgs)
    }

  }

  //resets game after win
  function handelResetGame() {
    setScore(0);
    const resetGameImgs = imgs.map(img => {
      return {...img, clicked: false}
    })
    setImgs(resetGameImgs)
    setWin(false)
  }

  return (
    <>
    <h1 className="title">Memory Card Game</h1>
    <div>Score: {score}</div>
    <div>
      Best score: {bestScore}
    </div>
    {win ? (
      <div>
      <div>Congratulations, you won!</div>
      <button onClick={() => {
        handelResetGame()
      }}>Click to reset</button>
      </div>
    ) : (
      <div className="card-cont">
      {imgs.map(img => 
        <MemoryCard 
        imgUrl = {img.url}
        imgId={img.id}
        />
      )}
      </div>
    ) }
    
    </>
  )
}

export default App
