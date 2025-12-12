import './App.css'
import Footer from './components/Footer'
import Nav from './components/Nav'
import About from './pages/About'
import Home from './pages/Home'

function App() {

  return (
   <div className="app">
      <Nav />
      <main>
        <Home />
        <About />
      </main>
      <Footer />
    </div>
  )
}

export default App
