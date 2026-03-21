import React from "react";
import { Link } from "react-router-dom";

export default function ServicesPage({ allData }) {
  const services = allData?.services ?? [];

  return (
    <div className=" min-h-screen text-black">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto pt-24 pb-10 px-6 text-center relative">
        <h1 className="text-5xl md:text-6xl  font-bold font-serif mb-4">
          Our Services
        </h1>
        <p className="text-lg md:text-xl text-orange-500 font-medium mb-7 max-w-2xl mx-auto">
          Empowering students, job-seekers, and corporates with skill-driven growth.
        </p>
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none select-none"
        >
          <img
            src="/bg.png"
            alt=""
            className="opacity-15 w-full h-full object-cover mix-blend-soft-light rounded-xl"
            style={{ maskImage: "linear-gradient(to right, transparent 0%, black 85%)" }}
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24 z-10 relative">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="group block bg-white/90 shadow-xl rounded-2xl overflow-hidden hover:scale-105 hover:shadow-2xl hover:bg-blue-100/90 transition-all duration-200 border border-blue-900/10 cursor-pointer text-[#1e293b]"
              style={{
                minHeight: 320,
              }}
            >
              {/* Decorative colored top bar */}
              <div
                className="h-1 w-full"
                style={{
                  background: "linear-gradient(90deg, #ff7a00 0%,rgb(228, 119, 2) 100%)",
                }}
              />
              <div className="p-8 pt-6 flex flex-col h-full">
                <h2 className="text-2xl font-bold font-serif mb-2 text-blue-900 group-hover:text-[#ff7a00] transition-colors">
                  {service.title}
                </h2>
                <p className="text-orange-500 font-medium mb-3">
                  {service.tagline}
                </p>
                <p className="text-gray-700 mb-4 line-clamp-4 flex-1">
                  {service.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-blue-100 text-blue-900 font-medium rounded px-2 py-1 text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                  {service.features.length > 3 && (
                    <span className="inline-block bg-gray-200 text-gray-600 rounded px-2 py-1 text-xs">
                      +{service.features.length - 3} more
                    </span>
                  )}
                </div>
                {/* CTA */}
                <div className="mt-7 flex justify-end">
                  <span className="group-hover:text-[#ff7a00] font-bold transition-colors flex items-center gap-1">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}