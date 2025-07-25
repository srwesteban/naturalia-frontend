import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import CreateStayForm from "./components/stays/CreateStayForm";
import StayDetail from "./pages/StayDetailPage";
import Footer from "./components/layout/Footer";
import AdminPanel from "./pages/AdminPanelPage";
import RegisterForm from "./components/auth/RegisterForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserPanel from "./components/admin/UserPanel";
import AdminFeaturesPage from "./pages/AdminFeaturesPage";
import AdminCategoryPage from "./pages/AdminCategoryPage";
import FavoritesPage from "./pages/FavoritesPages";
import PoliciesPage from "./pages/PoliciesPage";
import ReservationsPage from "./pages/ReservationsPage";
import MyStaysPage from "./pages/MyStaysPage";
import ScrollToTop from "./components/utils/ScrollToTop";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <ScrollToTop />
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/createstay"
            element={
              <ProtectedRoute roles={["HOST", "ADMIN"]}>
                <CreateStayForm />
              </ProtectedRoute>
            }
          />
          <Route path="/stays/:id" element={<StayDetail />} />
          <Route
            path="/adminstay"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminrol"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <UserPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute roles={["USER"]}>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/policies"
            element={
              <ProtectedRoute roles={["USER", "HOST"]}>
                <PoliciesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminfeatures"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <AdminFeaturesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admincategory"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <AdminCategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservations"
            element={
              <ProtectedRoute roles={["USER"]}>
                <ReservationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mystays"
            element={
              <ProtectedRoute roles={["HOST"]}>
                <MyStaysPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
