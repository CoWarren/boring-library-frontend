import React, { useState, useEffect } from "react";
import {addToFavourites, removeFavourite} from "../Utilities/favouritesFunction"

const Favourites = ({
  updateFavourite,
  setUpdateFavourite,
  favorites,
  setFavorites,
  setPage,
}) => {
  const [wishList, setWishList] = useState([]);
  const [readList, setReadList] = useState([]);
  const [filteredRead, setFilteredRead] = useState(false);
  const [filteredWishList, setFilteredWishList] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/users/${sessionStorage.getItem("userId")}`)
      .then((res) => res.json())
      .then((data) => {
        return setFavorites(data);
      }); //getting error here in console though it doesn't stop any functionality

    // two more api request one to remove from the database
    //(needs to be a route or this could work on the same route which would add if book is not in, and remove if book is in)
    fetch(`http://localhost:8080/users/get/wishList/${sessionStorage.getItem("userId")}`, {method: "GET"})
    .then((res) => res.json())
    .then((data) => {
      setWishList(data);
    });
    fetch(`http://localhost:8080/users/get/readList/${sessionStorage.getItem("userId")}`, {method: "GET"})
    .then((res) => res.json())
    .then((data) => {
      setReadList(data);
    });
  }, [updateFavourite]); //(JSON ERROR)

  async function editWishList(bookId) {
    fetch(
      `http://localhost:8080/users/${sessionStorage.getItem(
        "userId"
      )}/${bookId}/wishList`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setWishList(data);
      })
      .then(function () {
        setUpdateFavourite(updateFavourite + 1);
      });
  }

  async function editReadList(bookId) {
    fetch(
      `http://localhost:8080/users/${sessionStorage.getItem(
        "userId"
      )}/${bookId}/readList`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setReadList(data);
      })
      .then(function () {
        setUpdateFavourite(updateFavourite + 1);
      });
  }

  function handleReadFilter() {
    if (filteredRead === true) {setFilteredRead(false)}
    if (filteredRead === false){setFilteredRead(true)}
  }

  function handleWishListFilter() {
    if (filteredWishList === true) {setFilteredWishList(false)}
    if (filteredWishList === false){setFilteredWishList(true)}
  }

  return (
    <div className="favourites">
      <div className="fav-header">
        <h1>Favourites</h1>

        <section>
          <button
          onClick={handleReadFilter}
          >
            { !filteredRead ? "filter books marked as read":"filtered by read" }
          </button>
          <button
          onClick={handleWishListFilter}
          >
            {!filteredWishList? "filter books marked on wishlist":"filtered by wishlist"}
          </button>
        </section>
      </div>

      <div className="flex books">
        {/* <form action="">
          <input
            className="search-favs"
            placeholder="Search through your favourites"
          />
          <button></button>
        </form> */}
        {favorites.length === 0 && (
          <h2 className="errorText">No favourites to display</h2>
        )}

        {favorites.map(function (book) {
          if(!filteredWishList || filteredWishList && wishList.includes(book.id)){
            if (!filteredRead || filteredRead && readList.includes(book.id)){
              return (
                <div key={book.id} className="book">
                  <img src={book.thumbnail} />
                  <h2>{book.title}</h2>
                  <h2>{book.author}</h2>
                  <section className="filter-buttons">
                    <button
                      onClick={function () {
                        editReadList(book.id);
                      }}
                    >
                    {readList.includes(book.id)
                      ? "remove from to read list"
                      : "add to read list"}
                  </button>
                  <button
                    onClick={function () {
                      editWishList(book.id);
                    }}
                  >
                    {wishList.includes(book.id)
                      ? "remove from wish list"
                      : "Add to wish list"}
                  </button>
                </section>
                <button className = 'fav-button'
                  onClick={function (event) {
                    removeFavourite(event,book.id,updateFavourite,
                      setUpdateFavourite,
                      favorites,
                      setFavorites);
                  }}
                >
                  REMOVE FROM FAVOURITES ❌
                </button>
              </div>
            );}}
          })}
      </div>
    </div>
  );
};

export default Favourites;
