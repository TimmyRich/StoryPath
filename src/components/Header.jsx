import { NavLink } from 'react-router-dom';

/**
 * Header component that renders the navigation bar for the StoryPath application.
 * It includes links to the Home and Projects pages.
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Brand name for the application */}
        <a className="navbar-brand" href="#">StoryPath</a>
        
        {/* Toggler button for responsive navbar */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Navbar links container that collapses on smaller screens */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* Link to the Home page */}
            <li className="nav-item">
              <NavLink to="/" className="nav-link">Home</NavLink>
            </li>
            {/* Link to the Projects page */}
            <li className="nav-item">
              <NavLink to="/Projects" className="nav-link">Projects</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
