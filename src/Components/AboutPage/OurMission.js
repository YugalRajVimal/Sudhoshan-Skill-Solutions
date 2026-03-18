export function OurMission() {
  return (
    <section className="py-20 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">

        <img
          src="/logo.png"
          alt="Sudhosan Skill Solutions"
          className="rounded-2xl max-h-[300px] shadow-lg mx-auto"
        />

        <div>
          <h2 className="font-serif text-3xl font-bold text-gray-800 mb-2">
            Our Mission
          </h2>
          <p className="text-[17px] tracking-wide uppercase font-semibold text-orange-500 mb-2">
            DREAM | DISCOVER | DELIVER
          </p>
          <p className="text-blue-900 font-bold italic mb-4">
            "India’s Youth Deserves Better Opportunities."
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            At <span className="font-semibold text-blue-700">Sudhosan Skill Solutions Pvt. Ltd.</span>,
            we bridge the gap between education and employment for youth in rural and semi-urban India.
            Our mission is to empower students and professionals through industry-aligned training, career guidance, and direct job placement, building a skilled workforce for a better tomorrow.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white shadow-md px-6 py-4 rounded-lg flex items-center gap-3">
              <span role="img" aria-label="Education & Skills">🎓</span>
              <span>
                <span className="font-bold">Skill Training</span>
              </span>
            </div>
            <div className="bg-white shadow-md px-6 py-4 rounded-lg flex items-center gap-3">
              <span role="img" aria-label="Career Placement">💼</span>
              <span>
                <span className="font-bold">Placement & Staffing</span>
              </span>
            </div>
            <div className="bg-white shadow-md px-6 py-4 rounded-lg flex items-center gap-3">
              <span role="img" aria-label="Career Guidance">🎯</span>
              <span>
                <span className="font-bold">Career Guidance</span>
              </span>
            </div>
            <div className="bg-white shadow-md px-6 py-4 rounded-lg flex items-center gap-3">
              <span role="img" aria-label="Digital Service">🌐</span>
              <span>
                <span className="font-bold">Digital Learning</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}