import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./pages/routes/AppRoutes";
import Footer from "./components/Footer";
import UpdateNotice from "./components/updatenotice";
import "./App.css";

function App() {
  return (
    <div className="head-office">
      <BrowserRouter>
      {/* <UpdateNotice/> */}
        <Navbar />
        <div className="routes-container">
          <AppRoutes />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
