import React from 'react'
import logoTBL from '../assets/TheBoringLibrary.png'
import LoginBtn from './LoginBtn'

const Header = ({setPage,btnText,setBtnText,page}) => {

  return (
    <header className='flex-center-a'>
      <div className="logo-container">
        <img src={logoTBL} alt="The Boring Libray Logo" onClick = {() => {setPage('main')}}/>
      </div>
      <LoginBtn page={page} setPage={setPage} btnText={btnText} setBtnText={setBtnText} />
    </header>
  )
}

export default Header