import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

export default function JobSearchSection() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  // Ensure scroll to top on search
  const scrollToTopAndNavigate = (url) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(url);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to /jobs with search params for JobPage
    const params = new URLSearchParams();
    if (title) params.append("title", title);
    if (location) params.append("location", location);
    if (category && category !== "Select Category") params.append("category", category);
    scrollToTopAndNavigate(`/jobs?${params.toString()}`);
  };

  // Populer Searches mapped data
  const popularSearches = [
    { label: "Digital Marketing", title: "Digital Marketing" },
    { label: "Web Development", title: "Web Development" },
    { label: "Remote Jobs", title: "Remote" },
    { label: "Data Entry", title: "Data Entry" },
  ];

  const handlePopularSearchClick = (titleVal) => {
    const params = new URLSearchParams();
    params.append("title", titleVal);
    scrollToTopAndNavigate(`/jobs?${params.toString()}`);
  };

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
        <form
          className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 text-gray-800"
          onSubmit={handleSearch}
        >
          <div className="grid md:grid-cols-4 gap-4">
            {/* Job title */}
            <div className="flex items-center border rounded-lg px-4 py-3">
              <FaSearch className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Job title or keyword"
                className="w-full outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                autoComplete="off"
              />
            </div>

            {/* Location */}
            <div className="flex items-center border rounded-lg px-4 py-3">
              <FaMapMarkerAlt className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Location"
                className="w-full outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                name="location"
                autoComplete="off"
              />
            </div>

            {/* Category */}
            <div className="flex items-center border rounded-lg px-4 py-3">
              <FaBriefcase className="text-gray-400 mr-3" />
              <select
                className="w-full outline-none bg-transparent"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                name="category"
              >
                <option>Select Category</option>
                <option>IT & Software</option>
                <option>Marketing</option>
                <option>Finance</option>
                <option>Customer Support</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg px-6 py-3 flex items-center justify-center gap-2 transition"
            >
              <FaSearch />
              Search Jobs
            </button>
          </div>
        </form>

        {/* Popular Searches (now links that scroll to top & navigate) */}
        <div className="mt-8 text-blue-100">
          <span className="mr-2">Popular Searches:</span>
          {popularSearches.map((item, idx) => (
            <button
              key={item.label}
              type="button"
              className={`bg-white/20 px-3 py-1 rounded-full text-sm mr-2 hover:bg-orange-400 hover:text-white transition`}
              style={{ outline: "none", border: "none", cursor: "pointer" }}
              onClick={() => handlePopularSearchClick(item.title)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}