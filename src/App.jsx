import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CreateStayForm from './components/CreateStayForm';
import StayDetail from './pages/StayDetail';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '130px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateStayForm />} />
          <Route path="/stays/:id" element={<StayDetail />} />
        </Routes>
      </main>
      <Footer/>
    </>
  );
}

export default App;
