import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Height for the navbar, for spacer, etc
const NAVBAR_HEIGHT = 88;

export default function Navbar({ allData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);

  // Track scroll position to control rounded/blurred navbar effect
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile dropdown open states
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);

  // For closing dropdown when clicking outside
  const mobileServicesRef = useRef();
  const mobileCoursesRef = useRef();

  // For navigation in custom handler
  const location = useLocation();
  const navigate = useNavigate();

  // Move to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  // Common handler for any link click
  const handleNavClick = useCallback(
    (opts = {}) => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setMenuOpen(false);
      if (opts.closeMobileDropdowns) {
        setMobileServicesOpen(false);
        setMobileCoursesOpen(false);
      }
    },
    []
  );

  // Get actual services and courses from allData
  const services =
    Array.isArray(allData?.services) && allData.services.length > 0
      ? allData.services
      : [];
  const courses =
    Array.isArray(allData?.courses) && allData.courses.length > 0
      ? allData.courses
      : [];

  // Desktop Nav Styles for rounded, non-full and blur when scrolled
  const navbarContainerClass =
    "fixed left-0 top-0 right-0 z-40 flex justify-center pointer-events-none";
  const navbarClass = scrolled
    ? "pointer-events-auto w-[97%] mt-2 rounded-2xl md:rounded-full shadow-lg transition-all duration-200 backdrop-blur-md bg-blue-900/70"
    : "pointer-events-auto w-full rounded-none shadow-md transition-all duration-200 bg-[#1e3a8a]";
  const navbarStyle = scrolled
    ? {
        backgroundColor: "rgba(30,58,138,0.7)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: 16,
        marginLeft: "auto",
        marginRight: "auto",
      }
    : { backgroundColor: "#1e3a8a" };

  // Close mobile dropdown if clicked outside
  useEffect(() => {
    const handleClick = (event) => {
      if (
        mobileServicesRef.current &&
        !mobileServicesRef.current.contains(event.target)
      ) {
        setMobileServicesOpen(false);
      }
      if (
        mobileCoursesRef.current &&
        !mobileCoursesRef.current.contains(event.target)
      ) {
        setMobileCoursesOpen(false);
      }
    };
    if (mobileServicesOpen || mobileCoursesOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [mobileServicesOpen, mobileCoursesOpen]);

  // Handlers for mobile menu: click text navigates, click arrow toggles dropdown
  const handleMobileServicesClick = (e) => {
    // If clicked on the "Services" text, navigate
    handleNavClick({ closeMobileDropdowns: true });
    navigate("/services");
  };

  const handleMobileServicesArrowClick = (e) => {
    e.preventDefault();
    setMobileServicesOpen((v) => !v);
  };

  const handleMobileCoursesClick = (e) => {
    handleNavClick({ closeMobileDropdowns: true });
    navigate("/courses");
  };

  const handleMobileCoursesArrowClick = (e) => {
    e.preventDefault();
    setMobileCoursesOpen((v) => !v);
  };

  return (
    <>
      {/* Custom CSS for nice blur+rounded combo (could go in CSS) */}
      <style>{`
        .navbar-blur-effect {
          box-shadow: 0 8px 32px 0 rgba(34,92,230,0.12), 0 1.5px 5px 0 rgba(30,58,138,0.05);
          transition: box-shadow .2s, background .22s;
          border-radius: 2rem;
        }
      `}</style>
      {/* Outer wrapper */}
      <div className={navbarContainerClass} style={{ top: 0, left: 0, right: 0 }}>
        <nav
          className={`${navbarClass} ${scrolled ? "navbar-blur-effect" : ""} text-[#FFFFFF]`}
          style={{
            ...navbarStyle,
            height: NAVBAR_HEIGHT,
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Main navigation"
        >
          <div
            className="flex justify-between items-center w-full max-w-[1440px] px-2 md:px-6 py-4"
            style={{ height: NAVBAR_HEIGHT }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Sudhosan Skill Solutions Logo"
                className="h-12 w-12 md:h-16 md:w-16 bg-white object-contain rounded"
                style={{
                  boxShadow: scrolled
                    ? "0px 1px 10px 0px rgba(30,58,138,0.09)"
                    : undefined,
                }}
              />
              <div className="w-fit whitespace-nowrap">
                <h1 className="text-base md:text-xl font-bold font-serif text-[#FF7A00] whitespace-nowrap">
                  Sudhosan Skill Solutions
                </h1>
                <p
                  className="text-xs hidden sm:block text-center w-full whitespace-nowrap"
                  style={{ color: "#FFFFFF" }}
                >
                  DREAM | DISCOVER | DELIVER
                </p>
              </div>
            </div>

            {/* Desktop Menu and Recruiter Button */}
            <div className="hidden lg:flex items-center gap-4">
              <ul className="flex items-center gap-4 xl:gap-6 text-sm font-medium">
                <li>
                  <Link
                    to="/"
                    className="cursor-pointer hover:text-[#FF7A00] text-[#FFFFFF] transition-colors"
                    onClick={handleNavClick}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="cursor-pointer hover:text-[#FF7A00] text-[#FFFFFF] transition-colors"
                    onClick={handleNavClick}
                  >
                    About Us
                  </Link>
                </li>
                {/* Services Dropdown */}
                <li
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    to="/services"
                    className="flex items-center gap-1 cursor-pointer hover:text-[#FF7A00] text-[#FFFFFF] transition-colors"
                    onClick={handleNavClick}
                    tabIndex={0}
                  >
                    Services <FaChevronDown size={12} />
                  </Link>
                  {servicesOpen && (
                    <div
                      className="absolute bottom-100 left-0 bg-white/90 text-[#1F2937] rounded-xl shadow-lg w-60 py-2 z-20 backdrop-blur-md"
                      style={{
                        backdropFilter: "blur(7px)",
                        WebkitBackdropFilter: "blur(7px)",
                        border: "1px solid rgba(30,58,138,0.055)"
                      }}
                    >
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          to={`/services/${service.slug}`}
                          className="block px-4 py-2 hover:bg-[#E5ECF8] hover:text-[#0072FF] rounded-md transition-colors cursor-pointer"
                          onClick={handleNavClick}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
                {/* Courses Dropdown */}
                <li
                  className="relative"
                  onMouseEnter={() => setCoursesOpen(true)}
                  onMouseLeave={() => setCoursesOpen(false)}
                >
                  <Link
                    to="/courses"
                    className="flex items-center gap-1 cursor-pointer hover:text-[#FF7A00] text-[#FFFFFF] transition-colors"
                    onClick={handleNavClick}
                  >
                    Courses <FaChevronDown size={12} />
                  </Link>
                  {coursesOpen && (
                    <div
                      className="absolute bottom-100  left-0 bg-white/95 text-[#1F2937] rounded-2xl shadow-lg w-80 py-2 z-20 backdrop-blur-md"
                      style={{
                        backdropFilter: "blur(7px)",
                        WebkitBackdropFilter: "blur(7px)",
                        border: "1px solid rgba(30,58,138,0.04)"
                      }}>
                      {courses.map((course) => (
                        <Link
                          key={course.slug}
                          to={`/courses/${course.slug}`}
                          className="block px-4 py-2 hover:bg-[#E5ECF8] hover:text-[#0072FF] text-sm rounded-md cursor-pointer transition-colors"
                          onClick={handleNavClick}
                        >
                          {course.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="cursor-pointer hover:text-[#FF7A00] text-[#FFFFFF] transition-colors"
                    onClick={handleNavClick}
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blogs"
                    className="cursor-pointer hover:text-[#FF7A00] text-[#FFFFFF] transition-colors"
                    onClick={handleNavClick}
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="cursor-pointer hover:text-[#FF7A00] text-[#FFFFFF] transition-colors"
                    onClick={handleNavClick}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
              {/* "Talk To A Recruiter" Button */}
              <Link
                to="/talk-to-a-recruiter"
                className="xl:ml-6 px-5 py-2 bg-[#FF7A00] hover:bg-[#ff9000] text-white font-bold rounded-full shadow transition-all duration-150 text-sm whitespace-nowrap"
                onClick={handleNavClick}
                style={{ boxShadow: "0 2px 12px 0 rgba(255, 122, 0, 0.14)" }}
              >
                Talk To A Recruiter
              </Link>
            </div>

            {/* Mobile Button */}
            <button
              className="lg:hidden text-2xl text-[#FFFFFF]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </nav>
      </div>
      {/* Mobile Menu (slide down/absolute) */}
      {menuOpen && (
        <div
          className="fixed md:hidden left-2 right-2 top-[calc(16px+88px)] z-50 rounded-2xl shadow-lg overflow-hidden backdrop-blur-md"
          style={{
            background: "linear-gradient(112deg, #1FA2FFcc 0%, #0072FFd2 85%)",
            border: "1px solid rgba(30,58,138,0.10)",
            marginTop: 0,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <ul className="flex flex-col gap-2 px-6 pt-6 pb-6 text-sm font-medium">
            <li>
              <Link
                to="/"
                className="cursor-pointer text-[#FFFFFF] hover:text-[#FF7A00] transition-colors"
                onClick={() => handleNavClick({ closeMobileDropdowns: true })}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="cursor-pointer text-[#FFFFFF] hover:text-[#FF7A00] transition-colors"
                onClick={() => handleNavClick({ closeMobileDropdowns: true })}
              >
                About Us
              </Link>
            </li>
            {/* Services Dropdown (collapsible for mobile) */}
            <li ref={mobileServicesRef} className="relative">
              <div className="flex items-center gap-1 text-[#FFFFFF] hover:text-[#FF7A00] transition-colors select-none w-fit">
                <span
                  className="cursor-pointer"
                  onClick={handleMobileServicesClick}
                  style={{ userSelect: "none", paddingRight: 4 }}
                  tabIndex={0}
                  role="button"
                  aria-label="Go to Services main"
                  onKeyDown={e => (e.key === "Enter" || e.key === ' ') && handleMobileServicesClick(e)}
                >
                  Services
                </span>
                <span
                  className={
                    "ml-1 flex items-center p-1 rounded-full hover:bg-white/10 cursor-pointer " +
                    (mobileServicesOpen
                      ? "rotate-180 transition-transform"
                      : "transition-transform")
                  }
                  onClick={handleMobileServicesArrowClick}
                  style={{ transition: "transform 0.2s" }}
                  tabIndex={0}
                  role="button"
                  aria-label="Expand Services menu"
                  onKeyDown={e => (e.key === "Enter" || e.key === ' ') && handleMobileServicesArrowClick(e)}
                >
                  <FaChevronDown size={12} />
                </span>
              </div>
              {mobileServicesOpen && (
                <div className="mt-2 ml-2 bg-white/90 text-[#1F2937] rounded-xl shadow-lg w-full py-2 z-20 backdrop-blur-md">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/services/${service.slug}`}
                      className="block px-4 py-2 hover:bg-[#E5ECF8] hover:text-[#0072FF] rounded-md transition-colors cursor-pointer"
                      onClick={() => handleNavClick({ closeMobileDropdowns: true })}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </li>
            {/* Courses Dropdown (collapsible for mobile) */}
            <li ref={mobileCoursesRef} className="relative">
              <div className="flex items-center gap-1 text-[#FFFFFF] hover:text-[#FF7A00] transition-colors select-none w-fit">
                <span
                  className="cursor-pointer"
                  onClick={handleMobileCoursesClick}
                  style={{ userSelect: "none", paddingRight: 4 }}
                  tabIndex={0}
                  role="button"
                  aria-label="Go to Courses main"
                  onKeyDown={e => (e.key === "Enter" || e.key === ' ') && handleMobileCoursesClick(e)}
                >
                  Courses
                </span>
                <span
                  className={
                    "ml-1 flex items-center p-1 rounded-full hover:bg-white/10 cursor-pointer " +
                    (mobileCoursesOpen
                      ? "rotate-180 transition-transform"
                      : "transition-transform")
                  }
                  onClick={handleMobileCoursesArrowClick}
                  style={{ transition: "transform 0.2s" }}
                  tabIndex={0}
                  role="button"
                  aria-label="Expand Courses menu"
                  onKeyDown={e => (e.key === "Enter" || e.key === ' ') && handleMobileCoursesArrowClick(e)}
                >
                  <FaChevronDown size={12} />
                </span>
              </div>
              {mobileCoursesOpen && (
                <div className="mt-2 ml-2 bg-white/95 text-[#1F2937] rounded-2xl shadow-lg w-full py-2 z-20 backdrop-blur-md">
                  {courses.map((course) => (
                    <Link
                      key={course.slug}
                      to={`/courses/${course.slug}`}
                      className="block px-4 py-2 hover:bg-[#E5ECF8] hover:text-[#0072FF] text-sm rounded-md cursor-pointer transition-colors"
                      onClick={() => handleNavClick({ closeMobileDropdowns: true })}
                    >
                      {course.title}
                    </Link>
                  ))}
                </div>
              )}
            </li>
            <li>
              <Link
                to="/jobs"
                className="cursor-pointer text-[#FFFFFF] hover:text-[#FF7A00] transition-colors"
                onClick={() => handleNavClick({ closeMobileDropdowns: true })}
              >
                Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className="cursor-pointer text-[#FFFFFF] hover:text-[#FF7A00] transition-colors"
                onClick={() => handleNavClick({ closeMobileDropdowns: true })}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="cursor-pointer text-[#FFFFFF] hover:text-[#FF7A00] transition-colors"
                onClick={() => handleNavClick({ closeMobileDropdowns: true })}
              >
                Contact
              </Link>
            </li>
            {/* "Talk To A Recruiter" Button for mobile */}
            <li>
              <Link
                to="/talk-to-a-recruiter"
                className="mt-3 w-full px-5 py-2 bg-[#FF7A00] hover:bg-[#ff9000] text-white font-bold rounded-full shadow transition-all duration-150 text-sm text-center block"
                onClick={() => handleNavClick({ closeMobileDropdowns: true })}
                style={{
                  boxShadow: "0 2px 12px 0 rgba(255, 122, 0, 0.14)",
                }}
              >
                Talk To A Recruiter
              </Link>
            </li>
          </ul>
        </div>
      )}
      {/* Spacer to keep page content below navbar */}
      <div
        style={{
          height: NAVBAR_HEIGHT + (scrolled ? 8 : 0),
          minHeight: NAVBAR_HEIGHT,
        }}
        aria-hidden="true"
      />
    </>
  );
}