export function OurMission() {
  return (
    <section className="py-20 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-14 items-start">
        {/* Who We Are */}
        <div className="w-full flex flex-col md:flex-row gap-12 items-center">
          {/* Logo Section */}
          <div className="md:w-1/3 w-full flex justify-center md:justify-start mb-6 md:mb-0">
            <img
              src="/logo.png"
              alt="Sudhosan Skill Solutions Private Limited Logo"
              className="rounded-xl  w-full h-auto shadow-xl border-4 border-orange-400 bg-white"
            />
          </div>
          {/* Text Section */}
          <div className="md:w-2/3 w-full">
            <h2 className="font-serif text-4xl text-blue-900  font-bold mb-4">Who We Are</h2>
            <p className="text-gray-800 mb-5 text-lg leading-relaxed">
              <span className="font-semibold text-blue-800">
                Sudhosan Skill Solutions Private Limited
              </span>{" "}
              is an emerging education, skill development, and employment solutions company incorporated in November 2025, headquartered in Sheohar, Bihar.
              Our driving purpose is clear — to make quality skill training, career guidance, and real job opportunities accessible to every young Indian, regardless of location.
            </p>
            <p className="text-gray-700 mb-5 text-lg leading-relaxed">
              We operate across six integrated verticals:
              <span className="font-medium"> skill training</span>,{" "}
              <span className="font-medium">employment placement</span>,{" "}
              <span className="font-medium">career counselling</span>,{" "}
              <span className="font-medium">information services</span>,{" "}
              <span className="font-medium">digital platforms</span>, and{" "}
              <span className="font-medium">institutional partnerships</span>.
              We proudly serve students, job seekers, working professionals, and businesses across Tier 2 and Tier 3 cities in India.
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              We are a <span className="font-semibold text-orange-500">Startup India</span> recognized company, registered under the Companies Act, 2013 with the Ministry of Corporate Affairs, Govt. of India.
            </p>
          </div>
        </div>

        {/* Modern divider with fading edge effect */}
        <div className="relative w-full my-12">
          <div className="h-1 w-full bg-gradient-to-r from-orange-400 via-orange-200 to-orange-400 rounded-full opacity-60"></div>
        </div>

        {/* WHY WE STARTED Modern Section */}
        <div className="w-full flex flex-col md:flex-row-reverse items-stretch gap-10">
          {/* Styled Card */}
          <div className="flex-1 bg-gradient-to-br from-white via-orange-50 to-orange-100/60 rounded-3xl p-8 shadow-xl border border-orange-200">
            <h3 className="text-3xl md:text-2xl font-extrabold text-orange-600 mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-8 rounded bg-orange-400 mr-2" />Why We Started
            </h3>
            <div className="space-y-4 text-lg">
              <p className="text-gray-700">
                India produces millions of graduates every year. Yet, many struggle to find jobs—not because of lack of talent, but due to missing skills, mentorship, and opportunities that urban youth often take for granted.
              </p>
              <p className="text-gray-700">
                In Tier 2 & Tier 3 cities like Sheohar, Sitamarhi, and rural Bihar, capable youth face an invisible wall: limited placement support, career guidance, or quality skill training. Degrees often don&#39;t open real doors.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                <p className="text-gray-800 font-semibold">
                  Sudhosan Skill Solutions was born to break that wall.
                </p>
              </div>
            </div>
          </div>
          {/* Subtle illustration accent (optional, uses emoji for now) */}
        
        </div>

        {/* Vision & Mission Cards in a modern horizontal stack (on desktop) */}
        <div className="w-full flex flex-col md:flex-row gap-8 mt-14">
          {/* Vision */}
          <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-blue-100/80 border border-blue-100 rounded-3xl p-8 shadow-lg flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2">
              <span className="inline-block w-2 h-7 rounded bg-blue-400 mr-1" />Our Vision
            </h3>
            <p className="text-blue-900 text-lg italic font-semibold mb-2">
              “To build a skilled, informed, and employable India by providing accessible, innovative, and high-quality educational and career solutions.”
            </p>
          </div>
          {/* Mission */}
          <div className="flex-1 bg-gradient-to-br from-orange-50 via-white to-orange-100/80 border border-orange-100 rounded-3xl p-8 shadow-lg flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold text-orange-600 mb-3 flex items-center gap-2">
              <span className="inline-block w-2 h-7 rounded bg-orange-400 mr-1" />Our Mission
            </h3>
            <p className="text-gray-800 mb-2 text-base md:text-lg leading-relaxed">
              Our mission is to unlock real opportunities for every young Indian, especially those in overlooked Tier 2 & Tier 3 cities, by providing affordable, industry-aligned courses, direct placement support, and personalised career guidance—empowering every learner to move confidently from learning to earning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}