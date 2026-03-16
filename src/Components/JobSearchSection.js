import { FaSearch, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

export default function JobSearchSection() {
  return (
    <section className="relative py-24 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 text-white">

      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
          Find Your <span className="text-orange-400">Dream Job</span>
        </h2>

        <p className="text-lg text-blue-100 mb-12 max-w-2xl mx-auto">
          Discover opportunities through Sudhosan Skill Solutions — connecting
          talent with employers across India through training, career guidance,
          and placement support.
        </p>

        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 text-gray-800">

          <div className="grid md:grid-cols-4 gap-4">

            {/* Job title */}
            <div className="flex items-center border rounded-lg px-4 py-3">
              <FaSearch className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Job title or keyword"
                className="w-full outline-none"
              />
            </div>

            {/* Location */}
            <div className="flex items-center border rounded-lg px-4 py-3">
              <FaMapMarkerAlt className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Location"
                className="w-full outline-none"
              />
            </div>

            {/* Category */}
            <div className="flex items-center border rounded-lg px-4 py-3">
              <FaBriefcase className="text-gray-400 mr-3" />
              <select className="w-full outline-none bg-transparent">
                <option>Select Category</option>
                <option>IT & Software</option>
                <option>Marketing</option>
                <option>Finance</option>
                <option>Customer Support</option>
              </select>
            </div>

            {/* Search Button */}
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg px-6 py-3 flex items-center justify-center gap-2 transition">
              <FaSearch />
              Search Jobs
            </button>

          </div>

        </div>

        {/* Popular Searches */}
        <div className="mt-8 text-blue-100">

          <span className="mr-2">Popular Searches:</span>

          <span className="bg-white/20 px-3 py-1 rounded-full text-sm mr-2">
            Digital Marketing
          </span>

          <span className="bg-white/20 px-3 py-1 rounded-full text-sm mr-2">
            Web Development
          </span>

          <span className="bg-white/20 px-3 py-1 rounded-full text-sm mr-2">
            Remote Jobs
          </span>

          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            Data Entry
          </span>

        </div>

      </div>

    </section>
  );
}