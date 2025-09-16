import React from "react";
import Header from "../Header";
import backgroundImage from "../../assets/images/background.png";

// src/App.jsx
import Main from "../main/Main";
import InfoSection from "../info-section/InfoSection";
import Testimoniala from "../testimonials/Testimonials";
import Footer from "../footer/Footer";

const Home = () => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="bg-cover bg-center h-full w-full"
      >
        <div className="sticky top-0 z-40">
          <Header />
        </div>
        <Main />
      </div>

      <InfoSection />
      <Testimoniala />
      <Footer />
    </>
  );
};

export default Home;
