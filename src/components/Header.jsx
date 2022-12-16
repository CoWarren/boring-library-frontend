import React from 'react'
import logoTBL from '../assets/TheBoringLibrary.png'

const LoginBtn = ({page,btnText,setBtnText,setPage}) => {
  if (page === 'main'){
    return <button onClick={() => {setBtnText('Login / Sign up');setPage('login')}}>{btnText}</button>
  } else if (page === 'login'){
    return 
  }
}

const Header = ({setPage,btnText,setBtnText,page}) => {

  return (
    <div className='header'>
      <img id='logo' src={logoTBL} onClick = {() => {setPage('main')}}/>
      {/* <button onClick={() => {setBtnText('Login');setPage('login')}}>{btnText}</button> */}
      <LoginBtn page={page} setPage={setPage} btnText={btnText} setBtnText={setBtnText} />
    </div>
  )
}

export default Header