import './App.scss';
import Searchbar from './components/Searchbar';
import Header from './components/Header';
import Favourites from './components/Favourites'
import {useState} from 'react'
import Login from './components/Login';

// Began building at SearchBar first
function App() {

  const [updateFavourite, setUpdateFavourite] = useState(0)
  const [page, setPage] = useState('main') //page which is being displayed (login or main)
  const [btnText, setBtnText] = useState('Login / Sign up') //update text on login button
  const [favorites, setFavorites] = useState([])
  let [bookPage,setBookPage] = useState(1) //current batch of books from api 
  
  if (page === 'main'){
    return (
      <div className="App">
        <Header setPage={setPage} btnText={btnText} setBtnText = {setBtnText} page={page}/>
        <main className='grid'>
          <Favourites updateFavourite={updateFavourite} setUpdateFavourite={setUpdateFavourite} favorites={favorites} setFavorites={setFavorites}/>
          <Searchbar updateFavourite={updateFavourite} setUpdateFavourite={setUpdateFavourite} setPage={setPage} bookPage={bookPage} setBookPage={setBookPage} favoruites={favorites}/>
        </main>
      </div>
    );
  } else if (page === 'login'){
    return (
      <div className="App">
        <Header setPage={setPage} btnText={btnText} setBtnText={setBtnText}/>
        <div className="home">
          <Login setPage={setPage} page={page} setBtnText={setBtnText}/>
        </div>
      </div>
      
    )
  }
}

export default App;
