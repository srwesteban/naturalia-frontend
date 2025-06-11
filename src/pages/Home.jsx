import React from "react";
import SearchBar from "../components/search/SearchBar";
import StayRecommendations from "../components/stays/StayRecommendatios";
import StayListSection from "../components/stays/StayListSection";
import "../styles/pages/Home.css";

const Home = () => {
  return (
    <main className="home">
      <div className="home-content">
        <StayListSection />
      </div>
    </main>
  );
};

export default Home;
