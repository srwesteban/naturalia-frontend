import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CreateStayForm from './components/CreateStayForm';
import StayDetail from './pages/StayDetail';
import Footer from './components/Footer';
import AdminPanel from './pages/AdminPanel';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';

function App() {
  return (
    <>
      <Header />
      <main style={{flex: 1, minHeight: '100%', margin: '130px', padding: '0' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateStayForm />} />
          <Route path="/stays/:id" element={<StayDetail />} />
          <Route path='administracion' element={<AdminPanel/>}/>
          <Route path='registry' element={<RegisterForm/>}/>
          <Route path='login' element={<LoginForm/>}/>
        </Routes>
      </main>
      <Footer/>
    </>
  );
}

export default App;
