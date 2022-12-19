// rafce shorthand command to build react arrow function component
import React, {useState, useEffect} from 'react'
import {Popup} from 'reactjs-popup'
import Modal from './Modal';
import searchImg from '../assets/magnifyingGlass.png'

const Searchbar = ({updateFavourite,setUpdateFavourite, setPage, bookPage, setBookPage,favoruites}) => {
  
  const [books, setBooks] = useState([])
  const [err, setErr] = useState('')
  
  const showModal = (id, thumbnail, title, authors, btnText, inFavs, description) => (
    <Popup trigger={
      <div className="book" key={id}> 
              <img src={thumbnail}></img>
              <h2>{title}</h2>
              <h2>{authors}</h2>
              <button onClick={function(e){
                if (!inFavs){ //add to favourites bar
                  addToFavourites(e,authors.toString(),title,id,thumbnail)
                } else{
                  removeFavourite(e,id)
                }  
        }}>{btnText}</button>       
    </div>
    } modal>
      <Modal key={id + "modal"} title={title} author={authors} desc={description} thumbnail={thumbnail}/>
    </Popup>
  );

  const nResults = 40 //how many books are returned on one search

  useEffect(() => {
    handleSubmit(false,'java') //second parameter is deafult search that will be displayed on load
  }, []) // [] dependencies

  async function addToFavourites(e,authors,title,id,thumbnail) {

    //onclick, should get the book ID
    //once it gets the book ID it should set the BOOK to the current User
    // will it have to call the setFavorites
    
    // if(sessionStorage.getItem('userId') == -1){
    //   setPage('login')
    // }

    e.stopPropagation()
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
 
  async function handleSubmit(event,defaultSearch) {
    
    let params = ''
    if (event){
      event.preventDefault();
      params = document.getElementById('search-params').value //event.target[0].value
    } else{
      params = defaultSearch
    }

    // Fetch API
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${params}:&printType=books&startIndex=0&maxResults=${nResults}&keyes&key=AIzaSyBVFORSWf-PrtLdl80E1i75-y6UFU_Y74c`)
    const data = await response.json()
    const { items } = data

    setBooks(items)
  }

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

  async function removeFavourite(e,bookId){
    //user/userID/bookID
    e.stopPropagation()
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
        <button>
          <img src={searchImg}/>
        </button>
        {showModal()}

        <div className = 'page-buttons'>
          <button onClick={(e) => {changePage(-1)}}>←</button>
          <h2 id='page-number'>{bookPage}</h2>
          <button onClick={(e) => {changePage(1)}} >→</button>
        </div>

      </form>

      <div className='search-results'>
      
      {books.map(function(book){
        const { id, volumeInfo, } = book
        let {title, authors, description, imageLinks} = volumeInfo
        if (authors){
          authors = authors.join(", ")
        }

        if (!imageLinks){
          imageLinks = {thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS896ZGLvwYZdICPJZyrHaIftMU_xy6e7IzNB7e9yFFEjB9gA468idBk56Ygdgbh8Tabw&usqp=CAU'}
        }
        const { thumbnail, smallThumbnail } = imageLinks

        let inFavs = false
        let btnText = 'ADD TO FAVOURITES ⭐️'
        for (let fav of favoruites){
          if (fav.id === id){
            btnText = 'REMOVE FROM FAVOURITES ❌'
            inFavs = true
          }
        }
        
        return showModal(id, thumbnail, title, authors, btnText, inFavs,description)
      
          // component instead is better practice
        })}
      </div>
    </div>

  )
}

export default Searchbar