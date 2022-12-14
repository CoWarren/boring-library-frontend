// rafce shorthand command to build react arrow function component
import React, {useState, useEffect} from 'react'
import Favourites from './Favourites'


const Searchbar = ({updateFavourite,setUpdateFavourite}) => {
  async function addToFavourites() {
    //onclick, should get the book ID
    //once it gets the book ID it should set the BOOK to the current User
    // will it have to call the setFavorites
    console.log("called function")
    setUpdateFavourite(updateFavourite+1)
  }
 
  const [books, setBooks] = useState([])

  useEffect(() => {

  }, []) // [] dependencies

  async function handleSubmit(event) {
    event.preventDefault();

    const params = event.target[0].value

    // Fetch API 
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${params}:&printType=books&keyes&key=AIzaSyBIJMC0aU7vg3Xjh6KGtl2FAtwAVFjV_uM`)
    const data = await response.json()
    const { items } = data
    setBooks(items)
  }

  return (
    <div className='results'>
      <form onSubmit={ handleSubmit }>
        <input type="text" 
        placeholder="Search"
        // onChange={(e) => search(e.target.value)}
        />
        <button>Search</button>
      </form>

      <div className='search-results'>
      {books.map(function(book){
        console.log(book)
        const {id, volumeInfo, } = book
        let {title, authors, description, imageLinks} = volumeInfo
        if (!imageLinks){
          imageLinks = {thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS896ZGLvwYZdICPJZyrHaIftMU_xy6e7IzNB7e9yFFEjB9gA468idBk56Ygdgbh8Tabw&usqp=CAU'}
        }
        const { thumbnail, smallThumbnail } = imageLinks

        //console.log(id, title, authors, description, thumbnail, smallThumbnail)

        return (
          // component instead is better practice
          <div className="book" key={id}>
            <img src={thumbnail}></img>
            <div className="title-author">
              <h2>{title}</h2>
              <h2>{authors}</h2>
            </div>
            <button onClick={function(){addToFavourites()}}>⭐️</button>
          </div>
          )
        })}
      </div>
    </div>

  )
}

export default Searchbar