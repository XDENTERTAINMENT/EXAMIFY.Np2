import { Link } from "react-router-dom";
import "./compo.css";
import { useState,useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";


function Navbar() {
  

  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
  document.body.style.overflow = menuOpen ? "hidden" : "auto";
}, [menuOpen]);

  return (

    <div>
        {menuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

    
    <nav className="nav">
      <h2 className="logo">
        🎓 Examify<span>Edu</span>
      </h2>
      <div className={menuOpen ? "links active" : "links"}>
        <div className="icon">
          <i class="fa-solid fa-house"></i>
          <Link to="/" className="link">
            Home
          </Link>
        </div>
        <div className="icon">
          <i class="fa-regular fa-star"></i>
          <Link to="/Features"  className="link">
            Features
          </Link>
        </div>

        <div className="icon">
          <i class="fa-solid fa-chart-column"></i>
          <Link to="/Pricing"  className="link">
            Pricing
          </Link>
        </div>

        <div className="icon">
          <i class="fa-solid fa-circle-info"></i>
          <Link to="/About"  className="link">
            About
          </Link>
        </div>
      </div>
       <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >

        {menuOpen ? <FaTimes /> : <FaBars />}

      </div>
    </nav>
    </div>
  );
}

export default Navbar;
