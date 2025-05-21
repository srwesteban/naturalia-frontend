import React from 'react';
import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList'
import StayRecommendations from '../components/StayRecommendatios'

const Home = () => {
  return (
    <main className="home">
      <SearchBar />
      <CategoryList />
      <StayRecommendations />
    </main>
  );
};

export default Home;
