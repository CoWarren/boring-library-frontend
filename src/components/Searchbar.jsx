// rafce shorthand command to build react arrow function component
import React, { useState, useEffect } from "react";
import magnify from "../assets/magnifyingGlass.png";
import ResultsGrid from "./ResultsGrid";
import PageBtns from "./PageBtns";

const Searchbar = (props) => {
  // const [err, setErr] = useState('')
  const [books, setBooks] = useState([]);
  const nResults = 40; //how many books are returned on one search

  useEffect(() => {
    handleSubmit(false, "java");
    //second parameter is deafult search that will be displayed on load
  }, []); // [] dependencies

  const handleSubmit = async (event, defaultSearch) => {
    let params = "";

    // On mount, display 'java' search results
    if (event) {
      event.preventDefault();
      params = document.getElementById("search-params").value; //event.target[0].value
    } else {
      params = defaultSearch;
    }

    // Fetch API
    // const response = await fetch(
    //   `https://www.googleapis.com/books/v1/volumes?q=${params}:&printType=books&startIndex=0&maxResults=${nResults}&keyes&key=AIzaSyDO65f50s9nWzZSOFx3m10BJgc5PSzcQUo`
    // );
    // const data = await response.json();
    // const { items } = data;
    //console.log(data)

    //Fetching off API through backend (this is new)
    const response = await fetch(
      `http://localhost:8080/API/${params.split(" ").join("")}/0`
    );
    const { items } = await response.json();
    setBooks(items);
  };

  return (
    <div className="main-section flex-column">
      <div className="searchbar-container flex-center-a">
        <form className="searchbar-form-container flex" onSubmit={handleSubmit}>
          <div className="searchbar-form-input-container">
            <input
              id="search-params"
              type="text"
              placeholder="Search" // onChange={(e) => search(e.target.value)}
            />
            <button className="search-btn">
              <img src={magnify} />
            </button>
          </div>

          <PageBtns setBooks={setBooks} />
        </form>
      </div>

      <ResultsGrid
        favourites={props.favourites}
        books={books}
        updateFavourite={props.updateFavourite}
        setUpdateFavourite={props.setUpdateFavourite}
        favorites={props.favorites}
        setFavorites={props.setFavorites}
        setPage={props.setPage}
      />
    </div>
  );
};

export default Searchbar;
