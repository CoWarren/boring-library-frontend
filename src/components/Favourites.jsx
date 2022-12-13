import React from 'react'

export const Favourites = () => {
  
  async function getFavourites(){
    const response = await(`backend route address`) 
    const data = await response.json()
    const favorites = data 

    // two more api request one to remove from the database 
    //(needs to be a route)

    //

    // will have to setFavorites(favorites)
  }
  return (
    <h1>Favourites</h1>
  )
}
