export default function AboutHero() {
  return (
    <section
      className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white overflow-hidden py-24 px-6"
      style={{
        backgroundImage: 'linear-gradient(to bottom right, #1e3a8a, #2563eb, #3b82f6)', // fallback gradient
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Left-to-right fade image overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: 'url("/bg.png")',
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 90%)",
          maskImage: "linear-gradient(to right, transparent 50%, black 90%)",
        }}
      />

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
          Sudhosan Skill Solutions Pvt. Ltd.
        </h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-5xl mx-auto">
          Education, skill development, and career placement for Tier 2 &amp; 3 cities.<br />
          Bridging learning and jobs with industry-ready training and direct employer connections.<br />
          Making quality education and real careers accessible to every Indian — no matter where they live.
        </p>
      </div>
    </section>
  );
}