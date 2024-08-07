import './MemoryCard.css'
//check above line that the path is right

export default function MemoryCard({imgUrl, imgId}) {
return (
  <>
  <img 
        className="mem-card" 
        src={imgUrl} 
        key={imgId}
        onClick={() => {
          handleCardClick(img.id)
        }
        }
        />
  </>
)
}