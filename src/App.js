import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
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
import Cources from './Pages/Cources'

const WHATSAPP_NUMBER = '+919430247535'

const App = () => {
  return (
    <Router>
      <div className='relative'>
        <Navbar />
        <EnquiryPopup />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailsPage />} />
          <Route path="/services/:slug" element={<ServiceDetailsPage />} />
          <Route path="/courses" element={<Cources />} />
          <Route path="/courses/:slug" element={<CourseDetailsPage />} />
        </Routes>
        <Footer />

        {/* WhatsApp floating action button */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          style={{
            position: 'fixed',
            right: '24px',
            bottom: '24px',
            zIndex: 1000,
          }}
          className="whatsapp-fab group"
        >
          <FaWhatsapp
            size={48}
            className="rounded-full bg-green-500 text-white p-2 hover:bg-green-600 transition-all shadow-lg"
          />
        </a>
      </div>
    </Router>
  )
}

export default App