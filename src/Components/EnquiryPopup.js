import { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "";

export default function EnquiryPopup() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    enquiryFor: "",
    message: "",
    privacyAgreement: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
    setSubmitResult(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitResult(null);

    // It is advisable to do validation before sending.
    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.location.trim() ||
      !form.enquiryFor.trim() ||
      !form.privacyAgreement
    ) {
      setSubmitResult({
        error: true,
        message:
          "Please fill in all required fields and agree to the privacy policy.",
      });
      setSubmitting(false);
      return;
    }

    try {
      // Use axios and REACT_APP_API_URL; endpoint should be `${API_URL}/enquiry-mail`
      const res = await axios.post(`${API_URL}/api/enquiry-mail`, form, {
        headers: { "Content-Type": "application/json" },
      });

      setSubmitResult({ error: false, message: res.data || "Enquiry submitted successfully." });
      setForm({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        enquiryFor: "",
        message: "",
        privacyAgreement: false,
      });
    } catch (err) {
      let message =
        "Network issue! Please try again or contact us using another method.";
      if (err.response && err.response.data) {
        message = typeof err.response.data === "string"
          ? err.response.data
          : (err.response.data.message || message);
      }
      setSubmitResult({
        error: true,
        message
      });
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setForm({
      fullName: "",
      email: "",
      phone: "",
      location: "",
      enquiryFor: "",
      message: "",
      privacyAgreement: false,
    });
    setSubmitResult(null);
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ pointerEvents: open ? "auto" : "none" }}
      />

      {/* Sliding Panel with Button always visible, form expands */}
      <div
        className={`fixed top-1/2 -translate-y-1/2 right-0 flex items-center z-50`}
        style={{ height: "auto" }}
      >
        {/* Floating Button always visible, stays on the left of the form */}
        <button
          onClick={() => setOpen(true)}
          className={`bg-orange-600 text-white px-2 md:px-4 py-3 rounded-l-lg font-semibold z-50 transition-transform duration-300
          relative left-0 top-0 flex-shrink-0`}
          style={{
            writingMode: "vertical-rl",
            transition: "opacity 0.3s, transform 0.3s",
          }}
          aria-label="Open Enquiry Form"
        >
          ENQUIRY
        </button>

        {/* Form Panel expands/collapses with width transition */}
        <div
          className={`
            bg-orange-500 rounded-l-lg shadow-xl transform transition-all duration-300 ease-in-out overflow-hidden
            ${open ? "w-fit sm:w-[420px] p-6 opacity-100" : "w-0 p-0 opacity-0"}
            h-full relative
          `}
          style={{ minWidth: open ? "320px" : "0", maxWidth: "100vw" }}
        >
          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className={`absolute top-4 right-4 text-gray-500 transition-opacity duration-200 ${
              open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            tabIndex={open ? 0 : -1}
            aria-label="Close Enquiry Form"
          >
            ✕
          </button>

          {/* Content visible only when open */}
          <div
            className={`
              overflow-y-auto transition-opacity duration-300 
              ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}
            style={{ height: "100%" }}
          >
            {/* Title */}
            <h2 className="text-2xl font-bold text-blue-900 mb-6 mt-2">
              How Can We Help You?
            </h2>

            {/* Feedback Message */}
            {submitResult && (
              <div
                className={`mb-2 px-4 py-2 rounded ${
                  submitResult.error
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {submitResult.message}
              </div>
            )}

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit} onReset={handleReset} autoComplete="off">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                className="w-full border rounded-md p-3"
                value={form.fullName}
                onChange={handleChange}
                required
                disabled={submitting}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                className="w-full border rounded-md p-3"
                value={form.email}
                onChange={handleChange}
                required
                disabled={submitting}
                autoComplete="email"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                className="w-full border rounded-md p-3"
                value={form.phone}
                onChange={handleChange}
                required
                disabled={submitting}
                autoComplete="tel"
              />

              <input
                type="text"
                name="location"
                placeholder="Location *"
                className="w-full border rounded-md p-3"
                value={form.location}
                onChange={handleChange}
                required
                disabled={submitting}
              />

              <select
                name="enquiryFor"
                className="w-full border rounded-md p-3"
                value={form.enquiryFor}
                onChange={handleChange}
                required
                disabled={submitting}
              >
                <option value="">Enquiry For *</option>
                <option>Jobs and Placements</option>
                <option>Education and Skill Training</option>
                <option>Certification Course</option>
                <option>Career Guidance</option>
                <option>Admission Support</option>
                <option>Corporate Training</option>
                <option>Franchise &amp; Partnership</option>
                <option>Business &amp; Requitement Collaboration</option>
                <option>Manpower Support for Business</option>
              </select>

              <textarea
                name="message"
                rows="3"
                placeholder="Your Message"
                className="w-full border rounded-md p-3"
                value={form.message}
                onChange={handleChange}
                disabled={submitting}
              />

              <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="privacyAgreement"
                  className="mt-1"
                  checked={form.privacyAgreement}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                />
                I agree to the privacy policy and allow contact.
              </label>

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  className={`bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 w-full ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="reset"
                  className={`border px-6 py-3 rounded-md w-full ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={submitting}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}