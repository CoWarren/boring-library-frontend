import React from 'react'



const LoginBtn = ({page,btnText,setBtnText,setPage}) => {
    if (page === 'main'){
      return (
      <div data-testid="loginBtn-test" className="user-btn">
        <button onClick={() => {setBtnText('Login / Sign up');setPage('login')}}>{ btnText }</button>
      </div>
      )
    } else if (page === 'login'){
      return 
    }
  }

  export default LoginBtn

  