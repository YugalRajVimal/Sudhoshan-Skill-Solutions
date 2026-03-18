import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 font-serif tracking-tight mb-4 drop-shadow-lg">
            Contact <span className="text-orange-500">Sudhosan Skill Solutions</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
            We're here to empower you on your career journey.<br/>
            Reach out to us for guidance, training, or placement support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-14 items-stretch">
          {/* LEFT SIDE */}
          <div className="flex flex-col justify-between">
            {/* Contact Card with Icons */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-600 p-10 rounded-2xl shadow-xl text-white mb-10 flex flex-col gap-7">
              <h2 className="text-2xl font-bold font-serif mb-2 tracking-tight">
                Let’s Connect
              </h2>
              <ContactInfoItem 
                icon={<FaMapMarkerAlt size={26} className="text-orange-400"/>}
                title="Head Office"
                content="Sheohar, Bihar – 843329"
              />
              <ContactInfoItem 
                icon={<FaPhoneAlt size={24} className="text-green-300"/>}
                title="Phone"
                content="08062178899"
                link="tel:08062178899"
              />
              <ContactInfoItem 
                icon={<FaEnvelope size={24} className="text-yellow-300"/>}
                title="Email"
                content="info@sudhosanskillsolutions.in"
                link="mailto:info@sudhosanskillsolutions.in"
              />
              <div className="flex gap-4 mt-3">
                <a
                  href="https://wa.me/918062178899"
                  className="flex-1 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-center font-semibold transition-colors text-white shadow"
                  target="_blank" rel="noopener noreferrer"
                >
                  WhatsApp Us
                </a>
                <a
                  href="tel:08062178899"
                  className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-center font-semibold transition-colors text-white shadow"
                >
                  Call Now
                </a>
              </div>
            </div>
            {/* Office Map/Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-blue-100">
            

<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.6746984948813!2d85.10785477622666!3d25.615723677443867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed595af2dd0413%3A0x31abdc895b9d9fdd!2sSudhosan%20Skill%20Solutions%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1773818362839!5m2!1sen!2sin" 
width="600" 
height="450" 

allowfullscreen="" 
loading="lazy" 
referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="bg-white/90 backdrop-blur-lg p-10 rounded-2xl shadow-xl flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-7 font-serif tracking-tight">
              Send Us a Message
            </h2>
            <form className="space-y-7">
              {/* Name */}
              <FormField label="Full Name" type="text" placeholder="Your Name" />
              {/* Email */}
              <FormField label="Email Address" type="email" placeholder="example@email.com" />
              {/* Phone */}
              <FormField label="Phone Number" type="tel" placeholder="+91 XXXXX XXXXX" />
              {/* Resume Upload */}
              <FormField label="Upload Resume" type="file" />
              {/* Message */}
              <div>
                <label className="text-sm text-gray-600 font-medium mb-1 block">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="How can we help you?"
                  className="w-full border border-blue-200 rounded-md px-4 py-3 shadow-sm mt-1 resize-none focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
                />
              </div>
              {/* Submit */}
              <button
                className="w-full bg-gradient-to-r from-orange-500 to-blue-900 text-white py-3 rounded-lg font-bold shadow-lg hover:from-blue-900 hover:to-orange-500 transition-colors text-lg tracking-wide"
                type="submit"
              >
                Submit Inquiry
              </button>
            </form>
            <p className="text-sm text-gray-400 text-center mt-6">
              We respect your privacy. We'll never share your details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact info item helper for consistency
function ContactInfoItem({ icon, title, content, link }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="font-semibold">{title}</p>
        {link ? (
          <a href={link} className="text-blue-100 underline text-sm" target="_blank" rel="noopener noreferrer">
            {content}
          </a>
        ) : (
          <p className="text-blue-100 text-sm">{content}</p>
        )}
      </div>
    </div>
  );
}

// Standard form field
function FormField({ label, type, placeholder }) {
  return (
    <div>
      <label className="text-sm text-gray-600 font-medium mb-1 block">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full mt-1 border border-blue-200 rounded-md px-4 py-3 shadow-sm
         focus:ring-2 focus:ring-orange-400 focus:outline-none transition
         ${type === "file" ? "px-0 py-2 text-gray-500" : ""}
        `}
      />
    </div>
  );
}