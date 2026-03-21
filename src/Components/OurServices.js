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
        "Career Readiness Coaching",
        "Digital Literacy Training",
      ],
      color: "border-orange-500",
      iconBg: "bg-orange-100",
    },
    {
      icon: <FaUserGraduate />,
      title: "For Students",
      items: [
        "Admission Guidance",
        "Education Planning",
        "Personalized Career Counselling",
        "Skill Development Courses",
        "Campus Placement Support",
        "Digital Learning Access",
        "Education & Skill Training",
      ],
      color: "border-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      icon: <FaBuilding />,
      title: "For Businesses",
      items: [
        "Staffing & Recruitment Support",
        "Corporate Training Programs",
        "Workforce & Manpower Development",
        "Data & Information Services",
        "Digital Platform Solutions",
        "CSR Training Programs",
      ],
      color: "border-orange-500",
      iconBg: "bg-indigo-100",
    },
    {
      icon: <FaHandshake />,
      title: "Partnerships",
      items: [
        "College & University Tie-Ups & Placement Support",
        "Industry Partnerships",
        "Franchise Opportunities",
        "Govt. Scheme Integration",
        "CSR & NGO Collaboration",
        "Referral & Commission Model",
      ],
      color: "border-blue-400",
      iconBg: "bg-orange-50",
    },
  ];



  return (
    <section className="relative py-24 ">
      {/* <div className="absolute top-0 left-0 w-full h-36 bg-gradient-to-r from-orange-100 via-blue-100 to-transparent opacity-70 pointer-events-none -z-10 rounded-b-3xl"></div> */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <p className="text-orange-500 font-bold tracking-wider uppercase text-sm">
          What We Offer
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold text-gray-800 mt-3 leading-snug drop-shadow">
            Our <span className="text-orange-500">Services</span> & <span className="text-orange-500">Solutions</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg md:text-xl">
          One Stop platform. Every opportunity. Your next step starts here.
          </p>
        </div>

        {/* Top Major Cards */}
        <div className="grid md:grid-cols-2  gap-10 mb-20">
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