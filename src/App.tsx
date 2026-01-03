import './App.css'
import Footer from './components/Footer'
import Nav from './components/Nav'
import About from './pages/About'
import Home from './pages/Home'
import NetworkBackground from "./components/NetworkBackground";
import "./styles/components/Network-bg.css";
import Skills from './pages/Skills'
import Education from './pages/Education'
import Certification from './pages/Certification'
import Works from './pages/Works'
import { Route, Routes } from 'react-router-dom'
import Projects from './pages/Projects'
import Gallery from './pages/Gallery'
import Journal from './pages/Journal'
import Contact from './pages/Contact'


function App() {

  return ( 
   <div className="app">
      <NetworkBackground />
      <Nav />
      
      <Routes>
        {/* One-page portfolio */}
        <Route
          path="/"
          element={
            <main>
              <Home />
              <About />
              <Skills />
              <Education />
              <Certification />
              <Works />
              <Journal />
              <Gallery />
              <Contact />
            </main>
          }
        />

        {/* Separate projects page */}
        <Route path="/projects" element={<Projects />} />
      </Routes>
      
      <Footer />
    </div>
  )
}

export default App
