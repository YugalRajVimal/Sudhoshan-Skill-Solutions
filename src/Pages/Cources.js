import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { COURSE_NOTES } from "../data/CourcesData";

// --- Enroll Modal Popup, adapted from CoursePageTemplate.js ---
function CourseEnrollModal({ course, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    classType: "group",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const modalRef = useRef();

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitMessage(null);
  }

  function validate(form) {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Please enter a valid email address.";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^[\d\s\-+()]{7,}$/.test(form.phone))
      newErrors.phone = "Please enter a valid phone number.";
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setSubmitMessage(null);

    const newErrors = validate(form);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitting(true);

    try {
      // Use the correct API route for enrollment mailer
      const apiUrl = `${process.env.REACT_APP_API_URL || ""}/api/enroll-mail`;
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        courseTitle: course?.title || "",
        classType:
          form.classType === "group"
            ? "Online Group Classes"
            : "Online Single Classes",
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let serverMessage = "Your enrollment request was submitted successfully.";
      let serverError = "Unable to submit. Please try again.";

      let data = null;
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // fallback text
        const text = await response.text();
        if (response.ok) {
          serverMessage = text || serverMessage;
        } else {
          serverError = text || serverError;
        }
      }
      if (response.ok) {
        setSubmitted(true);
        setSubmitMessage({
          type: "success",
          text: data?.message || serverMessage,
        });
        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
          classType: "group",
        });
      } else {
        setSubmitMessage({
          type: "error",
          text: data?.error || serverError,
        });
      }
    } catch (err) {
      setSubmitMessage({
        type: "error",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed z-[100] top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center px-2"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      style={{ overflowY: 'auto' }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-lg w-full relative"
        style={{
          maxHeight: "calc(100vh - 40px)",
          overflowY: "auto",
        }}
      >
        <button
          className="absolute right-4 top-4 text-2xl font-bold text-gray-800 hover:text-orange-500"
          aria-label="Close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
        <h2 className="text-xl sm:text-2xl font-bold mb-1 text-blue-900 font-serif">
          Enroll for {course?.title}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Please fill out your details and we will contact you for the next steps.
        </p>
        {submitted ? (
          <div className="text-center py-10 min-h-[48px] text-green-700 font-semibold text-lg">
            {submitMessage?.text || "Your enrolment has been submitted!"}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-blue-900 font-medium mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full border ${errors.name ? "border-red-500" : "border-gray-300"} px-3 py-2 rounded-md`}
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                required
                autoComplete="name"
                disabled={submitting}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm text-blue-900 font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full border ${errors.email ? "border-red-500" : "border-gray-300"} px-3 py-2 rounded-md`}
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                required
                autoComplete="email"
                disabled={submitting}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm text-blue-900 font-medium mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full border ${errors.phone ? "border-red-500" : "border-gray-300"} px-3 py-2 rounded-md`}
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                required
                autoComplete="tel"
                disabled={submitting}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            {/* New: Class Type Option */}
            <div>
              <label className="block text-sm text-blue-900 font-medium mb-1">
                Choose your class type <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-row items-center gap-5">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="classType"
                    value="group"
                    checked={form.classType === "group"}
                    onChange={handleInputChange}
                    disabled={submitting}
                    className="accent-orange-500"
                  />
                  <span className="ml-2 text-sm">Online Group Classes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="classType"
                    value="single"
                    checked={form.classType === "single"}
                    onChange={handleInputChange}
                    disabled={submitting}
                    className="accent-orange-500"
                  />
                  <span className="ml-2 text-sm">Online Single Classes</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm text-blue-900 font-medium mb-1">
                Message / Query (Optional)
              </label>
              <textarea
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
                name="message"
                value={form.message}
                onChange={handleInputChange}
                rows={3}
                placeholder="Any message or query (optional)"
                disabled={submitting}
              />
            </div>
            {submitMessage?.type === "error" && (
              <div className="bg-red-100 text-red-600 text-center rounded-md p-2 text-sm">
                {submitMessage.text}
              </div>
            )}
            <button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md text-sm sm:text-base font-semibold flex items-center justify-center gap-2"
              type="submit"
              disabled={submitting}
            >
              {submitting ? (
                <span>
                  <svg className="inline-block mr-1 animate-spin" width={20} height={20} viewBox="0 0 50 50">
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="5"
                      opacity="0.5"
                    />
                    <path
                      d="M25 5
                        a 20 20 0 0 1 0 40
                        a 20 20 0 0 1 0 -40"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Enrolment"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function kebabCase(str) {
  // Utility to make "Digital Literacy & Internet Essentials" -> "digital-literacy-internet-essentials"
  return str
    .toLowerCase()
    .replace(/[\s&/]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function Cources({ allData }) {
  const COURSES_DETAILS = allData?.courses ?? [];
  const [enrollCourse, setEnrollCourse] = useState(null); // Will hold the course being enrolled for

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-10 py-10">
      <section className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-blue-900 tracking-tight font-serif">
          All Courses
        </h1>
        <p className="text-gray-600 mb-4 font-serif">
          Explore our range of job-ready vocational, computer, and workplace skills programs. All courses include live Zoom instruction, practical assignments, and certificates.
        </p>
        {COURSE_NOTES && COURSE_NOTES.length > 0 && (
          <ul className="bg-orange-50 border-l-4 border-orange-400 px-4 py-3 mb-2 rounded-lg list-disc list-inside text-orange-800 text-sm">
            {COURSE_NOTES.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2">
          {COURSES_DETAILS.map((course) => (
            <div
              id={course.slug}
              key={course.id}
              className="rounded-xl shadow-lg bg-white p-6 md:p-10 border border-blue-100"
            >
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-3 gap-1">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-1 font-serif">
                  {course.title}
                </h3>
                <span className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest">
                  {course.category}
                </span>
              </div>
              <div className="mb-3 text-md text-gray-800 italic">
                {course.tagline}
              </div>
              <div className="flex flex-wrap gap-4 items-center text-sm mb-4">
                <span className="inline-flex items-center gap-x-1 px-3 py-1 bg-blue-50 text-blue-800 rounded-lg font-medium">
                  <strong>Duration:</strong> {course.duration}
                </span>
                <span className="inline-flex items-center gap-x-1 px-3 py-1 bg-blue-50 text-blue-800 rounded-lg font-medium">
                  <strong>Mode:</strong> {course.mode}
                </span>
                <span className="inline-flex items-center gap-x-1 px-3 py-1 bg-orange-50 text-orange-700 rounded-lg font-bold">
                  <strong>Fee:</strong> {course.fee}
                </span>
              </div>
              <p className="text-gray-700 mb-4 line-clamp-3">{course.about.substring(0, 120)}...</p>
              <div className="flex gap-4 mt-3">
                <Link
                  to={`/courses/${course.slug}`}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-lg transition-colors"
                >
                  View Full Details
                </Link>
                <button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg transition-colors"
                  onClick={() => setEnrollCourse(course)}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Modal, positioned at the end so it appears above everything */}
        {enrollCourse && (
          <CourseEnrollModal course={enrollCourse} onClose={() => setEnrollCourse(null)} />
        )}
      </section>
    </div>
  );
}

// Helper to get slug by full course name from COURSES_DETAILS or fallback to kebab-case
// Needs to be passed COURSES_DETAILS in the new situation
function getCourseSlugByName(name, COURSES_DETAILS) {
  const detailObj =
    COURSES_DETAILS.find((c) => c.title.toLowerCase() === name.toLowerCase()) ||
    COURSES_DETAILS.find((c) => c.title.toLowerCase().includes(name.toLowerCase().replace(/&/g, "and")));
  return detailObj ? detailObj.slug : kebabCase(name);
}
