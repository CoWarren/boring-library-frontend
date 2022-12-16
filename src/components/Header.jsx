import React from 'react'

const LoginBtn = ({page,btnText,setBtnText,setPage}) => {
  console.log(page)
  if (page === 'main'){
    return <button onClick={() => {setBtnText('Login');setPage('login')}}>{btnText}</button>
  } else if (page === 'login'){
    return 
  }
}

const Header = ({setPage,btnText,setBtnText,page}) => {

  return (
    <div className='header'>
      <img src='../assets/TheBoringLibrary.png'/>
      <h1>The Boring Library</h1>
      {/* <button onClick={() => {setBtnText('Login');setPage('login')}}>{btnText}</button> */}
      <LoginBtn page={page} setPage={setPage} btnText={btnText} setBtnText={setBtnText} />
    </div>
  )
}

export default Header