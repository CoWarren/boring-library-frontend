// rafce shorthand command to build react arrow function component
import React, {useState, useEffect} from 'react'


const Searchbar = () => {
  
 
  const [books, setBooks] = useState([])

  useEffect(() => {

  }, []) // [] dependencies

  async function handleSubmit(event) {
    event.preventDefault();

    const params = event.target[0].value

    //fetch 
    const response = await fetch(`replace with link & Key`)
    const data = await response.json()
    const { items } = data
    setBooks(items)
   
  }

  return (
    <div className='results'>
      <form onSubmit={ handleSubmit }>
        <input type="text" 
        placeholder="Search"
        // onChange={(e) => search(e.target.value)}
        />
        <button>Search</button>
      </form>
      <ul>
        
        {books.map(function(book){
          const {id, volumeInfo, } = book
          const {title, authors, description, imageLinks} = volumeInfo
          const { thumbnail, smallThumbnail } = imageLinks
          console.log(id, title, authors, description, thumbnail, smallThumbnail)
          return (
            // component instead is better practice
            <li key={id}>
             {title} <br></br> {description}
            </li>
          )
        })}
      </ul>
    </div>

  )
}

export default Searchbar
// Fetch API 

// return UI (user interface references to DOM)
// Map component 
// Add a key to component to adhere to React standards