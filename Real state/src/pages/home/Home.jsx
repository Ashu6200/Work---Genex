import React from "react";
import Footer from "../common/footer/Footer";
import Header from "../common/header/Header";
import Featured from "./featured/Featured";
import Hero from "./hero/Hero";
import Recent from "./recent/Recent";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Featured />
      <Recent />
      <Footer />
    </>
  );
};

export default Home;
