import React from "react";

/**
 * ServicePageTemplate
 * Displays detailed information for a single service including
 * the service title, tagline, description, features, and a CTA button.
 * 
 * Expects a "service" prop structured as in the ServicesPage list.
 */
const ServicePageTemplate = ({ service, setOpen }) => {
  if (!service) {
    return (
      <div className="text-center py-24 text-3xl font-semibold bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white min-h-[50vh] flex items-center justify-center">
        Service not found
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white py-24 text-center px-6 overflow-hidden min-h-[380px] flex items-center justify-center">
        {/* Decorative background image overlay */}
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
          <h1 className="text-5xl md:text-6xl font-bold font-serif mb-5 drop-shadow-lg tracking-tight">
            {service.title}
          </h1>
          {service.tagline && (
            <p className="text-orange-400 font-medium text-xl mb-4">{service.tagline}</p>
          )}
          <div className="w-36 h-1 rounded-full bg-orange-400 mx-auto my-3" />
        </div>
      </section>

      {/* Description and Features */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 rounded-2xl shadow-lg p-10">
          <p className="text-gray-700 text-lg md:text-xl mb-10 leading-relaxed text-center">
            {service.description}
          </p>
          <h2 className="text-3xl font-bold font-serif mb-7 text-blue-800 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {(service.features || []).map((feature, idx) => (
              <div
                key={idx}
                className="flex gap-4 items-start bg-white border-l-4 border-orange-400 rounded-xl shadow transition-transform hover:scale-105 hover:shadow-lg duration-200 p-6"
              >
                <div className="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 text-orange-600 text-2xl font-bold shadow-sm">
                  {idx + 1}
                </div>
                <div className="text-gray-800 text-lg">{feature}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-tr from-blue-100 via-white to-orange-100 py-20 px-4 text-center rounded-t-3xl shadow-inner">
        <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-blue-900 drop-shadow">
          Start Your Journey with <span className="text-orange-500">Sudhosan</span>
        </h3>
        <p className="text-gray-700 mb-8 text-lg max-w-2xl mx-auto">
          Empowering India's youth with better opportunities. Reach out to us today and become part of the movement.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-block bg-orange-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-orange-600 hover:scale-105 transition transform duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default ServicePageTemplate;