import React from "react";

const CoursePageTemplate = ({ course }) => {

  if (!course) {
    return (
      <div className="text-center py-20 text-2xl">
        Course not found
      </div>
    );
  }

  return (
    <div className="bg-white">

      {/* HERO */}

      <section
        className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white py-20 text-center px-6 overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(to bottom right, #1e3a8a, #2563eb, #3b82f6)',
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
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
            {course.title}
          </h1>

          <p className="text-orange-400 font-semibold mb-6">
            {course.tagline}
          </p>

          <div className="flex justify-center gap-6 text-sm flex-wrap">
            <span className="bg-white/20 px-4 py-2 rounded">
              Duration: {course.duration}
            </span>
            <span className="bg-white/20 px-4 py-2 rounded">
              Mode: {course.mode}
            </span>
            <span className="bg-white/20 px-4 py-2 rounded">
              Fee: {course.fee}
            </span>
          </div>
        </div>
      </section>


      {/* ABOUT */}

      <section className="max-w-6xl mx-auto py-16 px-6">

        <h2 className="text-2xl font-bold mb-4">
          About This Course
        </h2>

        <p className="text-gray-700 leading-relaxed mb-10">
          {course.about}
        </p>


        {/* WHO IS THIS FOR */}

        <h3 className="text-xl font-semibold mb-3">
          Who Is This For?
        </h3>

        <p className="text-gray-700 mb-8">
          {course.whoIsThisFor}
        </p>


        {/* WHAT YOU WILL ACHIEVE */}

        <h3 className="text-xl font-semibold mb-3">
          What You Will Achieve
        </h3>

        <p className="text-gray-700 mb-12">
          {course.whatAchieve}
        </p>


        {/* CURRICULUM */}

        <h2 className="text-2xl font-bold mb-6">
          Course Curriculum
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {course.curriculum.map((item, index) => (

            <div
              key={index}
              className="p-5 bg-gray-50 rounded-lg shadow-sm"
            >
              {index + 1}. {item}
            </div>

          ))}

        </div>

      </section>


      {/* CERTIFICATE */}

      <section className="bg-gray-50 py-16 text-center">

        <h3 className="text-2xl font-bold mb-4">
          Certification
        </h3>

        <p className="text-gray-600">
          {course.certificate}
        </p>

      </section>


      {/* CTA */}

      <section className="bg-slate-900 text-white py-16 text-center">

        <h3 className="text-2xl font-bold mb-4">
          Start Learning Today
        </h3>

        <p className="mb-6">
          Join thousands of students building job-ready skills with Sudhosan Skill Solutions.
        </p>

        <button className="bg-orange-500 px-6 py-3 rounded-md hover:bg-orange-600">
          Enroll Now
        </button>

      </section>

    </div>
  );
};

export default CoursePageTemplate;