import { useState } from "react";

export default function EnquiryPopup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setOpen(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 bg-orange-600 text-white px-4 py-3 rounded-l-lg rotate-180 writing-mode-vertical font-semibold z-50"
        style={{ writingMode: "vertical-rl" }}
      >
        ENQUIRY
      </button>


      {/* Popup Overlay */}

      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">

          {/* Form Card */}

          <div className="bg-white max-w-lg w-full rounded-xl shadow-xl p-8 relative">

            {/* Close */}

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500"
            >
              ✕
            </button>


            {/* Title */}

            <h2 className="text-2xl font-bold text-blue-900 mb-6">
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

              {/* Enquiry Type */}

              <select className="w-full border rounded-md p-3">

                <option value="">Enquiry For</option>

                <option>Education & Skill Training</option>

                <option>Employment Placement</option>

                <option>Career Guidance</option>

                <option>Corporate Training</option>

                <option>Digital Platforms</option>

                <option>Franchise Partnership</option>

              </select>


              {/* Message */}

              <textarea
                rows="3"
                placeholder="Your Message"
                className="w-full border rounded-md p-3"
              />


              {/* Privacy */}

              <label className="flex items-start gap-2 text-sm text-gray-600">

                <input type="checkbox" className="mt-1" />

                I agree to the privacy policy and allow Sudhosan Skill
                Solutions to contact me.

              </label>


              {/* Captcha placeholder */}

              <div className="border rounded-md p-4 text-center text-gray-500 text-sm">
                reCAPTCHA verification
              </div>


              {/* Buttons */}

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
      )}
    </>
  );
}