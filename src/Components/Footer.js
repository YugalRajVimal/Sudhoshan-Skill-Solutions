import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Copy synced with NavBar.js
const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Cources", href: "/courses" },
  { label: "Jobs", href: "/jobs" },
  { label: "Partners", href: "/partners" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

// Additional links from App.js (169-171)
const POLICY_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Refund & Cancellation", href: "/refund-and-cancellation-policy" },
];

function FooterSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  async function handleSubscribe(e) {
    e.preventDefault();
    setMessage("");
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || ""}/api/subscribe-newsletter`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim() }),
        }
      );
      const data = await response.json();
      if (response.ok && data.message) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data?.error || "Unable to subscribe. Please try again later.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <form
      className="flex flex-col gap-2 mt-6 items-center w-full"
      onSubmit={handleSubscribe}
      aria-label="Subscribe to newsletter (Footer)"
    >
      <div className="flex flex-col xs:flex-row items-stretch xs:items-center w-full gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-3 py-2 rounded-md text-gray-900 w-full xs:w-52 text-sm focus:outline-none flex-1"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
        />
        <button
          type="submit"
          className="bg-orange-500 px-4 py-2 rounded-md hover:bg-orange-600 text-white transition text-sm disabled:opacity-60 w-full xs:w-auto"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </div>
      {!!message && (
        <div
          className={`text-xs mt-1 text-center ${
            status === "success"
              ? "text-green-400"
              : status === "error"
              ? "text-red-300"
              : "text-gray-100"
          }`}
          role={status === "error" ? "alert" : undefined}
        >
          {message}
        </div>
      )}
    </form>
  );
}

// The Footer now takes 'allData' prop.
export default function Footer({ allData }) {
  // Fallback if no services found
  const servicesWithSlugs =
    (allData &&
      Array.isArray(allData.services) &&
      allData.services.length > 0 &&
      allData.services
        .filter(svc => svc.title && svc.slug)
        .map(svc => ({
          label: svc.title,
          slug: svc.slug,
        }))) ||
    [];

  return (
    <footer className="bg-[#1e3a8a] text-white">
      <div className="w-full py-4 px-4 flex justify-center border-b border-blue-700">
        <div className="max-w-5xl w-full text-center">
          <p className="text-blue-100 text-sm md:text-base leading-relaxed">
            <span className="font-semibold text-white">
              Registered with Ministry of Corporate Affairs (MCA) Under Section 8 of the Company Act 2013.&nbsp;
            </span>
            <br className="inline sm:hidden" />
            <span className="block sm:inline">
              <span className="font-medium">Registration No.:</span>
              <span className="text-blue-200">&nbsp;U85499BR2025PTC080237</span>,&nbsp;
              Registered. with <span className="font-semibold">MSME</span> (Udyam Registration) and Startup India Recognized — DPIIT, Govt. of India
            </span>
          </p>
        </div>
      </div>
      {/* Make columns even and keep everything left aligned */}
      <div
        className="mx-auto px-6 py-6 flex flex-wrap justify-evenly gap-8"
       
      >
        {/* Company Info */}
        <div className="flex flex-col h-full items-start max-w-[280px]" >
          <img
            src="/logo.png"
            alt="Sudhosan Skill Solutions Logo"
            className="h-14 w-14 bg-white object-contain rounded mb-4"
          />
          <h2 className="text-lg sm:text-2xl font-bold font-serif text-[#FF7A00] text-left">Sudhosan Skill Solutions</h2>
          <p className="text-xs text-left w-full mb-4" style={{ color: "#FFFFFF" }}>
            DREAM | DISCOVER | DELIVER
          </p>
          <p className="text-blue-100 text-left text-sm leading-relaxed">
            Sudhosan Skill Solutions Pvt. Ltd. bridges the gap between education and employment through industry-aligned training, career guidance, and direct placement support across India.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col h-full items-start" style={{ width: "fit-content", minWidth: 0 }}>
          <h3 className="text-lg font-semibold mb-4 text-left">Quick Links</h3>
          <ul className="space-y-2 text-blue-100 text-left">
            {QUICK_LINKS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="hover:text-orange-400 transition"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Services (now links from allData.services via slug) */}
        <div className="flex flex-col h-full items-start" style={{ width: "fit-content", minWidth: 0 }}>
          <h3 className="text-lg font-semibold mb-4 text-left">Our Services</h3>
          <ul className="space-y-2 text-blue-100 text-left">
            {servicesWithSlugs.length > 0 ? (
              servicesWithSlugs.map(service => (
                <li key={service.slug}>
                  <a
                    href={`/services/${service.slug}`}
                    className="hover:text-orange-400 transition"
                  >
                    {service.label}
                  </a>
                </li>
              ))
            ) : (
              <>
                <li>Education & Skill Training</li>
                <li>Placement & Staffing</li>
                <li>Career Guidance</li>
                <li>Corporate Training</li>
                <li>Digital Solutions</li>
                <li>Franchise & Partnership</li>
              </>
            )}
          </ul>
        </div>

        {/* Policies - new separate column */}
        <div className="flex flex-col h-full items-start" style={{ width: "fit-content", minWidth: 0 }}>
          <h3 className="text-lg font-semibold mb-4 text-left">Policies</h3>
          <ul className="space-y-2 text-blue-100 text-left">
            {POLICY_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="= text-blue-200 hover:text-orange-400 transition"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Mobile Subscribe */}
        <div className="flex flex-col h-full items-start" style={{ width: "fit-content", minWidth: 0 }}>
          {/* Subscribe button and form */}
          <div className="hidden lg:block w-full">
            <h4 className="text-base font-semibold text-white text-left mb-1">
              Subscribe to our Newsletter
            </h4>
            <FooterSubscribe />
          </div>
          <h3 className="text-lg font-semibold mb-4 mt-6 text-left">Contact Us</h3>
          <div className="space-y-3 text-blue-100 text-sm text-left w-full">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-orange-400 mt-1 flex-shrink-0" />
              <span>Sheohar, Bihar – 843329</span>
            </div>
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-orange-400 mt-1 flex-shrink-0" />
              <span>Corporate Office: Boring Road, Patna – 800001</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-orange-400 flex-shrink-0" />
              <span>08062178899</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-orange-400 flex-shrink-0" />
              <span>info@sudhosanskillsolutions.in</span>
            </div>
          </div>
          {/* Subscribe for mobile and tablet views (shows up on <lg screens) */}
          <div className="block lg:hidden mt-6 w-full">
            <h4 className="text-base font-semibold text-white mb-1 text-left">
              Subscribe to our Newsletter
            </h4>
            <FooterSubscribe />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-500">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-blue-200 text-sm">
            © {new Date().getFullYear()} Sudhosan Skill Solutions Pvt. Ltd. All rights reserved.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              className="bg-blue-700 p-3 rounded-full hover:bg-orange-500 transition"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com/sudhosan_skill_solutions"
              className="bg-blue-700 p-3 rounded-full hover:bg-orange-500 transition"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com/company/sudhosan-skill-solutions-pvt-ltd"
              className="bg-blue-700 p-3 rounded-full hover:bg-orange-500 transition"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://x.com/Sudhosan"
              className="bg-blue-700 p-3 rounded-full hover:bg-orange-500 transition"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://youtube.com/@sudhosanskillsolutions"
              className="bg-blue-700 p-3 rounded-full hover:bg-orange-500 transition"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}