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
import ServiceDetailsPage from './Pages/ServiceDetailsPage'
import CourseDetailsPage from './Pages/CourseDetailsPage'
import EnquiryPopup from './Components/EnquiryPopup'


const App = () => {
  return (
    <Router>
      <div className='relative'>

      
      <Navbar/>
      <EnquiryPopup />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/jobs" element={<JobsPage /> } />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/:slug" element={<BlogDetailsPage />} />
      <Route path="/services/:slug" element={<ServiceDetailsPage />} />
      <Route path="/courses/:slug" element={<CourseDetailsPage />} />

      </Routes>
      <Footer />
      </div>
    </Router>
  )
}

export default App