import React, { useState } from "react";

const PageBtns = ({ setBooks }) => {
  const nResults = 40;
  const [bookPage, setBookPage] = useState(0);

  //DIFFERENT COMPONENT (Next and previous page for book results)
  async function changePage(diff) {
    // int var keeps count of current index
    // logic for increments back and forth
    //setBookPage(currentIndex)
    if (diff === -1) {
      if (bookPage > 0) {
        setBookPage(bookPage - 1);
      }
    } else {
      setBookPage(bookPage + 1);
    }

    let params = document.getElementById("search-params").value; //event.target[0].value
    if (params === ''){
      params = 'java'
    }
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${params}:&startIndex=${
        bookPage * 40
      }&printType=books&maxResults=${nResults}&keyes&key=AIzaSyBVFORSWf-PrtLdl80E1i75-y6UFU_Y74c`
    );
    const data = await response.json();
    const { items } = data;

    console.log(items);

    setBooks(items);
  }

  return (
    <div className="page-btns flex">
      <button
        onClick={() => {
          changePage(-1);
        }}
      >
        prev
      </button>
      <button
        onClick={() => {
          changePage(1);
        }}
      >
        next
      </button>
    </div>
  );
};

export default PageBtns;
