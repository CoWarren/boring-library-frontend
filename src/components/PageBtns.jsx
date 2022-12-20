import React from 'react'

const PageBtns = () => {

    //DIFFERENT COMPONENT (Next and previous page for book results)
  async function changePage(diff){
    // int var keeps count of current index
    // logic for increments back and forth
    //setBookPage(currentIndex)
    if (diff === -1){
      if (bookPage > 0){
        setBookPage(bookPage-1)
      }
    } else{
      setBookPage(bookPage+1)
    }

    let params = document.getElementById('search-params').value //event.target[0].value
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${params}:&startIndex=${bookPage}&printType=books&maxResults=${nResults}&keyes&key=AIzaSyBVFORSWf-PrtLdl80E1i75-y6UFU_Y74c`)
    const data = await response.json()
    const { items } = data

    setBooks(items)

  }

  return (
      <></>
  )
}

export default PageBtns