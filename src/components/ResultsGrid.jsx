import React from "react";
import Modal from "./Modal";
import { Popup } from "reactjs-popup";
import { addToFavourites, removeFavourite } from "../Utilities/favouritesFunction";

const ResultsGrid = (props) => {
  return (
    <div className="search-results">
      {props.books.map(function (book) {
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
        for (let fav of props.favourites) {
          if (fav.id === id) {
            btnText = "REMOVE FROM FAVOURITES ❌";
            inFavs = true;
          }
        }
        return (
          <>
            <Popup
              key={id + "popup"}
              trigger={
                <div className="book" key={id}>
                  <img src={thumbnail}></img>
                  <h2>{title}</h2>
                  <h2>{authors}</h2>
                  <button
                    onClick={function (e) {
                      if (!inFavs) {
                        //add to favourites bar
                        addToFavourites(
                          e,
                          authors.toString(),
                          title,
                          id,
                          thumbnail,
                          props.updateFavourite,
                          props.setUpdateFavourite,
                          props.favorites,
                          props.setFavorites,
                          props.setPage
                        );
                      } else {
                        removeFavourite(
                          e,
                          id,
                          props.updateFavourite,
                          props.setUpdateFavourite,
                          props.favorites,
                          props.setFavorites
                        );
                      }
                    }}
                  >
                    {btnText}
                  </button>
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
        // component instead is better practice
      })}
    </div>
  );
};

export default ResultsGrid;
