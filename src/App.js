import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Navbar from './Components/NavBar';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import AboutPage from './Pages/AboutPage';
import JobsPage from './Pages/JobPage';
import PartnersPage from './Pages/PartnersPage';
import ContactPage from './Pages/ContactUsPage';
import BlogPage from './Pages/BlogPage';
import BlogDetailsPage from './Pages/BlogDetailsPage';
import ServiceDetailsPage from './Pages/ServiceDetailsPage';
import CourseDetailsPage from './Pages/CourseDetailsPage';
import EnquiryPopup from './Components/EnquiryPopup';
import Cources from './Pages/Cources';
import { fetchAllData } from './data/AllData';
import ServicesPage from './Pages/Services';
import TalkToARecruiterPage from './Pages/TalkToARecruiter';
import GetAdmissionPage from './Pages/GetAdmissionPage';

const WHATSAPP_NUMBER = '+919430247535';

// Simple Loader Page Component
function LoaderPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f7fafb',
        zIndex: 2000,
        position: 'fixed',
        width: '100%',
        left: 0,
        top: 0,
      }}
    >
      <div
        style={{
          padding: '32px 48px',
          borderRadius: '16px',
          background: '#fff',
          boxShadow: '0 4px 32px 0 rgba(0,0,0,0.07)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <svg className="animate-spin" style={{ width: 52, height: 52, color: "#198754" }} fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#E3E9F2" strokeWidth="4"></circle>
          <path className="opacity-75" fill="#198754" d="M4 12a8 8 0 018-8v4l3-3-3-3v4A8 8 0 104 12z" />
        </svg>
        <span style={{ fontWeight: 600, color: '#222', fontSize: 18 }}>Loading...</span>
        <span style={{ color: '#999', fontSize: 13 }}>Fetching the latest data.</span>
      </div>
    </div>
  );
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const [allData,setAllData] = useState();

  useEffect(() => {
    fetchAllData()
      .then((data) => {
        if (typeof data === "object" && data !== null) {
          console.log('Fetched /all-data:', data);
          setAllData(data);
        } else {
          // If not object, log raw data
          console.error(
            `Unexpected response type from /all-data.`,
            '\nRaw response:',
            (typeof data === 'string' && data.length > 500)
              ? data.substring(0, 500) + '...'
              : data
          );
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching /all-data:', err);
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <div className='relative'>
        {loading && <LoaderPage />}
        <Navbar allData={allData}/>
        <EnquiryPopup />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/jobs" element={<JobsPage allData={allData} />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/talk-to-a-recruiter" element={<TalkToARecruiterPage />} />
          <Route path="/get-admission" element={<GetAdmissionPage allData={allData} />} />

          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailsPage />} />

          <Route path="/services" element={<ServicesPage allData={allData} />} />
          <Route path="/services/:slug" element={<ServiceDetailsPage allData={allData} />} />
          
          <Route path="/courses" element={<Cources allData={allData} />} />
          <Route path="/courses/:slug" element={<CourseDetailsPage allData={allData} />} />
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
  );
};

export default App;