import React, { useState } from "react";
import logoTBL from "../assets/TheBoringLibrary.png";
import LoginBtn from "./LoginBtn";

const Header = ({ setPage, btnText, setBtnText, page }) => {
  const [username, setUsername] = useState("");

  function showUsername() {
    if (sessionStorage.getItem("userId") !== "-1" && page === "main") {
      fetch(`http://localhost:8080/account/${sessionStorage.getItem("userId")}`)
        .then((req) => req.json())
        .then((data) => setUsername(data.username));

      return (
        <div data-testid="header-username" className="username-container">
          <h2>Logged in as: {username}</h2>
        </div>
      );
    } else if (page === "main") {
      return (
        <div className="username-container">
          <h2>Not Signed In</h2>
        </div>
      );
    }
  }

  return (
    <header data-testid="header-test" className="flex-center-a">
      <div className="logo-container">
        <img
          data-testid="header-img-test"
          src={logoTBL}
          alt="The Boring Libray Logo"
          onClick={() => {
            setPage("main");
          }}
        />
      </div>
      <div className="user-interaction-ctrl-container flex">
        {showUsername()}
        <LoginBtn
          page={page}
          setPage={setPage}
          btnText={btnText}
          setBtnText={setBtnText}
        />
      </div>
    </header>
  );
};

export default Header;
