// rafce shorthand command to build react arrow function component
import React, {useState, useEffect} from 'react'
import Favourites from './Favourites'



const Searchbar = ({updateFavourite,setUpdateFavourite, setPage, bookPage, setBookPage,favoruites}) => {

  const [books, setBooks] = useState([])
  const [err, setErr] = useState('')
  const nResults = 40 //how many books are returned on one search

  useEffect(() => {
  }, []) // [] dependencies

  async function addToFavourites(authors,title,id,thumbnail) {
    //console.log("called function")

    //onclick, should get the book ID
    //once it gets the book ID it should set the BOOK to the current User
    // will it have to call the setFavorites
    
    // if(sessionStorage.getItem('userId') == -1){
    //   setPage('login')
    // }

    try {
      fetch(`http://localhost:8080/users/${sessionStorage.getItem('userId')}`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        author: authors,
        title: title,
        id: id,
        thumbnail: thumbnail
      })
    }).then((res) => {
      //console.log(typeof res.url)
      if (!res.ok){
        return
      }

      if (res.url != 'http://localhost:8080/users/-1'){ //if user is logged in
        setUpdateFavourite(updateFavourite+1)
      } else{
        setPage('login')
      }
      
    })} catch (error) {
      setErr('Error on fetch')
    }
  } 
 
  async function handleSubmit(event) {
    event.preventDefault();

    const params = document.getElementById('search-params').value//event.target[0].value

    console.log(bookPage)
    // Fetch API
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${params}:&printType=books&startIndex=${bookPage*40}&maxResults=${nResults}&keyes&key=AIzaSyBIJMC0aU7vg3Xjh6KGtl2FAtwAVFjV_uM`)
    const data = await response.json()
    const { items } = data

    setBooks(items)
  }

  function changePage(diff){
    setBookPage(bookPage+diff)
    if (bookPage === -1){
      setBookPage(0)
    }
  }

  async function removeFavourite(bookId){
    //user/userID/bookID
    fetch(`http://localhost:8080/users/${sessionStorage.getItem('userId')}/${bookId}`, {
      method: 'DELETE'
    }).then(function(){setUpdateFavourite(updateFavourite+1)})

    // console.log('Delete ' + bookId)
  }

  return (
    <div className='results'>
      <form onSubmit={ handleSubmit }>
        <input id='search-params' type="text" 
        placeholder="Search"
        // onChange={(e) => search(e.target.value)}
        />
        <button>Search</button>

        <div className = 'page-buttons'>
          <button onClick={(e) => {if (bookPage > 0){changePage(-1);handleSubmit(e)}}} >←</button>
          <button onClick={(e) => {changePage(1);handleSubmit(e)}} >→</button>
        </div>

      </form>

      <div className='search-results'>
      {books.map(function(book){
        // console.log(book)
        const { id, volumeInfo, } = book
        let {title, authors, description, imageLinks} = volumeInfo
        if (!imageLinks){
          imageLinks = {thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS896ZGLvwYZdICPJZyrHaIftMU_xy6e7IzNB7e9yFFEjB9gA468idBk56Ygdgbh8Tabw&usqp=CAU'}
        }
        const { thumbnail, smallThumbnail } = imageLinks

        //console.log(id, title, authors, description, thumbnail, smallThumbnail)
        let inFavs = false
        let btnText = 'ADD TO FAVOURITES ⭐️'
        for (let fav of favoruites){
          if (fav.id === id){
            btnText = 'REMOVE FROM FAVOURITES ❌'
            inFavs = true
          }
        }
        
        return (
          // component instead is better practice
          <div className="book" key={id}>
            <img src={thumbnail}></img>
            <div className="title-author">
              <h2>{title}</h2>
              <h2>{authors}</h2>
            </div>
            <button onClick={function(){
              if (!inFavs){ //add to favourites bar
                addToFavourites(authors.toString(),title,id,thumbnail)
              } else{
                console.log(2)
                removeFavourite(id)
              }
              
              }}>{btnText}</button>
          </div>
          )
        })}
      </div>
    </div>

  )
}

export default Searchbar