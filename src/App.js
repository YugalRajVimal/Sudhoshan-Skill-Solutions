import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Navbar from './Components/NavBar'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import AboutPage from './Pages/AboutPage'
import JobsPage from './Pages/JobPage'
import PartnersPage from './Pages/PartnersPage'
import ContactPage from './Pages/ContactUsPage'
import BlogPage from './Pages/BlogPage'
import BlogDetailsPage from './Pages/BlogDetailsPage'


const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/jobs" element={<JobsPage /> } />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/:slug" element={<BlogDetailsPage />} />

      </Routes>
      <Footer />
    </Router>
  )
}

export default App