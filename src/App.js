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
import LegalPages, { PrivacyPolicy, RefundPolicy, TermsConditions } from './Pages/Policies';

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
        {/* Loader with blue/orange gradient accent */}
        <svg
          style={{
            width: 60,
            height: 60,
            display: "block",
            filter: "drop-shadow(0 2px 8px #e3e9f266)"
          }}
          viewBox="0 0 50 50"
        >
          <defs>
            <linearGradient id="loader-gradient-blueorange" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0072ff" stopOpacity="1" />
              <stop offset="70%" stopColor="#FF7A00" stopOpacity="1" />
            </linearGradient>
          </defs>
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#E3E9F2"
            strokeWidth="6"
          />
          <path
            d="M25 7
              a 18 18 0 0 1 0 36
              a 18 18 0 0 1 0 -36"
            fill="none"
            stroke="url(#loader-gradient-blueorange)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="85"
            strokeDashoffset="15"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
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

  const [open, setOpen] = useState(false);

  // Decide FAB bottom and side position depending on screen height
  const [fabBottom, setFabBottom] = useState(100);
  const [fabSide, setFabSide] = useState("right"); // "right" or "left"
  const [fabSideValue, setFabSideValue] = useState("20px");

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

  useEffect(() => {
    function updateFabPosition() {
      // If screen height < 600px, reduce bottom to 30px and move to left, else use 100px and right
      if (window.innerHeight < 600) {
        setFabBottom(30);
        setFabSide("left");
        setFabSideValue("20px");
      } else {
        setFabBottom(100);
        setFabSide("right");
        setFabSideValue("20px");
      }
    }

    updateFabPosition();
    window.addEventListener('resize', updateFabPosition);
    return () => window.removeEventListener('resize', updateFabPosition);
  }, []);

  // Dynamic style for the whatsapp fab - right or left depending on condition
  const whatsappFabStyle = {
    position: 'fixed',
    [fabSide]: fabSideValue,
    bottom: `${fabBottom}px`,
    zIndex: 1000,
  };

  return (
    <Router>
      <div className='relative'>
        {loading && <LoaderPage />}
        <Navbar allData={allData}/>
        <EnquiryPopup open={open} setOpen={setOpen} />
        <Routes>
          <Route path="/" element={<Home allData={allData}/>} />
          <Route path="/about" element={<AboutPage allData={allData} />} />
          <Route path="/jobs" element={<JobsPage allData={allData} />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/talk-to-a-recruiter" element={<TalkToARecruiterPage />} />
          <Route path="/get-admission" element={<GetAdmissionPage allData={allData} />} />

          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailsPage />} />

          <Route path="/services" element={<ServicesPage allData={allData} />} />
          <Route path="/services/:slug" element={<ServiceDetailsPage allData={allData}  setOpen={setOpen}/>} />
          
          <Route path="/courses" element={<Cources allData={allData} />} />
          <Route path="/courses/:slug" element={<CourseDetailsPage allData={allData} />} />

          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-and-cancellation-policy" element={<RefundPolicy />} />

        </Routes>
        <Footer allData={allData} />

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          style={whatsappFabStyle}
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