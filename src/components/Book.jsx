import React from 'react'
import ResultsGrid from './ResultsGrid';
import xmas from '../assets/xmasHat.png'
import { addToFavourites, removeFavourite } from "../Utilities/favouritesFunction";


const Book = ({favourites,
    book,
    updateFavourite,
    setUpdateFavourite,
    favorites,
    setFavorites,
    setPage}) => {
{
      const { id, volumeInfo } = book;
      let { title, authors, description, imageLinks } = volumeInfo;
      if (authors) {
        authors = authors.join(", ");
      }
  
      if (!imageLinks) {
        imageLinks = {
          thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS896ZGLvwYZdICPJZyrHaIftMU_xy6e7IzNB7e9yFFEjB9gA468idBk56Ygdgbh8Tabw&usqp=CAU",
        };
      }
      const { thumbnail, smallThumbnail } = imageLinks;
  
      let inFavs = false; // should be applied through useState()
      let btnText = "ADD TO FAVOURITES ⭐️";
      for (let fav of favourites) {
        if (fav.id === id) {
          btnText = "REMOVE FROM FAVOURITES ❌";
          inFavs = true;
        }
      }
  
      function handleFavourites(e) {
          if (!inFavs) {
            //add to favourites bar
            addToFavourites(
              e,
              authors.toString(),
              title,
              id,
              thumbnail,
              updateFavourite,
              setUpdateFavourite,
              favorites,
              setFavorites,
              setPage
            );
          } else {
            removeFavourite(
              e,
              id,
              updateFavourite,
              setUpdateFavourite,
              favorites,
              setFavorites
            );
          }
        }
  
      return (
        <div className="book flex-column" key={book.id}>
          <div className="book-img-container">
            <img src={xmas} alt="Christmas Hat"/> 
            <img src={thumbnail} alt={`${title} thumbnail cover`} />
          </div>
        <div className="book-info-container flex-column">
          <div className="book-title-container flex">
  
            <h2>{title}</h2>
          </div>
          <div className="book-authors-container flex">
  
            <h2>{authors}</h2>
          </div>
        </div>
        <div className="book-add-to-fav-btn">
          <button onClick={(e) => handleFavourites(e)}>
            {btnText}
          </button>
        </div>
        </div>
      )
     
  }
}

export default Book