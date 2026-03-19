import { Link } from "react-router-dom";
import { COURSE_INDEX, COURSES_DETAILS, COURSE_NOTES } from "../data/CourcesData";

function kebabCase(str) {
  // Utility to make "Digital Literacy & Internet Essentials" -> "digital-literacy-internet-essentials"
  return str
    .toLowerCase()
    .replace(/[\s&/]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function Cources() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-10 py-10">
      <section className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-blue-900 tracking-tight font-serif">
          All Courses
        </h1>
        <p className="text-gray-600 mb-4 font-serif">
          Explore our range of job-ready vocational, computer, and workplace skills programs. All courses include live Zoom instruction, practical assignments, and certificates.
        </p>
        {COURSE_NOTES && COURSE_NOTES.length > 0 && (
          <ul className="bg-orange-50 border-l-4 border-orange-400 px-4 py-3 mb-2 rounded-lg list-disc list-inside text-orange-800 text-sm">
            {COURSE_NOTES.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-14">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow divide-y divide-blue-100">
            <thead>
              <tr className="bg-blue-50 text-blue-800 text-sm uppercase font-bold">
                <th className="px-3 py-2 text-left">#</th>
                <th className="px-3 py-2 text-left">Course Name</th>
                <th className="px-3 py-2 text-left">Category</th>
                <th className="px-3 py-2 text-left">Duration</th>
                <th className="px-3 py-2 text-left">Fee</th>
                <th className="px-3 py-2 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              {COURSE_INDEX.map((course, i) => (
                <tr key={course.no} className={i % 2 === 0 ? "bg-white" : "bg-blue-50/30"}>
                  <td className="px-3 py-2 font-mono text-center">{course.no}</td>
                  <td className="px-3 py-2 font-semibold text-blue-900">
                    {course.name}
                  </td>
                  <td className="px-3 py-2 text-blue-600">{course.category}</td>
                  <td className="px-3 py-2">{course.duration}</td>
                  <td className="px-3 py-2 font-medium text-orange-600">{course.fee}</td>
                  <td className="px-3 py-2">
                    <Link
                      to={`/courses/${getCourseSlugByName(course.name)}`}
                      className="text-orange-500 hover:underline font-medium text-sm"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-blue-900 tracking-tight font-serif">
          Featured Courses
        </h2>
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2">
          {COURSES_DETAILS.map((course) => (
            <div
              id={course.slug}
              key={course.id}
              className="rounded-xl shadow-lg bg-white p-6 md:p-10 border border-blue-100"
            >
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-3 gap-1">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-1 font-serif">
                  {course.title}
                </h3>
                <span className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest">
                  {course.category}
                </span>
              </div>
              <div className="mb-3 text-md text-gray-800 italic">
                {course.tagline}
              </div>
              <div className="flex flex-wrap gap-4 items-center text-sm mb-4">
                <span className="inline-flex items-center gap-x-1 px-3 py-1 bg-blue-50 text-blue-800 rounded-lg font-medium">
                  <strong>Duration:</strong> {course.duration}
                </span>
                <span className="inline-flex items-center gap-x-1 px-3 py-1 bg-blue-50 text-blue-800 rounded-lg font-medium">
                  <strong>Mode:</strong> {course.mode}
                </span>
                <span className="inline-flex items-center gap-x-1 px-3 py-1 bg-orange-50 text-orange-700 rounded-lg font-bold">
                  <strong>Fee:</strong> {course.fee}
                </span>
              </div>
              <p className="text-gray-700 mb-4 line-clamp-3">{course.about.substring(0, 120)}...</p>
              <div className="flex gap-4 mt-3">
                <Link
                  to={`/courses/${course.slug}`}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-lg transition-colors"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Helper to get slug by full course name from COURSES_DETAILS or fallback to kebab-case
function getCourseSlugByName(name) {
  const detailObj =
    COURSES_DETAILS.find((c) => c.title.toLowerCase() === name.toLowerCase()) ||
    COURSES_DETAILS.find((c) => c.title.toLowerCase().includes(name.toLowerCase().replace(/&/g, "and")));
  return detailObj ? detailObj.slug : kebabCase(name);
}
