import React from "react";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import StayRecommendations from "../components/StayRecommendatios";
import StayListSection from "../components/stays/StayListSection";
import "../styles/pages/Home.css";

const Home = () => {
  return (
    <main className="home">
      <div className="home-content">
        {/* <SearchBar /> */}
        {/* <StayRecommendations /> */}
        <StayListSection />
      </div>
    </main>
  );
};

export default Home;
