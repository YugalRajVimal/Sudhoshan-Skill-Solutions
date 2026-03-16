import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaUniversity, FaUserGraduate } from "react-icons/fa";

export default function PlacementPartners() {
  // Brand color palette
  const COLORS = {
    primary: "#0B3D91",
    accent: "#FF7A00",
    gradStart: "#115288",
    gradEnd: "#052d66",
    bg: "#F6F8FC",
    textDark: "#1F2937",
    textLight: "#6B7280",
    white: "#FFFFFF",
  };

  // All company cards will use a blue gradient background.
  const partners = [
    {
      name: "Future Sparks",
      logo: "/client/fs.png",
      alt: "Future Sparks Logo",
    },
    {
      name: "Kiza Textiles",
      logo: "/client/kiza.avif",
      alt: "Kiza Textiles Logo",
    },
    {
      name: "Takniki Shiksha Vidhaan Council",
      logo: "/client/takniki-shiksha.jpeg",
      alt: "Takniki Shiksha Vidhaan Council Logo",
    },
    {
      name: "Awign",
      logo: "/client/awign.svg",
      alt: "Awign Logo",
    },
    {
      name: "NIT Research Centre",
      logo: "/client/NIT.png",
      alt: "NIT Research Centre Logo",
    },
    {
      name: "Zomato",
      logo: "/client/zomato.avif",
      alt: "Zomato Logo",
    }
  ];

  return (
    <section style={{ background: COLORS.bg }} className="py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold font-serif mb-3" style={{ color: COLORS.textDark }}>
          We Place <span style={{ color: COLORS.accent }}>Candidates</span> In
        </h2>
        <p className="mb-16" style={{ color: COLORS.textLight }}>
          <span style={{ color: COLORS.accent, fontWeight: 500 }}>Our trusted</span> hiring and institutional partners
        </p>

        {/* Partner Logos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={
                "rounded-xl p-10 shadow-lg hover:scale-105 transition flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 via-blue-900 to-blue-900"
              }
            //   style={{
            //     border: `2.5px solid ${COLORS.accent}`,
            //     boxShadow:
            //       "0 8px 28px 0 rgba(34,92,230,0.13), 0 2px 4.5px 0 rgba(255,122,0,0.06)",
            //   }}
            >
              {partner.logo ? (
                <div className="py-1 flex items-center justify-center mb-4 ">
                  <img
                    src={partner.logo}
                    alt={partner.alt}
                    className="h-24 object-contain p-2 rounded-xl"
                    // style={{
                    //   borderRadius: 8,
                    //   border: `2.5px solid ${COLORS.accent}`,
                    // //   background: "#fff4eb",
                    // }}
                  />
                </div>
              ) : (
                <FaBuilding className="text-4xl mx-auto mb-4 opacity-90" style={{ color: COLORS.accent }} />
              )}

              {/* If you want to highlight names in orange, uncomment below: */}
              {/* <h3 className="text-xl font-semibold drop-shadow"
                  style={{
                    color: COLORS.accent,
                    textShadow: "0 2px 8px rgba(255,122,0,0.15), 0 1px 3px rgba(255,122,0,0.13)"
                  }}>
                {partner.name}
              </h3> */}
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 text-center mt-8">
          {[
            {
              value: "50+",
              label: "Candidates Placed",
              color: COLORS.accent,
              icon: (
                <span className="inline-block bg-orange-100 text-orange-500 rounded-full p-3 mb-2 shadow-sm">
                  <FaBriefcase className="w-6 h-6" />
                </span>
              ),
            },
            {
              value: "10+",
              label: "Partner Companies",
              color: COLORS.accent,
              icon: (
                <span className="inline-block bg-blue-100 text-blue-500 rounded-full p-3 mb-2 shadow-sm">
                  <FaBuilding className="w-6 h-6" />
                </span>
              ),
            },
            {
              value: "5+",
              label: "Colleges Connected",
              color: COLORS.accent,
              icon: (
                <span className="inline-block bg-green-100 text-green-600 rounded-full p-3 mb-2 shadow-sm">
                  <FaUniversity className="w-6 h-6" />
                </span>
              ),
            },
            {
              value: "100+",
              label: "Students Trained",
              color: COLORS.accent,
              icon: (
                <span className="inline-block bg-purple-100 text-purple-500 rounded-full p-3 mb-2 shadow-sm">
                  <FaUserGraduate className="w-6 h-6" />
                </span>
              ),
            },
            {
              value: "5+",
              label: "Cities Served",
              color: COLORS.accent,
              icon: (
                <span className="inline-block bg-yellow-100 text-yellow-600 rounded-full p-3 mb-2 shadow-sm">
                  <FaMapMarkerAlt className="w-6 h-6" />
                </span>
              ),
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="
                flex flex-col items-center rounded-xl bg-gradient-to-b from-white/60 to-blue-100/40 shadow hover:shadow-lg p-6 mx-auto
                transition-all duration-200 hover:-translate-y-1 border border-blue-100
                "
              style={{ maxWidth: 210 }}
            >
              {stat.icon}
              <p className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: stat.color }}>
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-medium" style={{ color: COLORS.textLight }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <p className="mt-12" style={{ color: "#FF7A00", fontWeight: 500 }}>
          ...and many more organizations collaborating with <span style={{ color: COLORS.primary, fontWeight: 700 }}>Sudhosan Skill Solutions</span>
        </p>
      </div>
    </section>
  );
}