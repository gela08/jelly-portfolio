import './App.css'
import Footer from './components/Footer'
import Nav from './components/Nav'
import About from './pages/About'
import Home from './pages/Home'
import NetworkBackground from "./components/NetworkBackground";
import "./styles/components/Network-bg.css";
import Skills from './pages/Skills'
import Education from './pages/Education'

function App() {

  return ( 
   <div className="app">
      <NetworkBackground />
      <Nav />
      <main> 
        <Home />
        <About />
        <Skills />
        <Education />
      </main>
      <Footer />
    </div>
  )
}

export default App
