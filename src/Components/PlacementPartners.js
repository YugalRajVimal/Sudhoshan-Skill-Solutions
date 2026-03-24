import { useEffect, useRef, useState } from "react";
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaUniversity,
  FaUserGraduate,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { BsBookmarksFill } from "react-icons/bs";

// Utility to detect if element has entered the viewport
function useOnScreen(ref, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return isIntersecting;
}

// Icon mapping helper
const iconMap = {
  briefcase: (
    <span className="inline-block bg-orange-100 text-orange-500 rounded-full p-3 mb-2 shadow-sm">
      <FaBriefcase className="w-6 h-6" />
    </span>
  ),
  building: (
    <span className="inline-block bg-blue-100 text-blue-500 rounded-full p-3 mb-2 shadow-sm">
      <FaBuilding className="w-6 h-6" />
    </span>
  ),
  university: (
    <span className="inline-block bg-green-100 text-green-600 rounded-full p-3 mb-2 shadow-sm">
      <FaUniversity className="w-6 h-6" />
    </span>
  ),
  "user-graduate": (
    <span className="inline-block bg-purple-100 text-purple-500 rounded-full p-3 mb-2 shadow-sm">
      <FaUserGraduate className="w-6 h-6" />
    </span>
  ),
  "map-marker": (
    <span className="inline-block bg-yellow-100 text-yellow-600 rounded-full p-3 mb-2 shadow-sm">
      <FaMapMarkerAlt className="w-6 h-6" />
    </span>
  ),
  verified: (
    <span className="inline-block bg-emerald-100 text-emerald-500 rounded-full p-3 mb-2 shadow-sm">
      <MdVerified className="w-6 h-6" />
    </span>
  ),
  bookmarks: (
    <span className="inline-block bg-pink-100 text-pink-500 rounded-full p-3 mb-2 shadow-sm">
      <BsBookmarksFill className="w-6 h-6" />
    </span>
  ),
};

// Helper to animate numbers
function useCountUp(trigger, toValue, duration = 1500, startValue = 0) {
  const [value, setValue] = useState(startValue);

  useEffect(() => {
    if (!trigger) return;
    setValue(startValue);

    // Only animate when trigger becomes true
    let frameId;
    let startTimestamp;
    const increment = toValue - startValue;
    // Avoid animating non-numerics
    if (typeof toValue !== "number") {
      setValue(toValue);
      return;
    }
    function animate(ts) {
      if (!startTimestamp) startTimestamp = ts;
      const elapsed = ts - startTimestamp;
      if (elapsed < duration) {
        const progress = Math.min(elapsed / duration, 1);
        setValue(Math.floor(startValue + increment * progress));
        frameId = requestAnimationFrame(animate);
      } else {
        setValue(toValue);
      }
    }
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
    // eslint-disable-next-line
  }, [trigger, toValue, duration, startValue]);

  return value;
}

function AnimatedStat({ stat, isOnScreen }) {
  // The stat.valueNum may already be number, else fallback to parse
  let value = stat.valueNum;
  let suffix = stat.valueSuffix || "";
  let duration = stat.duration || 1500;
  // Try to parse number if necessary (might be a string with '+')
  if (typeof value !== "number" && typeof value === "string") {
    // Extract leading number part (e.g., '2,000+' maps to 2000 and '+' as suffix)
    const match = value.match(/([\d,]+)/);
    if (match) {
      value = Number(match[1].replace(/,/g, ""));
      // Append '+' if found. If not, keep original suffix.
      if (/\+/.test(stat.valueNum)) suffix = "+" + (suffix || "");
    }
  }
  const animated = useCountUp(isOnScreen, typeof value === "number" ? value : 0, duration);

  // Format value with commas
  function formatNumber(val) {
    return val.toLocaleString();
  }
  // If it's not a number, fallback
  if (typeof value !== "number" || isNaN(value)) {
    return (
      <>
        {stat.icon}
        <p className="text-xl font-semibold mb-1" style={{ color: stat.color }}>
          {stat.valueNum}
          {suffix}
        </p>
        <p className="text-xs font-medium" style={{ color: "#6B7280" }}>
          {stat.label}
        </p>
      </>
    );
  }
  return (
    <>
      {stat.icon}
      <p className="text-xl font-semibold mb-1" style={{ color: stat.color }}>
        {formatNumber(animated)}
        {suffix}
      </p>
      <p className="text-xs font-medium" style={{ color: "#6B7280" }}>
        {stat.label}
      </p>
    </>
  );
}

function AnimatedStatLarge({ stat, isOnScreen }) {
  // Same logic as AnimatedStat, but for larger font
  let value = stat.valueNum;
  let suffix = stat.valueSuffix || "";
  let duration = stat.duration || 1500;
  if (typeof value !== "number" && typeof value === "string") {
    const match = value.match(/([\d,]+)/);
    if (match) {
      value = Number(match[1].replace(/,/g, ""));
      if (/\+/.test(stat.valueNum)) suffix = "+" + (suffix || "");
    }
  }
  const animated = useCountUp(isOnScreen, typeof value === "number" ? value : 0, duration);

  function formatNumber(val) {
    return val.toLocaleString();
  }
  if (typeof value !== "number" || isNaN(value)) {
    return (
      <>
        <div className="mb-2">{stat.icon}</div>
        <p className="text-2xl sm:text-3xl font-extrabold mb-1 transition-colors" style={{ color: stat.color }}>
          {stat.valueNum}
          {suffix}
        </p>
        <p className="text-sm font-medium" style={{ color: "#6B7280" }}>{stat.label}</p>
      </>
    );
  }
  return (
    <>
      <div className="mb-2">{stat.icon}</div>
      <p className="text-2xl sm:text-3xl font-extrabold mb-1 transition-colors" style={{ color: stat.color }}>
        {formatNumber(animated)}
        {suffix}
      </p>
      <p className="text-sm font-medium" style={{ color: "#6B7280" }}>{stat.label}</p>
    </>
  );
}

export default function PlacementPartners({ allData }) {
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

  useEffect(() => {
    console.log("allData.stats:", allData?.stats);
    console.log("allData.clients:", allData?.clients);
  }, [allData]);

  // Stats and partners from allData
  const stats = Array.isArray(allData?.stats)
    ? allData.stats.map(stat => ({
        ...stat,
        duration:
          stat.duration ??
          (stat.label === "Candidates Placed"
            ? 1500
            : stat.label === "Partner Companies"
            ? 1200
            : stat.label === "Colleges Connected"
            ? 1200
            : stat.label === "Students Trained"
            ? 1750
            : stat.label === "Cities Served"
            ? 1100
            : stat.label === "Placement Support"
            ? 1250
            : stat.label === "Job-Ready Courses"
            ? 1050
            : 1300),
        icon: iconMap[stat.icon] || (
          <span className="inline-block bg-gray-200 text-gray-400 rounded-full p-3 mb-2 shadow-sm">
            <FaBriefcase className="w-6 h-6" />
          </span>
        ),
      }))
    : [];

  const partners = Array.isArray(allData?.clients) ? allData.clients : [];

  // Ref to the section element
  const sectionRef = useRef(null);
  // Detect if our section is visible on (any) user's screen
  const isOnScreen = useOnScreen(sectionRef, "-100px");

  // Marquee animation for logos and stats (horizontal, repeat for seamless movement)
  const marqueeAnim = `
    @keyframes marquee-slide {
      0% {transform: translateX(0);}
      100% {transform: translateX(-50%);}
    }
    @keyframes marquee-slide-stats {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `;

  // Helper for special rendering (Awign bg for its logo, optional)
  const isAwign = partner =>
    partner?.logo &&
    (partner.logo === "/client/awign.svg" || partner.logo === "/client/awign.png") &&
    partner.name &&
    partner.name.toLowerCase().includes("awign");

  // Responsive check for mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      style={{ background: COLORS.bg }}
      className="py-24"
      ref={sectionRef}
    >
      <style>{marqueeAnim}</style>
      <div className=" text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold font-serif mb-3 text-blue-900 ">
          We Place <span style={{ color: COLORS.accent }}>Candidates</span> In
        </h2>
        <p className="mb-16" style={{ color: COLORS.textLight }}>
          <span style={{ color: COLORS.accent, fontWeight: 500 }}>Our trusted</span> hiring and institutional partners
        </p>

        {/* Partner Logos One-Line Infinite Marquee */}
        <div
          className="relative w-full overflow-x-hidden mb-16"
          style={{ height: "8rem" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              width: "max-content",
              minWidth: "100%",
              animation: "marquee-slide 18s linear infinite",
            }}
            className="gap-12"
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex flex-col items-center px-10"
                style={{ minWidth: 180 }}
              >
                {partner.logo ? (
                  <img
                    src={
                      partner.logo && partner.logo.startsWith("Uploads")
                        ? `${process.env.REACT_APP_API_URL || ''}/${partner.logo}`
                        : partner.logo
                    }
                    alt={partner.alt || partner.name || ""}
                    className={
                      "h-24 object-contain p-2 rounded-xl shadow" +
                      (isAwign(partner) ? " bg-gray-800" : " bg-white")
                    }
                    style={{
                      maxWidth: 170,
                      backgroundColor: isAwign(partner)
                        ? "#1A2534"
                        : undefined,
                    }}
                  />
                ) : (
                  <FaBuilding
                    className="text-4xl mx-auto mb-4 opacity-90"
                    style={{ color: COLORS.accent }}
                  />
                )}
                <span className="text-xs mt-2 text-gray-500 font-medium">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12" style={{ color: "#FF7A00", fontWeight: 500 }}>
          ...and many more organizations collaborating with{" "}
          <span
            style={{ color: COLORS.primary, fontWeight: 700 }}
          >
            Sudhosan Skill Solutions
          </span>
        </p>

        {/* Statistics (Grid for desktop/tablet, Marquee for small screen) */}
        {/* Mobile Marquee Animation */}
        <div className="block  w-full overflow-x-hidden mt-6">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "max-content",
              minWidth: "100%",
              animation: "marquee-slide-stats 30s linear infinite",
            }}
            className="gap-8"
          >
            {[...stats, ...stats].map((stat, i) => (
              <div
                key={(stat.label || "") + i}
                className="
                  flex flex-col items-center rounded-2xl  p-5 mx-auto bg-white/95
                  border border-orange-100 transition-transform
                "
                style={{
                  minWidth: 175,
                  maxWidth: 200,
                  margin: "0 1rem",
                  background: `linear-gradient(140deg, #fff 80%, ${COLORS.gradEnd} 200%)`,
                }}
              >
                <AnimatedStat stat={stat} isOnScreen={isOnScreen} />
              </div>
            ))}
          </div>
        </div>
        {/* Desktop/Tablet Grid */}
        {/* Flex layout with 4 cards on top, remaining at the bottom */}
        <div className="hidden  flex-col gap-6 text-center mt-8">
          <div className="flex justify-center gap-6">
            {stats.slice(0, 4).map((stat, i) => (
              <div
                key={stat.label}
                className="
                  group relative flex flex-col items-center justify-evenly overflow-hidden rounded-2xl shadow-lg bg-white/95
                  border border-blue-100 p-4 mx-auto transition-all duration-200 hover:-translate-y-1
                  hover:shadow-xl
                "
                style={{
                  minWidth: 180,
                  maxWidth: 180,
                  height: 180,
                  minHeight: 180,
                  maxHeight: 180,
                  boxShadow: "0 6px 30px 0 rgba(11,61,145,0.09)",
                  background: `linear-gradient(140deg, #fff 85%, ${COLORS.gradEnd} 120%)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <AnimatedStatLarge stat={stat} isOnScreen={isOnScreen} />
                {/* slight glow and accent hover effect */}
                <span
                  className="absolute left-0 right-0 -bottom-1 h-2 pointer-events-none transition-opacity opacity-0 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(closest-side, #FF7A0055 60%, #fff0 100%)",
                    filter: "blur(4px)",
                  }}
                ></span>
              </div>
            ))}
          </div>
          {stats.length > 4 && (
            <div className="flex justify-evenly gap-6 mt-6">
              {stats.slice(4).map((stat, i) => (
                <div
                  key={stat.label}
                  className="
                    group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl shadow-lg bg-white/95
                    border border-blue-100 p-4  transition-all duration-200 hover:-translate-y-1
                    hover:shadow-xl
                  "
                  style={{
                    minWidth: 180,
                    maxWidth: 180,
                    height: 180,
                    minHeight: 180,
                    maxHeight: 180,
                    boxShadow: "0 6px 30px 0 rgba(11,61,145,0.09)",
                    background: `linear-gradient(140deg, #fff 85%, ${COLORS.gradEnd} 120%)`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <AnimatedStatLarge stat={stat} isOnScreen={isOnScreen} />
                  {/* slight glow and accent hover effect */}
                  <span
                    className="absolute left-0 right-0 -bottom-1 h-2 pointer-events-none transition-opacity opacity-0 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(closest-side, #FF7A0055 60%, #fff0 100%)",
                      filter: "blur(4px)",
                    }}
                  ></span>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Bottom text */}
      </div>
    </section>
  );
}