import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

// Simpler course list for dropdowns
const COURSE_LIST = [
  "Digital Literacy & Internet Essentials",
  "Basic Computer Operations",
  "Job Readiness & Workplace Skills Training",
  "GST & Accounting Fundamentals",
  "MS Excel & Data Entry Professional Skills",
  "Resume Writing & LinkedIn Profile Building",
  "Interview Preparation & Communication Skills",
  "Retail Sales & Customer Handling Training",
  "Customer Support Executive Training",
  "Office Administration & Front Office Management",
];

// Height for the navbar, for spacer, etc
const NAVBAR_HEIGHT = 88;

export default function Navbar() {
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

  // Desktop Nav Styles for rounded, non-full and blur when scrolled
  const navbarContainerClass =
    "fixed left-0 top-0 right-0 z-40 flex justify-center pointer-events-none";
  const navbarClass = scrolled
    ? "pointer-events-auto w-[95%] mt-2 rounded-2xl md:rounded-full shadow-lg transition-all duration-200 backdrop-blur-md bg-blue-900/70"
    : "pointer-events-auto w-full rounded-none shadow-md transition-all duration-200 bg-[#1e3a8a]";
  const navbarStyle = scrolled
    ? {
        backgroundColor: "rgba(30,58,138,0.7)", // bg-[#1e3a8a]/70 for dark blue
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: 16,
        marginLeft: "auto",
        marginRight: "auto",
      }
    : { backgroundColor: "#1e3a8a" };

  // Mobile dropdown open states
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);

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
            className="flex justify-between items-center w-full max-w-[1440px] px-6 py-4"
            style={{ height: NAVBAR_HEIGHT }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Sudhosan Skill Solutions Logo"
                className="h-16 w-16 bg-white object-contain rounded"
                style={{ boxShadow: scrolled ? "0px 1px 10px 0px rgba(30,58,138,0.09)" : undefined }}
              />
              <div>
                <h1 className="text-xl font-bold font-serif text-[#FF7A00]">
                  Sudhosan Skill Solutions
                </h1>
                <p className="text-xs hidden md:block" style={{ color: "#FFFFFF" }}>
                  DREAM | DISCOVER | DELIVER
                </p>
              </div>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
              <li className="cursor-pointer hover:text-[#FF7A00] text-[#FFFFFF] transition-colors">Home</li>

              <li className="cursor-pointer hover:text-[#FF7A00] text-[#FFFFFF] transition-colors">
                About Us
              </li>

              {/* Services Dropdown */}
              <li
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <div className="flex items-center gap-1 cursor-pointer hover:text-[#FF7A00] text-[#FFFFFF] transition-colors">
                  Services <FaChevronDown size={12} />
                </div>
                {servicesOpen && (
                  <div className="absolute top-[2.8rem] left-0 bg-white/90 text-[#1F2937] rounded-xl shadow-lg w-60 py-2 z-20 backdrop-blur-md"
                    style={{
                      backdropFilter: "blur(7px)",
                      WebkitBackdropFilter: "blur(7px)",
                      border: "1px solid rgba(30,58,138,0.055)"
                    }}>
                    <a className="block px-4 py-2 hover:bg-[#E5ECF8] hover:text-[#0072FF] rounded-md transition-colors cursor-pointer">
                      Education & Skill Training
                    </a>
                    <a className="block px-4 py-2 hover:bg-[#E5ECF8] hover:text-[#0072FF] rounded-md transition-colors cursor-pointer">
                      Placement & Staffing
                    </a>
                    <a className="block px-4 py-2 hover:bg-[#E5ECF8] hover:text-[#0072FF] rounded-md transition-colors cursor-pointer">
                      Career Guidance
                    </a>
                    <a className="block px-4 py-2 hover:bg-[#E5ECF8] hover:text-[#0072FF] rounded-md transition-colors cursor-pointer">
                      Corporate Training
                    </a>
                    <a className="block px-4 py-2 hover:bg-[#E5ECF8] hover:text-[#0072FF] rounded-md transition-colors cursor-pointer">
                      Digital Solutions
                    </a>
                    <a className="block px-4 py-2 hover:bg-[#E5ECF8] hover:text-[#0072FF] rounded-md transition-colors cursor-pointer">
                      Franchise & Partnership
                    </a>
                  </div>
                )}
              </li>

              {/* Courses Dropdown */}
              <li
                className="relative"
                onMouseEnter={() => setCoursesOpen(true)}
                onMouseLeave={() => setCoursesOpen(false)}
              >
                <div className="flex items-center gap-1 cursor-pointer hover:text-[#FF7A00] text-[#FFFFFF] transition-colors">
                  Courses <FaChevronDown size={12} />
                </div>
                {coursesOpen && (
                  <div className="absolute top-[2.8rem] left-0 bg-white/95 text-[#1F2937] rounded-2xl shadow-lg w-80 py-2 z-20 backdrop-blur-md"
                    style={{
                      backdropFilter: "blur(7px)",
                      WebkitBackdropFilter: "blur(7px)",
                      border: "1px solid rgba(30,58,138,0.04)"
                    }}>
                    {COURSE_LIST.map((name, i) => (
                      <span
                        key={i}
                        className="block px-4 py-2 hover:bg-[#E5ECF8] hover:text-[#0072FF] text-sm rounded-md cursor-pointer transition-colors"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                )}
              </li>

              <li className="cursor-pointer hover:text-[#FF7A00] text-[#FFFFFF] transition-colors">
                Jobs
              </li>
              <li className="cursor-pointer hover:text-[#FF7A00] text-[#FFFFFF] transition-colors">
                Partners
              </li>
              <li className="cursor-pointer hover:text-[#FF7A00] text-[#FFFFFF] transition-colors">
                Contact
              </li>
            </ul>

            {/* Mobile Button */}
            <button
              className="md:hidden text-2xl text-[#FFFFFF]"
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
          }}>
          <ul className="flex flex-col gap-2 px-6 pt-6 pb-6 text-sm font-medium">
            <li className="cursor-pointer text-[#FFFFFF] hover:text-[#FF7A00] transition-colors">Home</li>
            <li className="cursor-pointer text-[#FFFFFF] hover:text-[#FF7A00] transition-colors">
              About Us
            </li>
            {/* Services Dropdown (collapsible for mobile) */}
            <li>
              <div
                className="flex items-center gap-1 cursor-pointer text-[#FFFFFF] hover:text-[#FF7A00] transition-colors select-none"
                onClick={() => setMobileServicesOpen((v) => !v)}
              >
                Services{" "}
                <span className={mobileServicesOpen ? "rotate-180 transition-transform" : "transition-transform"}>
                  <FaChevronDown size={12} />
                </span>
              </div>
              {mobileServicesOpen && (
                <div className="mt-2 ml-2 bg-white/90 text-[#1F2937] rounded-xl shadow-lg w-full py-2 z-20 backdrop-blur-md">
                  <a className="block px-4 py-2 hover:bg-[#E5ECF8] hover:text-[#0072FF] rounded-md transition-colors cursor-pointer">
                    Education & Skill Training
                  </a>
                  <a className="block px-4 py-2 hover:bg-[#E5ECF8] hover:text-[#0072FF] rounded-md transition-colors cursor-pointer">
                    Placement & Staffing
                  </a>
                  <a className="block px-4 py-2 hover:bg-[#E5ECF8] hover:text-[#0072FF] rounded-md transition-colors cursor-pointer">
                    Career Guidance
                  </a>
                  <a className="block px-4 py-2 hover:bg-[#E5ECF8] hover:text-[#0072FF] rounded-md transition-colors cursor-pointer">
                    Corporate Training
                  </a>
                  <a className="block px-4 py-2 hover:bg-[#E5ECF8] hover:text-[#0072FF] rounded-md transition-colors cursor-pointer">
                    Digital Solutions
                  </a>
                  <a className="block px-4 py-2 hover:bg-[#E5ECF8] hover:text-[#0072FF] rounded-md transition-colors cursor-pointer">
                    Franchise & Partnership
                  </a>
                </div>
              )}
            </li>
            {/* Courses Dropdown (collapsible for mobile) */}
            <li>
              <div
                className="flex items-center gap-1 cursor-pointer text-[#FFFFFF] hover:text-[#FF7A00] transition-colors select-none"
                onClick={() => setMobileCoursesOpen((v) => !v)}
              >
                Courses{" "}
                <span className={mobileCoursesOpen ? "rotate-180 transition-transform" : "transition-transform"}>
                  <FaChevronDown size={12} />
                </span>
              </div>
              {mobileCoursesOpen && (
                <div className="mt-2 ml-2 bg-white/95 text-[#1F2937] rounded-2xl shadow-lg w-full py-2 z-20 backdrop-blur-md">
                  {COURSE_LIST.map((name, i) => (
                    <span
                      key={i}
                      className="block px-4 py-2 hover:bg-[#E5ECF8] hover:text-[#0072FF] text-sm rounded-md cursor-pointer transition-colors"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              )}
            </li>
            <li className="cursor-pointer text-[#FFFFFF] hover:text-[#FF7A00] transition-colors">
              Jobs
            </li>
            <li className="cursor-pointer text-[#FFFFFF] hover:text-[#FF7A00] transition-colors">
              Partners
            </li>
            <li className="cursor-pointer text-[#FFFFFF] hover:text-[#FF7A00] transition-colors">
              Contact
            </li>
          </ul>
        </div>
      )}
      {/* Spacer to keep page content below navbar */}
      <div style={{ height: NAVBAR_HEIGHT + (scrolled ? 8 : 0), minHeight: NAVBAR_HEIGHT }} aria-hidden="true" />
    </>
  );
}