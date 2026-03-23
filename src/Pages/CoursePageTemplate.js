import React, { useState, useRef } from "react";

function CourseEnrollModal({ course, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
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
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let serverMessage = "Your enrollment request was submitted successfully.";
      let serverError = "Unable to submit. Please try again.";

      // Normalize response body
      let data = null;
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // fallback text
        const text = await response.text();
        // this happens if backend uses res.send(string)
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

const CoursePageTemplate = ({ course }) => {
  const [enrollOpen, setEnrollOpen] = useState(false);

  if (!course) {
    return (
      <div className="text-center py-24 text-3xl font-semibold bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white min-h-[50vh] flex items-center justify-center">
        Course not found
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white py-24 text-center px-6 overflow-hidden min-h-[380px] flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(to bottom right, #1e3a8a, #2563eb, #3b82f6)',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        {/* Decorative background image overlay with blur and gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: 'url("/bg.png")',
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 90%)",
            maskImage: "linear-gradient(to right, transparent 60%, black 100%)",
            filter: "blur(4px) opacity(0.7)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-extrabold font-serif mb-5 drop-shadow-lg tracking-tight">
            {course.title}
          </h1>
          <p className="text-orange-400 font-semibold text-xl mb-4">{course.tagline}</p>
          <div className="w-36 h-1 rounded-full bg-orange-400 mx-auto my-3" />

          <div className="flex justify-center gap-6 mt-4 text-lg flex-wrap">
            <span className="bg-white/20 px-4 py-2 rounded shadow text-white font-medium">
              Duration: {course.duration}
            </span>
            <span className="bg-white/20 px-4 py-2 rounded shadow text-white font-medium">
              Mode: {course.mode}
            </span>
            <span className="bg-white/20 px-4 py-2 rounded shadow text-white font-medium">
              Fee: {course.fee}
            </span>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 rounded-2xl shadow-lg p-10">

          {/* About */}
          <h2 className="text-3xl font-bold font-serif mb-7 text-blue-800 text-center">About This Course</h2>
          <p className="text-gray-700 text-lg md:text-xl mb-10 leading-relaxed text-center">
            {course.about}
          </p>

          {/* Who is this for */}
          <h3 className="text-xl font-semibold mb-3 text-orange-600 text-center">Who Is This For?</h3>
          <p className="text-gray-700 mb-8 text-center">
            {course.whoIsThisFor}
          </p>

          {/* What you will achieve */}
          <h3 className="text-xl font-semibold mb-3 text-blue-700 text-center">What You Will Achieve</h3>
          <p className="text-gray-700 mb-12 text-center">
            {course.whatAchieve}
          </p>

          {/* Curriculum */}
          <h2 className="text-3xl font-bold font-serif mb-7 text-blue-800 text-center">Course Curriculum</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {course.curriculum.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 items-start bg-white border-l-4 border-orange-400 rounded-xl shadow transition-transform hover:scale-105 hover:shadow-lg duration-200 p-6"
              >
                <div className="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 text-orange-600 text-2xl font-bold shadow-sm">
                  {index + 1}
                </div>
                <div className="text-gray-800 text-lg">{item}</div>
              </div>
            ))}
          </div>

          {/* Certificate */}
          <h3 className="text-2xl font-bold text-blue-900 mb-4 text-center">Certification</h3>
          <p className="text-gray-600 text-center mb-2">
            {course.certificate}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-tr from-blue-100 via-white to-orange-100 py-20 px-4 text-center rounded-t-3xl shadow-inner">
        <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-blue-900 drop-shadow">
          Start Your Learning Journey with <span className="text-orange-500">Sudhosan</span>
        </h3>
        <p className="text-gray-700 mb-8 text-lg max-w-2xl mx-auto">
          Join thousands of students building job-ready skills with Sudhosan Skill Solutions. Become a part of the movement to empower yourself!
        </p>
        <button
          type="button"
          onClick={() => setEnrollOpen(true)}
          className="inline-block bg-orange-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-orange-600 hover:scale-105 transition transform duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
          Enroll Now
        </button>
      </section>
      {enrollOpen && (
        <CourseEnrollModal course={course} onClose={() => setEnrollOpen(false)} />
      )}
    </div>
  );
};

export default CoursePageTemplate;