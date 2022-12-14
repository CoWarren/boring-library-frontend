import React, {useState, useEffect} from 'react'

const Favourites = ({updateFavourite}) => {
  const [favorites, setFavorites] = useState([])


  useEffect(() => {
    fetch(`http://localhost:8080/users/1`).then((res) => res.json()).then((data) => setFavorites(data))
    // two more api request one to remove from the database 
    //(needs to be a route or this could work on the same route which would add if book is not in, and remove if book is in)
  }, [updateFavourite])

  return (
    <div id="favourites">
      <h1>Favourites</h1>
      {favorites.map(function(book){
        return (
          <div key={book.id}>
            <h2>{book.title}</h2>
            <h2>{book.author}</h2>
            <button>❌</button>
            <br></br>
          </div>
        )
        
      })}
    </div>
  )
}

export default Favourites