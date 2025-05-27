import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import CreateStayForm from "./components/CreateStayForm";
import StayDetail from "./pages/StayDetail";
import Footer from "./components/Footer";
import AdminPanel from "./pages/AdminPanel";
import RegisterForm from "./components/auth/RegisterForm";
import LoginForm from "./components/auth/LoginForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserPanel from "./components/users/UserPanel";

function App() {
  return (
    <>
      <Header />
      <main
        style={{ flex: 1, minHeight: "100%", margin: "130px", padding: "0" }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateStayForm />} />
          <Route path="/stays/:id" element={<StayDetail />} />
          <Route
            path="/adminstay"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />{" "}
          <Route path="/adminuser" element=
          {
            <ProtectedRoute roles={["ADMIN"]}>
              <UserPanel />
            </ProtectedRoute>
          }
          />{" "}
          <Route path="registry" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
