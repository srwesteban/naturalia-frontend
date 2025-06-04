import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import CreateStayForm from "./components/stays/CreateStayForm";
import StayDetail from "./pages/StayDetail";
import Footer from "./components/layout/Footer";
import AdminPanel from "./pages/AdminPanel";
import RegisterForm from "./components/auth/RegisterForm";
import LoginForm from "./components/auth/LoginForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserPanel from "./components/admin/UserPanel";
import AdminFeaturesPage from "./pages/AdminFeaturesPage";
import AdminCategoryPage from "./pages/AdminCategoryPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavoritesPage from "./pages/FavoritesPages";
import PoliciesPage from "./pages/PoliciesPage";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Header />
      <main
        style={{ flex: 1, minHeight: "100%", margin: "180px", padding: "0" }}
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
          <Route
            path="adminuser"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <UserPanel />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            path="favorites"
            element={
              <ProtectedRoute roles={["USER"]}>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />{" "}
          <Route path="policies" element={<PoliciesPage />} />
          <Route path="adminfeatures" element={<AdminFeaturesPage />} />
          <Route path="admincategory" element={<AdminCategoryPage />} />
          <Route path="registry" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
