import React from "react";

const ServicePageTemplate = ({ service }) => {

  if (!service) {
    return (
      <div className="text-center py-20 text-2xl">
        Service not found
      </div>
    );
  }

  return (
    <div className="bg-white">

      {/* Hero */}

      <section
        className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white py-20 text-center px-6 overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(to bottom right, #1e3a8a, #2563eb, #3b82f6)',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
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
            maskImage: "linear-gradient(to right, transparent 50%, black 90%)",
          }}
        />

        <div className="relative z-10">
          <h1 className="text-4xl font-bold font-serif mb-4">
            {service.title}
          </h1>
          <p className="text-orange-400 font-semibold">
            {service.tagline}
          </p>
        </div>
      </section>


      {/* Description */}

      <section className="max-w-6xl mx-auto py-16 px-6">

        <p className="text-gray-700 text-lg mb-10">
          {service.description}
        </p>


        {/* Features */}

        <h2 className="text-2xl font-bold font-serif mb-6">
          What We Offer
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {service.features.map((feature, index) => (

            <div
              key={index}
              className="p-6 bg-gray-50 rounded-lg shadow-sm"
            >
              {feature}
            </div>

          ))}

        </div>

      </section>


      {/* CTA */}

      <section className="bg-gray-50 py-16 text-center">

        <h3 className="text-2xl font-bold font-serif mb-4">
          Start Your Journey with Sudhosan
        </h3>

        <p className="text-gray-600 mb-6">
          Empowering India's youth with better opportunities.
        </p>

        <button className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600">
          Contact Us
        </button>

      </section>

    </div>
  );
};

export default ServicePageTemplate;