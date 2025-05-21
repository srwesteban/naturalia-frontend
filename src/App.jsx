import CreateStayForm from './components/CreateStayFrom';
import Header from './components/Header';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '70px' }}>
        {/* {<Home></Home>} */}
        {<CreateStayForm></CreateStayForm>}
      </main>
    </>
  );
}

export default App;
