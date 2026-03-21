import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaBriefcase, FaRupeeSign, FaFilter } from "react-icons/fa";

// Filter group definitions
const LOCATIONS = ["Patna", "Delhi", "Remote"];
const SALARY_RANGES = ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10+ LPA"];
const ROLES = ["IT", "HR", "Sales", "Marketing"];

export default function JobsPage({ allData }) {
  const jobs = allData?.jobs ?? [];

  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  // Toggle for mobile filters
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    // Reset the filtered jobs whenever the jobs prop changes
    setFilteredJobs(jobs);
  }, [jobs]);

  const handleApplyFilters = () => {
    let result = jobs;

    if (selectedLocations.length > 0) {
      result = result.filter(job =>
        selectedLocations.some(loc =>
          (job.location || "").toLowerCase().includes(loc.toLowerCase())
        )
      );
    }

    if (selectedSalaryRanges.length > 0) {
      result = result.filter(job =>
        selectedSalaryRanges.some(range =>
          (job.salaryRange ? job.salaryRange : job.salary ?? "").includes(range)
        )
      );
    }

    if (selectedRoles.length > 0) {
      result = result.filter(job =>
        selectedRoles.includes(job.role)
      );
    }

    setFilteredJobs(result);
    setShowMobileFilters(false); // Close mobile filters after applying
  };

  return (
    <section className="bg-gray-50 min-h-screen py-8 px-2 sm:py-14 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 font-serif">
            Latest Job Openings
          </h1>
          <p className="text-gray-600 mt-3 text-sm sm:text-base">
            Discover career opportunities through Sudhosan Skill Solutions
          </p>
        </div>

        {/* Small screens: Filters on top collapsible */}
        <div className="sm:hidden mb-6">
          <button
            className="w-full bg-white border border-blue-200 py-2 rounded-md flex items-center justify-center gap-2 font-semibold text-blue-900 shadow"
            onClick={() => setShowMobileFilters(prev => !prev)}
            type="button"
          >
            <FaFilter size={16} className="text-orange-500" />
            {showMobileFilters ? "Hide Filters" : "Show Filters"}
          </button>
          {showMobileFilters && (
            <div className="mt-4">
              <Filters
                selectedLocations={selectedLocations}
                setSelectedLocations={setSelectedLocations}
                selectedSalaryRanges={selectedSalaryRanges}
                setSelectedSalaryRanges={setSelectedSalaryRanges}
                selectedRoles={selectedRoles}
                setSelectedRoles={setSelectedRoles}
                onApply={handleApplyFilters}
                isMobile={true}
                onClose={() => setShowMobileFilters(false)}
              />
            </div>
          )}
        </div>
        {/* Large screens: Filters in grid sidebar */}
        <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-8">
          <div className="hidden sm:block">
            <Filters
              selectedLocations={selectedLocations}
              setSelectedLocations={setSelectedLocations}
              selectedSalaryRanges={selectedSalaryRanges}
              setSelectedSalaryRanges={setSelectedSalaryRanges}
              selectedRoles={selectedRoles}
              setSelectedRoles={setSelectedRoles}
              onApply={handleApplyFilters}
            />
          </div>
          <JobListings jobs={filteredJobs} />
        </div>
      </div>
    </section>
  );
}

function Filters({
  selectedLocations,
  setSelectedLocations,
  selectedSalaryRanges,
  setSelectedSalaryRanges,
  selectedRoles,
  setSelectedRoles,
  onApply,
  isMobile = false,
  onClose,
}) {
  // Helper to toggle checkbox selections
  const handleCheckboxChange = (setter, selected, value) => {
    if (selected.includes(value)) {
      setter(selected.filter(v => v !== value));
    } else {
      setter([...selected, value]);
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md p-4 sm:p-6 h-fit ${
        isMobile ? "w-full max-w-md mx-auto" : ""
      }`}
    >
      <div className="flex items-center gap-2 mb-6">
        <FaFilter size={18} className="text-orange-500" />
        <h3 className="font-semibold text-lg font-serif">Filters</h3>
        {isMobile && (
          <button
            onClick={onClose}
            type="button"
            className="ml-auto text-blue-900 text-base font-bold px-2"
            aria-label="Close Filters"
          >
            ✕
          </button>
        )}
      </div>

      {/* Location */}
      <div className="mb-6">
        <h4 className="font-medium mb-2 font-serif text-sm sm:text-base">Location</h4>
        <div className="space-y-2 text-xs sm:text-sm">
          {LOCATIONS.map(loc => (
            <label key={loc} className="flex gap-2 cursor-pointer items-center">
              <input
                type="checkbox"
                checked={selectedLocations.includes(loc)}
                onChange={() => handleCheckboxChange(setSelectedLocations, selectedLocations, loc)}
                className="accent-blue-900"
              />{" "}
              <span>{loc}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Salary */}
      <div className="mb-6">
        <h4 className="font-medium mb-2 font-serif text-sm sm:text-base">Salary Range</h4>
        <div className="space-y-2 text-xs sm:text-sm">
          {SALARY_RANGES.map(range => (
            <label key={range} className="flex gap-2 cursor-pointer items-center">
              <input
                type="checkbox"
                checked={selectedSalaryRanges.includes(range)}
                onChange={() => handleCheckboxChange(setSelectedSalaryRanges, selectedSalaryRanges, range)}
                className="accent-blue-900"
              />{" "}
              <span>{range}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Role */}
      <div className="mb-6">
        <h4 className="font-medium mb-2 font-serif text-sm sm:text-base">Job Role</h4>
        <div className="space-y-2 text-xs sm:text-sm">
          {ROLES.map(role => (
            <label key={role} className="flex gap-2 cursor-pointer items-center">
              <input
                type="checkbox"
                checked={selectedRoles.includes(role)}
                onChange={() => handleCheckboxChange(setSelectedRoles, selectedRoles, role)}
                className="accent-blue-900"
              />{" "}
              <span>{role}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 text-sm sm:text-base"
        onClick={onApply}
        type="button"
      >
        Apply Filters
      </button>
    </div>
  );
}

function JobListings({ jobs }) {
  return (
    <div className="col-span-1 md:col-span-3 space-y-5 sm:space-y-6 w-full">
      {jobs.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No jobs found.</div>
      ) : (
        // Responsive card: stack elements vertically on mobile
        jobs.map((job, i) => (
          <div
            key={i}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border-l-4 border-blue-900 hover:shadow-md transition"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h3 className="text-base xs:text-lg font-semibold text-blue-900 font-serif">
                  {job.title}
                </h3>
                <p className="text-gray-600 text-xs xs:text-sm mb-2">
                  {job.company}
                </p>
                <div className="flex flex-col xs:flex-row xs:gap-5 gap-2 text-xs xs:text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt size={13} /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaRupeeSign size={13} /> {job.salary}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaBriefcase size={13} /> {job.type}
                  </span>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="mt-2 md:mt-0 bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2 rounded-md text-sm sm:text-base w-full xs:w-auto">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}