import './App.scss';
import Searchbar from './components/Searchbar';
import Header from './components/Header';
import Favourites from './components/Favourites'
import {useState} from 'react'

// Began building at SearchBar first
function App() {

  const [updateFavourite, setUpdateFavourite] = useState(0)
  
  return (
    <div className="App">
      <Header/>
      <main className='grid'>
        <Favourites updateFavourite={updateFavourite}/>
        <Searchbar updateFavourite={updateFavourite} setUpdateFavourite={setUpdateFavourite} />
      </main>
    </div>
  );
}

export default App;
