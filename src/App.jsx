import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Projects from './components/Projects';
import Locations from './components/Locations';
import Header from './components/Header';
import Footer from './components/Footer';
import Preview from './components/Preview';

/**
 * App component that sets up the main application structure with routing.
 * 
 * This component wraps the entire application in a Router and defines the 
 * various routes that navigate to different parts of the application, 
 * including Home, Projects, Locations, and Preview. It also includes a 
 * Header and Footer for consistent navigation and layout.
 *
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  return (
    <Router>
      <div className="d-flex flex-column vh-100 overflow-hidden">
        <div className='row flex-shrink-0'>
          {/* Render the Header component */}
          <Header />
        </div>

        <div className="row flex-grow-1 overflow-auto">
          {/* Define application routes */}
          <Routes>
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Locations/:projectId" element={<Locations />} />
            <Route path="/" element={<Home />} />
            <Route path="/Preview/:projectId" element={<Preview />} />
          </Routes>
        </div>
        
        <div className='row overflow-hidden flex-shrink-0'>
          {/* Render the Footer component */}
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
