const stats = [
  { number: "50+", label: "Partner Companies" },
  { number: "10+", label: "Colleges Connected" },
  { number: "5+", label: "Students Trained" },
  { number: "100+", label: "Cities Served" },
  { number: "5+", label: "Candidates Placed" }
];

export function OurImpact() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto text-center px-6">

        <h2 className="text-3xl font-serif font-bold mb-12">
          Our Impact
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Only display up to 4 impact stats for layout consistency */}
          {stats.slice(0, 4).map((stat, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-4xl font-bold text-orange-500">
                {stat.number}
              </h3>

              <p className="text-gray-600 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}