import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define a named handler so we can properly remove it later
    const handleLoad = () => setLoading(false);

    // If the document is already loaded, set loading to false immediately.
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      // Otherwise, add the load event listener.
      window.addEventListener("load", handleLoad);
      // Cleanup the event listener when the component unmounts.
      return () => window.removeEventListener("load", handleLoad);
      // a simple comment
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading_page">
      <img className="animate-pulse" src="./fontify.svg" alt="fontify" />
    </div>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
