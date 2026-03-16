import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Navbar from './Components/NavBar'
import Home from './Pages/Home'
import Footer from './Components/Footer'

const About = () => <div>About Page</div>

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App