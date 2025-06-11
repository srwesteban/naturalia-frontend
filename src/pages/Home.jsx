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
