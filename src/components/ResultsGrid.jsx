import React from "react";
import Modal from "./Modal";
import { Popup } from "reactjs-popup";
import {
  addToFavourites,
  removeFavourite,
} from "../Utilities/favouritesFunction";

function Book({
  favourites,
  book,
  updateFavourite,
  setUpdateFavourite,
  favorites,
  setFavorites,
  setPage,
}) {
  // console.log("book", book.volumeInfo.title)
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

  let inFavs = false;
  let btnText = "ADD TO FAVOURITES ⭐️";
  for (let fav of favourites) {
    if (fav.id === id) {
      btnText = "REMOVE FROM FAVOURITES ❌";
      inFavs = true;
    }
  }

  const handleFavourites = (e) => {

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
    <>
      <Popup
        trigger={
          <div className="book flex-column" key={book.id}>
            <div className="thumbnail-container flex">
              <img src={thumbnail} alt={`${title} Cover `}></img>
            </div>
            <div className="info-container flex-column">
              <div className="title-container">
                 <h2>{title}</h2>
              </div>
              <div className="authors-container">

            <h2>{authors}</h2>
              </div>
              <div className="add-to-fav-btn">
                <button
                  onClick={(e)=> (handleFavourites(e))}
                >
                  {btnText}
                </button>
              </div>
            </div>
          </div>
        }
        modal
      >
        <Modal
          key={id + "modal"}
          title={title}
          author={authors}
          desc={description}
          thumbnail={thumbnail}
        />
      </Popup>
    </>
  );
}

const ResultsGrid = (props) => {
  return (
    <div className="search-results grid">
      {props.books.map((book) => (
        <Book
          favourites={props.favourites}
          updateFavourite={props.updateFavourite}
          setUpdateFavourite={props.setUpdateFavourite}
          favorites={props.favorites}
          setFavorites={props.setFavorites}
          setPage={props.setPage}
          key={book.id}
          book={book}
        />
      ))}
    </div>
  );
};

export default ResultsGrid;
