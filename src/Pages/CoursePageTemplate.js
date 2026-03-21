import React from "react";

const CoursePageTemplate = ({ course }) => {
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
        <a
          href="/contact"
          className="inline-block bg-orange-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-orange-600 hover:scale-105 transition transform duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
          Enroll Now
        </a>
      </section>
    </div>
  );
};

export default CoursePageTemplate;