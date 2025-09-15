import React from "react";
import Header from "../Header";
import backgroundImage from "../../assets/images/background.png";

// src/App.jsx
import Main from "../main/Main";

const Home = () => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="bg-cover bg-center h-[1550px] w-full"
      >
        <Header />
        <Main />
      </div>
    </>
  );
};

export default Home;
