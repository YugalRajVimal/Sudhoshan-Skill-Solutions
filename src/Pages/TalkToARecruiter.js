import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaUserTie } from "react-icons/fa";

// REACT_APP_API_URL should be defined in your .env file (Vite/Cra)
// Example: VITE_REACT_APP_API_URL=http://localhost:5000 (Vite with prefix), or REACT_APP_API_URL=... for CRA.
const API_URL = import.meta.env.VITE_REACT_APP_API_URL || process.env.REACT_APP_API_URL;

export default function TalkToARecruiterPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    resume: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm((f) => ({ ...f, [name]: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    // Validate required fields: Name, Email, Phone
    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.phone.trim()
    ) {
      setErrorMsg("Full Name, Email, and Phone Number are required.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("message", form.message);
      if (form.resume) {
        formData.append("resume", form.resume);
      }
      const res = await fetch(`${API_URL}/api/talk-to-recruiter-mail`, {
        method: "POST",
        body: formData,
      });
      const txt = await res.text();
      if (res.ok) {
        setSuccessMsg(txt || "Details submitted successfully!");
        setForm({
          fullName: "",
          email: "",
          phone: "",
          message: "",
          resume: null,
        });
      } else {
        setErrorMsg(txt || "Failed to submit your details.");
      }
    } catch (err) {
      setErrorMsg("There was an error connecting to our server. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12 px-3 sm:py-16 md:py-20 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20 px-2">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-900 font-serif tracking-tight mb-4 drop-shadow-lg">
            Talk to a <span className="text-orange-500">Recruiter</span>
          </h1>
          <p className="text-gray-700 text-base xs:text-lg md:text-xl max-w-2xl mx-auto">
            Want to start your career or land your next big job? Our recruiters can help you get interview-ready and connect you with the right opportunities. Submit your details and resume!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 md:gap-14 items-stretch">
          {/* RIGHT SIDE FORM */}
          <div className="bg-white/90 max-w-3xl mx-auto backdrop-blur-lg p-5 xs:p-7 md:p-10 rounded-2xl shadow-xl flex flex-col justify-center">
            <h2 className="text-xl xs:text-2xl font-bold text-blue-900 mb-5 xs:mb-7 font-serif tracking-tight">
              Share Your Details
            </h2>
            <form className="space-y-5 xs:space-y-7" onSubmit={handleSubmit}>
              {/* Name */}
              <FormField
                label="Full Name"
                type="text"
                placeholder="Your Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                disabled={submitting}
                required={true}
              />
              {/* Email Address */}
              <FormField
                label="Email Address"
                type="email"
                placeholder="example@email.com"
                name="email"
                value={form.email}
                onChange={handleChange}
                disabled={submitting}
                required={true}
              />
              {/* Phone */}
              <FormField
                label="Phone Number"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                disabled={submitting}
                required={true}
              />
              {/* Message */}
              <div>
                <label className="text-xs xs:text-sm text-gray-600 font-medium mb-1 block">
                  Message (optional)
                </label>
                <textarea
                  name="message"
                  placeholder="Type a brief message or your career interests"
                  value={form.message}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full mt-1 border border-blue-200 rounded-md px-4 py-2 shadow-sm text-xs xs:text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none transition bg-white text-gray-700 min-h-[80px]"
                />
              </div>
              {/* Resume Upload */}
              <div>
                <label className="text-xs xs:text-sm text-gray-600 font-medium mb-1 block">
                  Upload Resume
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  name="resume"
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full mt-1 border border-blue-200 rounded-md px-4 py-2 shadow-sm text-xs xs:text-sm
                             focus:ring-2 focus:ring-orange-400 focus:outline-none transition bg-white text-gray-700"
                />
                <span className="block text-xs text-gray-400 mt-1">Accepted: PDF, DOC, DOCX</span>
                {form.resume && (
                  <span className="block text-xs text-blue-500 mt-1">Selected: {form.resume.name}</span>
                )}
              </div>
              {/* Success/Error */}
              {successMsg && <div className="text-green-600 text-xs xs:text-sm">{successMsg}</div>}
              {errorMsg && <div className="text-red-600 text-xs xs:text-sm">{errorMsg}</div>}
              {/* Submit */}
              <button
                className="w-full bg-gradient-to-r from-orange-500 to-blue-900 text-white py-3 rounded-lg font-bold shadow-lg hover:from-blue-900 hover:to-orange-500 transition-colors text-base xs:text-lg tracking-wide"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send to Recruiter"}
              </button>
            </form>
            <p className="text-xs xs:text-sm text-gray-400 text-center mt-5 xs:mt-6">
              Your details and resume are confidential. Our recruiter will contact you soon!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Recruiter Info item for consistency (not used in main export, but kept here for possible later use)
function RecruiterInfoItem({ icon, label, value, link }) {
  return (
    <div className="flex gap-3 xs:gap-4 items-center">
      <span>{icon}</span>
      <div>
        <p className="font-semibold text-xs xs:text-sm mb-0">{label}</p>
        {link ? (
          <a href={link} className="text-blue-100 underline text-xs xs:text-sm" target="_blank" rel="noopener noreferrer">
            {value}
          </a>
        ) : (
          <span className="text-blue-100 text-xs xs:text-sm">{value}</span>
        )}
      </div>
    </div>
  );
}

// FormField helper for text, email, and tel
function FormField({ label, type, placeholder, name, value, onChange, disabled, required }) {
  return (
    <div>
      <label className="text-xs xs:text-sm text-gray-600 font-medium mb-1 block">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`w-full mt-1 border border-blue-200 rounded-md px-4 py-3 shadow-sm
         text-xs xs:text-sm
         focus:ring-2 focus:ring-orange-400 focus:outline-none transition
         ${type === "file" ? "px-0 py-2 text-gray-500" : ""}
        `}
      />
    </div>
  );
}