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

// Animated Counter hook: Do NOT auto start, you must trigger with `shouldStart`
function useCountUp(to, duration = 1800, { start = 0, shouldStart = false } = {}) {
  const [count, setCount] = useState(start || 0);
  const rafRef = useRef();
  useEffect(() => {
    if (!shouldStart) return;
    let end = typeof to === "number" ? to : parseInt(to, 10);
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(start + (end - start) * progress);
      setCount(value);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line
  }, [to, duration, shouldStart]);
  return count;
}

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

  // Updated stats per prompt. Corresponds to spec order!
  const stats = [
    {
      valueNum: 100, valueSuffix: "+",
      label: "Candidates Placed",
      color: COLORS.accent,
      icon: (
        <span className="inline-block bg-orange-100 text-orange-500 rounded-full p-3 mb-2 shadow-sm">
          <FaBriefcase className="w-6 h-6" />
        </span>
      ),
      duration: 1500
    },
    {
      valueNum: 10, valueSuffix: "+",
      label: "Partner Companies",
      color: COLORS.accent,
      icon: (
        <span className="inline-block bg-blue-100 text-blue-500 rounded-full p-3 mb-2 shadow-sm">
          <FaBuilding className="w-6 h-6" />
        </span>
      ),
      duration: 1200
    },
    {
      valueNum: 5, valueSuffix: "+",
      label: "Colleges Connected",
      color: COLORS.accent,
      icon: (
        <span className="inline-block bg-green-100 text-green-600 rounded-full p-3 mb-2 shadow-sm">
          <FaUniversity className="w-6 h-6" />
        </span>
      ),
      duration: 1200
    },
    {
      valueNum: 100, valueSuffix: "+",
      label: "Students Trained",
      color: COLORS.accent,
      icon: (
        <span className="inline-block bg-purple-100 text-purple-500 rounded-full p-3 mb-2 shadow-sm">
          <FaUserGraduate className="w-6 h-6" />
        </span>
      ),
      duration: 1750
    },
    {
      valueNum: 5, valueSuffix: "+",
      label: "Cities Served",
      color: COLORS.accent,
      icon: (
        <span className="inline-block bg-yellow-100 text-yellow-600 rounded-full p-3 mb-2 shadow-sm">
          <FaMapMarkerAlt className="w-6 h-6" />
        </span>
      ),
      duration: 1100
    },
    {
      valueNum: 100, valueSuffix: "%",
      label: "Placement Support",
      color: COLORS.accent,
      icon: (
        <span className="inline-block bg-emerald-100 text-emerald-500 rounded-full p-3 mb-2 shadow-sm">
          <MdVerified className="w-6 h-6" />
        </span>
      ),
      duration: 1250,
    },
    {
      valueNum: 10, valueSuffix: "+",
      label: "Job-Ready Courses",
      color: COLORS.accent,
      icon: (
        <span className="inline-block bg-pink-100 text-pink-500 rounded-full p-3 mb-2 shadow-sm">
          <BsBookmarksFill className="w-6 h-6" />
        </span>
      ),
      duration: 1050,
    },
  ];

  // Ref to the section element
  const sectionRef = useRef(null);
  // Detect if our section is visible on (any) user's screen
  const isVisible = useOnScreen(sectionRef, "-100px");

  // For animated stats, only start the count when the section is visible
  // We cannot use Hooks in a map. Use a static series of hook-calls:
  const animatedCount0 = useCountUp(stats[0].valueNum, stats[0].duration, { start: 0, shouldStart: isVisible });
  const animatedCount1 = useCountUp(stats[1].valueNum, stats[1].duration, { start: 0, shouldStart: isVisible });
  const animatedCount2 = useCountUp(stats[2].valueNum, stats[2].duration, { start: 0, shouldStart: isVisible });
  const animatedCount3 = useCountUp(stats[3].valueNum, stats[3].duration, { start: 0, shouldStart: isVisible });
  const animatedCount4 = useCountUp(stats[4].valueNum, stats[4].duration, { start: 0, shouldStart: isVisible });
  const animatedCount5 = useCountUp(stats[5].valueNum, stats[5].duration, { start: 0, shouldStart: isVisible });
  const animatedCount6 = useCountUp(stats[6].valueNum, stats[6].duration, { start: 0, shouldStart: isVisible });
  const animatedCounts = [
    animatedCount0,
    animatedCount1,
    animatedCount2,
    animatedCount3,
    animatedCount4,
    animatedCount5,
    animatedCount6,
  ];

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

  // Add a helper function to check for the Awign partner based on logo path and name
  const isAwign = (partner) =>
    (partner.logo === "/client/awign.svg" || partner.logo === "/client/awign.png") &&
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
        <h2 className="text-4xl font-bold font-serif mb-3" style={{ color: COLORS.textDark }}>
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
              <div key={index} className="flex flex-col items-center px-10" style={{ minWidth: 180 }}>
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.alt}
                    className={
                      "h-24 object-contain p-2 rounded-xl shadow" +
                      (isAwign(partner) ? " bg-gray-800" : " bg-white")
                    }
                    style={{
                      maxWidth: 170,
                      backgroundColor: isAwign(partner) ? "#1A2534" : undefined,
                    }}
                  />
                ) : (
                  <FaBuilding className="text-4xl mx-auto mb-4 opacity-90" style={{ color: COLORS.accent }} />
                )}
                <span className="text-xs mt-2 text-gray-500 font-medium">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12" style={{ color: "#FF7A00", fontWeight: 500 }}>
          ...and many more organizations collaborating with <span style={{ color: COLORS.primary, fontWeight: 700 }}>Sudhosan Skill Solutions</span>
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
                key={stat.label + i}
                className="
                  flex flex-col items-center rounded-2xl  p-5 mx-auto bg-white/95
                  border border-orange-100 transition-transform
                "
                style={{
                  minWidth: 175,
                  maxWidth: 200,
                  margin: "0 1rem",
                  // boxShadow: "0 6px 30px 0 rgba(11,61,145,0.09)",
                  background: `linear-gradient(140deg, #fff 80%, ${COLORS.gradEnd} 200%)`,
                }}
              >
                {stat.icon}
                <p className="text-xl font-semibold mb-1" style={{ color: stat.color }}>
                  {/* animatedCount[i%7] is always defined */}
                  {animatedCounts[i % 7]}
                  {stat.valueSuffix}
                </p>
                <p className="text-xs font-medium" style={{ color: COLORS.textLight }}>{stat.label}</p>
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
                <div className="mb-2">{stat.icon}</div>
                <p className="text-2xl sm:text-3xl font-extrabold mb-1 transition-colors" style={{ color: stat.color }}>
                  {animatedCounts[i]}{stat.valueSuffix}
                </p>
                <p className="text-sm font-medium" style={{ color: COLORS.textLight }}>{stat.label}</p>
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
                  <div className="mb-2">{stat.icon}</div>
                  <p className="text-2xl sm:text-3xl font-extrabold mb-1 transition-colors" style={{ color: stat.color }}>
                    {animatedCounts[i + 4]}{stat.valueSuffix}
                  </p>
                  <p className="text-sm font-medium" style={{ color: COLORS.textLight }}>{stat.label}</p>
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