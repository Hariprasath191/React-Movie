import { Link } from "react-router-dom";
import "../css/Navbar.css";
function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
            
                <Link to="/" className="navbar-brand">MovieApp</Link>
            
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/about" className="nav-link">About</Link>
                <Link to="/contact" className="nav-link">Contact</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>
            </div>
        </nav>
    );
}

export default NavBar;