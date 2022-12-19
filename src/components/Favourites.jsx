import React, {useState, useEffect} from 'react'

const Favourites = ({updateFavourite,setUpdateFavourite,favorites,setFavorites}) => {
  
  async function editWishList(bookId){
   //make call to API to toggle the books wishlist status
   fetch(`http://localhost:8080/users/${sessionStorage.getItem('userId')}/${bookId}/wishList`, {
      method: 'POST'
    }).then(function(){setUpdateFavourite(updateFavourite+1)})
  }

  async function editReadList(bookId){
   //make call to API to toggle the books wishlist status
  }

  async function removeFavourite(bookId){
    //user/userID/bookID
    fetch(`http://localhost:8080/users/${sessionStorage.getItem('userId')}/${bookId}`, {
      method: 'DELETE'
    }).then(function(){setUpdateFavourite(updateFavourite+1)})
  }

  useEffect(() => {
    fetch(`http://localhost:8080/users/${sessionStorage.getItem('userId')}`).then((res) => res.json()).then((data) => {
      console.log(data)
      return setFavorites(data)}) //getting error here in console though it doesn't stop any functionality
    
    // two more api request one to remove from the database 
    //(needs to be a route or this could work on the same route which would add if book is not in, and remove if book is in)
  }, [updateFavourite])

  

  return (
    <div className='favourites'>
      <h1>Favourites</h1>

      <div className="flex">
      { favorites.length === 0 &&
              <h2 className = "errorText">No favourites to display</h2>
            }
      {favorites.map(function(book){
        return (
          <div key={book.id} className="book">
            <img src={book.thumbnail} />
            <h2>{book.title}</h2>
            <h2>{book.author}</h2>
            <section>
              <button onClick={function(){editReadList(book.id)}}>Add to read list</button> {/*need to be able to toggle to remove from read --if book.id in the favourites array*/} 
              <button onClick={function(){editWishList(book.id)}}>Add to wish list</button>
            </section>
            <button onClick={function(){removeFavourite(book.id)}}>REMOVE FROM FAVOURITES ❌</button>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default Favourites