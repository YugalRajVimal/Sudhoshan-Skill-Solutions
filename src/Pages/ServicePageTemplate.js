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

      <section className="bg-blue-900 text-white py-20 text-center px-6">

        <h1 className="text-4xl font-bold mb-4">
          {service.title}
        </h1>

        <p className="text-orange-400 font-semibold">
          {service.tagline}
        </p>

      </section>


      {/* Description */}

      <section className="max-w-6xl mx-auto py-16 px-6">

        <p className="text-gray-700 text-lg mb-10">
          {service.description}
        </p>


        {/* Features */}

        <h2 className="text-2xl font-bold mb-6">
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

        <h3 className="text-2xl font-bold mb-4">
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