import { FaBriefcase, FaUserGraduate, FaChartLine, FaUsers } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white overflow-hidden pb-20 ">

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-6 py-28 text-center">

        {/* Tagline */}
        <p className="text-orange-400 font-semibold tracking-widest mb-4">
          DREAM | DISCOVER | DELIVER
        </p>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-6">
          India's Youth Deserves
          <span className="text-orange-400"> Better Opportunities</span>
        </h1>

        {/* Description */}
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-blue-100 mb-10">
          Sudhosan Skill Solutions bridges the gap between education and employment 
          through industry-aligned training, career guidance, and direct placement 
          opportunities — empowering students and professionals across emerging cities in India.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">

          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold shadow-lg transition">
            <FaBriefcase />
            Find a Job
          </button>

          <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold shadow-lg transition">
            <FaUserGraduate />
            Explore Training Cources
          </button>

        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
            <FaUsers className="text-orange-400 text-2xl mx-auto mb-2" />
            <p className="text-2xl font-bold">100+</p>
            <p className="text-sm text-blue-100">Students Trained</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
            <FaBriefcase className="text-orange-400 text-2xl mx-auto mb-2" />
            <p className="text-2xl font-bold">50+</p>
            <p className="text-sm text-blue-100">Candidates Placed</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
            <FaChartLine className="text-orange-400 text-2xl mx-auto mb-2" />
            <p className="text-2xl font-bold">10+</p>
            <p className="text-sm text-blue-100">Partner Companies</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
            <FaUserGraduate className="text-orange-400 text-2xl mx-auto mb-2" />
            <p className="text-2xl font-bold">5+</p>
            <p className="text-sm text-blue-100">Cities Served</p>
          </div>

        </div>

      </div>

      {/* Bottom Wave Shape */}
      <div className="absolute -bottom-[2px] left-0 w-screen overflow-hidden leading-none">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"></path></svg>
      </div>

    </section>
  );
}