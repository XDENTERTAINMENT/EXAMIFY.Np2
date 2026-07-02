import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./pages/routes/AppRoutes";
import Footer from "./components/Footer";
// import UpdateNotice from "./components/updatenotice";
import "./App.css";

// ✅ ADDED — Phase 2: the admin dashboard has its own sidebar/header
// (see pages/admin/AdminDashboard.css) and shouldn't show the public
// marketing Navbar/Footer around it. useLocation only works INSIDE
// BrowserRouter, hence this small wrapper below rather than checking
// window.location directly in App().
function Chrome() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <div className="routes-container">
        <AppRoutes />
      </div>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <div className="head-office">
      <BrowserRouter>
        {/* <UpdateNotice/> */}
        <Chrome />
      </BrowserRouter>
    </div>
  );
}

export default App;
