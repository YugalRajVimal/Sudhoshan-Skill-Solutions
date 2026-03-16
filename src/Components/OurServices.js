import {
  FaBriefcase,
  FaUserGraduate,
  FaBuilding,
  FaGraduationCap,
  FaUserTie,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaHandshake,
} from "react-icons/fa";

export default function ServicesSection() {
  const majorServices = [
    {
      icon: <FaBriefcase />,
      title: "For Job Seekers",
      items: [
        "Job Placement Assistance",
        "Resume Building Support",
        "Interview Preparation",
        "Skill Training Programs",
      ],
      color: "border-orange-500",
      iconBg: "bg-orange-100",
    },
    {
      icon: <FaUserGraduate />,
      title: "For Students",
      items: [
        "Education & Skill Training",
        "Career Counselling",
        "Admission Guidance",
        "Education Planning",
      ],
      color: "border-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      icon: <FaBuilding />,
      title: "For Businesses",
      items: [
        "Corporate Training",
        "Staffing & Recruitment",
        "Workforce Development",
        "Industry Partnerships",
      ],
      color: "border-orange-500",
      iconBg: "bg-indigo-100",
    },
  ];

  const otherServices = [
    {
      icon: <FaGraduationCap />,
      title: "Education & Skill Training",
      desc: "Industry-aligned certification programs and skill development courses.",
      color: "text-indigo-600",
      iconBg: "bg-indigo-100",
    },
    {
      icon: <FaUserTie />,
      title: "Career Guidance",
      desc: "Personalized counselling, aptitude tests, and career planning.",
      color: "text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      icon: <FaChalkboardTeacher />,
      title: "Corporate Training",
      desc: "Upskilling programs designed for companies and organizations.",
      color: "text-orange-500",
      iconBg: "bg-orange-100",
    },
    {
      icon: <FaLaptopCode />,
      title: "Digital Platforms",
      desc: "Web portals, LMS platforms, and digital education infrastructure.",
      color: "text-green-600",
      iconBg: "bg-green-100",
    },
    {
      icon: <FaHandshake />,
      title: "Franchise & Partnerships",
      desc: "Collaborative initiatives, franchising, and institutional partnerships.",
      color: "text-purple-600",
      iconBg: "bg-purple-100",
    },
  ];

  return (
    <section className="relative py-24 ">
      {/* <div className="absolute top-0 left-0 w-full h-36 bg-gradient-to-r from-orange-100 via-blue-100 to-transparent opacity-70 pointer-events-none -z-10 rounded-b-3xl"></div> */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <p className="text-orange-500 font-bold tracking-wider uppercase text-sm">
            Our Services
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold text-gray-800 mt-3 leading-snug drop-shadow">
            Empowering Careers Through{" "}
            <span className="bg-gradient-to-r from-orange-400 to-blue-600 bg-clip-text text-transparent">
              Skills & Opportunities
            </span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg md:text-xl">
            Sudhosan Skill Solutions bridges education and employment through
            industry-aligned training, career guidance, and workforce solutions.
          </p>
        </div>

        {/* Top Major Cards */}
        <div className="grid md:grid-cols-3  gap-10 mb-20">
          {majorServices.map((service, index) => (
            <div
              key={index}
              className={`group bg-white rounded-3xl shadow-lg p-9 border-t-4 ${service.color} hover:shadow-2xl hover:-translate-y-2 transition duration-300 relative overflow-hidden`}
            >
              <div
                className={`flex items-center justify-center w-16 h-16 ${service.iconBg} rounded-xl mb-5 shadow-inner border-2 border-white group-hover:scale-105 transition`}
              >
                <span className="text-4xl text-orange-500 group-hover:rotate-12 transition">
                  {service.icon}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 tracking-tight group-hover:text-orange-500 transition">
                {service.title}
              </h3>
              <ul className="space-y-3 text-gray-700 pl-1">
                {service.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-base leading-relaxed"
                  >
                    <span className="w-2 h-2 rounded-full bg-orange-400 inline-block"></span>
                    {item}
                  </li>
                ))}
              </ul>
              {/* Decorative corner shadow */}
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-200 to-transparent opacity-40 rounded-tl-full pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Other Services */}
        <div className="flex flex-wrap justify-center gap-8">
          {otherServices.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center w-full md:w-[45%] lg:w-[28%] max-w-xs relative group border border-gray-100 hover:border-blue-200"
            >
              <div
                className={`flex items-center justify-center w-12 h-12 ${service.iconBg} rounded-lg mb-4 shadow group-hover:scale-110 transition`}
              >
                <span className={`text-xl ${service.color}`}>{service.icon}</span>
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1 tracking-tight group-hover:text-blue-600 transition">
                {service.title}
              </h4>
              <p className="text-gray-600 text-[15px]">{service.desc}</p>
              {/* Gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none transition ring-2 ring-transparent group-hover:ring-blue-200"></div>
            </div>
          ))}
        </div>
      </div>
      {/* Subtle wave/shape divider bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 60L60 54C120 48 240 36 360 27C480 18 600 12 720 16C840 20 960 34 1080 41C1200 48 1320 48 1380 48L1440 48V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V60Z"
            fill="#F3F7FF"
          />
        </svg>
      </div>
    </section>
  );
}