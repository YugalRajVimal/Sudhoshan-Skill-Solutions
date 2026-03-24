import React from "react";

export function Leadership({ allData }) {
  // Show all team members (not just leadership)
  const teamMembers = Array.isArray(allData?.teamMembers) ? allData.teamMembers : [];

  // In case backend did not provide border color, default to orange for founders and blue for heads
  function getBorder(member) {
    if (member.border) return member.border;
    if (!member.role) return "orange";
    if (member.role.toLowerCase().includes("head")) return "blue";
    return "orange";
  }

  React.useEffect(() => {
    if (Array.isArray(allData?.teamMembers)) {
      console.log("All team members:", allData.teamMembers);
    }
  }, [allData?.teamMembers]);

  return (
    <section className="py-20 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-serif text-blue-900 text-3xl font-bold mb-4">
          Meet Our <span className="text-orange-500">Team</span>
        </h2>
        <p className="text-gray-500 mb-12">
          The Minds Behind the Mission United by one vision — building India's most impactful career platform.
        </p>
        <div className="flex flex-wrap justify-center gap-10">
          {teamMembers.length === 0 ? (
            <div className="text-gray-400 w-full py-10 text-lg font-medium">
              Team information coming soon.
            </div>
          ) : (
            teamMembers.map((member, i) => {
              const isBlue = getBorder(member) === "blue";
              const cardBorderClass = isBlue ? "border-blue-500" : "border-orange-400";
              const imgBorderClass = isBlue ? "border-blue-600" : "border-orange-500";
              const roleTextClass = isBlue ? "text-blue-600" : "text-orange-500";
              return (
                <div
                  key={member._id || i}
                  className={`bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center mb-6 border-2 ${cardBorderClass}`}
                  style={{ flex: "1 1 300px", maxWidth: "360px", minWidth: "260px" }}
                >
                  <img
                    src={
                      member.image
                        ? member.image.startsWith("Uploads")
                          ? `${process.env.REACT_APP_API_URL || ""}/${member.image.replace(/^Uploads[\\/]/, "Uploads/")}`
                          : member.image
                        : "/team/default-member.png"
                    }
                    alt={member.name}
                    className={`w-28 h-28 rounded-full mx-auto mb-4 border-4 object-cover ${imgBorderClass}`}
                  />
                  <h3 className="font-semibold text-lg mb-1">
                    {member.name}
                  </h3>
                  <p className={`${roleTextClass} text-sm mb-3 font-medium`}>{member.role}</p>
                  <div className="text-gray-600 text-sm">
                    {member.description
                      ? member.description
                      : <span className="italic text-gray-400">No description provided.</span>
                    }
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}