import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

// Copy synced with NavBar.js
const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "#" },
  { label: "Jobs", href: "#" },
  { label: "Partners", href: "#" },
  { label: "Contact", href: "#" },
];

const SERVICE_LIST = [
  "Education & Skill Training",
  "Placement & Staffing",
  "Career Guidance",
  "Corporate Training",
  "Digital Solutions",
  "Franchise & Partnership",
];

// Synced with COURSE_LIST from NavBar.js (keep updated there)
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

export default function Footer() {
  return (
    <footer className="bg-[#1e3a8a] text-white">
      <div className=" mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <img
            src="/logo.png"
            alt="Sudhosan Skill Solutions Logo"
            className="h-14 w-14 bg-white object-contain rounded mb-4"
          />
          {/* Main heading uses font-serif */}
          <h2 className="text-2xl font-bold mb-3 font-serif">Sudhosan Skill Solutions</h2>
          <p className="text-sm text-blue-200 mb-4">
            DREAM | DISCOVER | DELIVER
          </p>
          <p className="text-blue-100 text-sm leading-relaxed">
            Sudhosan Skill Solutions Pvt. Ltd. bridges the gap between
            education and employment through industry-aligned training,
            career guidance, and direct placement support across India.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-blue-100">
            {QUICK_LINKS.map((item) => (
              <li key={item.label}>
                {/* Replace # with real links as available */}
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

        {/* Our Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2 text-blue-100">
            {SERVICE_LIST.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <div className="space-y-3 text-blue-100 text-sm">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-orange-400 mt-1" />
              <span>Sheohar, Bihar – 843329</span>
            </div>
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-orange-400 mt-1" />
              <span>Corporate Office: Boring Road, Patna – 800001</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-orange-400" />
              <span>08062178899</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-orange-400" />
              <span>info@sudhosanskillsolutions.in</span>
            </div>
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
              <FaTwitter />
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