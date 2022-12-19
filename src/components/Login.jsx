import React, {useState} from 'react'

const Login = ({setPage,setBtnText}) => {

  const [loginStatus, setLoginStatus] = useState(null)
  sessionStorage.setItem("userId", -1) //log used out

  async function loginAccount(){
    const res = await fetch('http://localhost:8080/account/login',{
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        username: document.getElementById('username-input').value,
        password: document.getElementById('password-input').value
      }),
      method: 'POST'
    })

    const accountId = await res.json()
    if (accountId !== -1){ //login
      sessionStorage.setItem("userId", accountId);
      setBtnText('Logout')
      setPage('main')
    } else { //login failed, account does not exist
      console.log('login failed')
      setLoginStatus("failed")

    }
  }

  async function createAccount(){

    if (!document.getElementById('username-input').value || !document.getElementById('password-input').value){
      setLoginStatus("failed")
      console.log('Create account failed!')
      return
    }

    const res =  await fetch(`http://localhost:8080/account/create`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: document.getElementById('username-input').value,
        password: document.getElementById('password-input').value
      }) 
    })
    const accountId = await res.json()
    if(accountId !== -1){
      sessionStorage.setItem("userId", accountId)
      setBtnText('Logout')
      setPage('main')
    }else{
      setLoginStatus("failed")
      console.log('Create account failed!')
    }
  }
  return (
    <div className='form-container'>
      <div className='form-wrapper'>
        <form>
          <div className='form-header'>Login/Register</div>
          <input id="username-input" type='text' placeholder='username'/>
          <input id="password-input" type='password' placeholder='password'/>
          <button type="button" onClick={() => {loginAccount()}}>Login</button>
          <button type="button" onClick={() => {createAccount()}}>Create Account</button>
        { loginStatus === "failed" &&
           <div className='form-error-text'>Incorrect Username or Password</div>
        }
        </form>
      </div>
    </div>
  )
}

export default Login