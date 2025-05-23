import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CreateStayForm from './components/CreateStayForm';
import StayDetail from './pages/StayDetail';
import Footer from './components/Footer';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <>
      <Header />
      <main style={{flex: 1, minHeight: '100%', paddingTop: '130px', margin: '20px', padding: '0' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateStayForm />} />
          <Route path="/stays/:id" element={<StayDetail />} />
          <Route path='administracion' element={<AdminPanel/>}/>
        </Routes>
      </main>
      <Footer/>
    </>
  );
}

export default App;
