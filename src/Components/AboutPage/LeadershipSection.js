const leadershipTeam = [
  {
    name: "Subodh Kumar",
    role: "Founder & Director ",
    image: "/team/SubodhKumar.png",
    description: (
      <>
        An Assistant Professor and Research Scholar with over 4+ years of experience in the education sector.
        His expertise lies in academic leadership, research, and skill development initiatives.
      </>
    ),
  },
  {
    name: "Sudhir Kumar",
    role: "Co-Founder & Director ",
    image: "/team/SudhirKumar.png",
    description: (
      <>
        Holds a Master’s degree in Finance with specialization in Strategy and Operations,
        bringing strong expertise in financial planning, strategic management, and business operations.
      </>
    ),
  },
  {
    name: "Ajeet Prasad Kurmi",
    role: "Head – Human Resources",
    image: "/team/AjeetPrasadKurmi.png",
    description: (
      <>
        Manages recruitment, employee relations, and workforce management.
        Plays a key role in building a strong organizational culture and ensuring smooth HR operations.
      </>
    ),
    border: "blue",
  },
  {
    name: "Gaurav Kumar Sinha",
    role: "Head – Project Management",
    image: "/team/GauravKumarSinha.png",
    description: (
      <>
        Holding a Master’s degree in Finance with over 2+ years of experience, he oversees project planning,
        execution, and coordination to ensure successful and efficient project delivery.
      </>
    ),
    border: "blue",
  },
  {
    name: "Anubhav Singh",
    role: "Head – Outreach & Partnerships",
    image: "/team/AnubhavSingh.png",
    description: (
      <>
        With a Master’s degree in Finance and Marketing and over 2+ years of experience, he focuses on building
        strategic collaborations, expanding networks, developing partnerships, and strengthening organizational visibility.
      </>
    ),
    border: "blue",
  },
];

export function Leadership() {
  return (
    <section className="py-20 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-serif text-3xl font-bold mb-4">
          Meet Our Leadership
        </h2>
        <p className="text-gray-500 mb-12">
          The Minds Behind the Mission United by one vision — building India's most impactful career platform.
        </p>
        <div className="flex flex-wrap justify-center gap-10">
          {leadershipTeam.map((member, i) => {
            // Determine border color for card and image
            const isBlue = member.border === "blue";
            const cardBorderClass = isBlue ? "border-blue-500" : "border-orange-400";
            const imgBorderClass = isBlue ? "border-blue-600" : "border-orange-500";
            const roleTextClass = isBlue ? "text-blue-600" : "text-orange-500";
            return (
              <div
                key={i}
                className={`bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center mb-6 border-2 ${cardBorderClass}`}
                style={{ flex: "1 1 300px", maxWidth: "360px", minWidth: "260px" }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className={`w-28 h-28 rounded-full mx-auto mb-4 border-4 object-cover ${imgBorderClass}`}
                />
                <h3 className="font-semibold text-lg mb-1">
                  {member.name}
                </h3>
                <p className={`${roleTextClass} text-sm mb-3 font-medium`}>{member.role}</p>
                <div className="text-gray-600 text-sm">{member.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}