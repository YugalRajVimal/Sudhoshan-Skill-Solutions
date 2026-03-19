import { useState } from "react";

export default function EnquiryPopup() {
  const [open, setOpen] = useState(false);

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
        style={{height: "auto"}}
      >
        {/* Floating Button always visible, stays on the left of the form */}
        <button
          onClick={() => setOpen(true)}
          className={`bg-orange-600 text-white px-4 py-3 rounded-l-lg font-semibold z-50 transition-transform duration-300
          relative left-0 top-0
          flex-shrink-0
          ${open ? "" : ""}
          `}
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
            bg-white rounded-l-lg shadow-xl transform transition-all duration-300 ease-in-out overflow-hidden
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
            style={{height:"100%"}}
          >
            {/* Title */}
            <h2 className="text-2xl font-bold text-blue-900 mb-6 mt-2">
              How Can We Help You?
            </h2>

            {/* Form */}
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name *"
                className="w-full border rounded-md p-3"
              />

              <input
                type="email"
                placeholder="Email Address *"
                className="w-full border rounded-md p-3"
              />

              <input
                type="tel"
                placeholder="Phone Number *"
                className="w-full border rounded-md p-3"
              />

              <input
                type="text"
                placeholder="Location *"
                className="w-full border rounded-md p-3"
              />

              <select className="w-full border rounded-md p-3">
                <option value="">Enquiry For</option>
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
                rows="3"
                placeholder="Your Message"
                className="w-full border rounded-md p-3"
              />

              <label className="flex items-start gap-2 text-sm text-gray-600">
                <input type="checkbox" className="mt-1" />
                I agree to the privacy policy and allow contact.
              </label>

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 w-full"
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="border px-6 py-3 rounded-md w-full"
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