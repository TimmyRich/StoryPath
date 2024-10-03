import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import Projects from './components/Projects';
import Locations from './components/Locations';
import Header from './components/Header';
import Footer from './components/Footer';
import Preview from './components/Preview';


function App() {

  return (
    <Router>
      <div className="d-flex flex-column vh-100 overflow-hidden">
        <div className='row flex-shrink-0'>
          <Header/>
        </div>

        <div className="row flex-grow-1 overflow-auto">
          <Routes>
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Locations/:projectId" element={<Locations />} />
            <Route path="/" element={<Home />} />
            <Route path="/Preview/:projectId" element={<Preview />} />
          </Routes>
        </div>
        
        <div className='row overflow-hidden flex-shrink-0'>
          <Footer/> 
        </div>
      </div>
    </Router>
  )
}

export default App
