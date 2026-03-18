import { useState } from "react";
import { FaMapMarkerAlt, FaBriefcase, FaRupeeSign, FaFilter } from "react-icons/fa";

const jobs = [
  {
    title: "Senior Software Developer",
    company: "TCS",
    location: "Kanpur (Hybrid)",
    salary: "₹12 - 18 LPA",
    salaryRange: "10+ LPA",
    type: "Full Time",
    role: "IT",
  },
  {
    title: "Branch Manager",
    company: "HDFC Bank",
    location: "Lucknow",
    salary: "₹8 - 12 LPA",
    salaryRange: "6-10 LPA",
    type: "Full Time",
    role: "Sales",
  },
  {
    title: "Digital Marketing Executive",
    company: "Vinivine Creations",
    location: "Kanpur",
    salary: "₹3 - 5 LPA",
    salaryRange: "3-6 LPA",
    type: "Full Time",
    role: "Marketing",
  },
  {
    title: "HR Generalist",
    company: "Reliance Retail",
    location: "Delhi NCR",
    salary: "₹5 - 8 LPA",
    salaryRange: "3-6 LPA",
    type: "Full Time",
    role: "HR",
  },
];

// Filter group definitions
const LOCATIONS = ["Patna", "Delhi", "Remote"];
const SALARY_RANGES = ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10+ LPA"];
const ROLES = ["IT", "HR", "Sales", "Marketing"];

export default function JobsPage() {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleApplyFilters = () => {
    let result = jobs;

    if (selectedLocations.length > 0) {
      result = result.filter(job =>
        selectedLocations.some(loc =>
          job.location.toLowerCase().includes(loc.toLowerCase())
        )
      );
    }

    if (selectedSalaryRanges.length > 0) {
      result = result.filter(job =>
        selectedSalaryRanges.some(range =>
          (job.salaryRange ? job.salaryRange : job.salary).includes(range)
        )
      );
    }

    if (selectedRoles.length > 0) {
      result = result.filter(job =>
        selectedRoles.includes(job.role)
      );
    }

    setFilteredJobs(result);
  };

  return (
    <section className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-blue-900 font-serif">
            Latest Job Openings
          </h1>
          <p className="text-gray-600 mt-3">
            Discover career opportunities through Sudhosan Skill Solutions
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <Filters
            selectedLocations={selectedLocations}
            setSelectedLocations={setSelectedLocations}
            selectedSalaryRanges={selectedSalaryRanges}
            setSelectedSalaryRanges={setSelectedSalaryRanges}
            selectedRoles={selectedRoles}
            setSelectedRoles={setSelectedRoles}
            onApply={handleApplyFilters}
          />

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
    <div className="bg-white rounded-xl shadow-md p-6 h-fit">
      <div className="flex items-center gap-2 mb-6">
        <FaFilter size={18} className="text-orange-500" />
        <h3 className="font-semibold text-lg font-serif">Filters</h3>
      </div>

      {/* Location */}
      <div className="mb-6">
        <h4 className="font-medium mb-2 font-serif">Location</h4>
        <div className="space-y-2 text-sm">
          {LOCATIONS.map(loc => (
            <label key={loc} className="flex gap-2">
              <input
                type="checkbox"
                checked={selectedLocations.includes(loc)}
                onChange={() => handleCheckboxChange(setSelectedLocations, selectedLocations, loc)}
              />{" "}
              {loc}
            </label>
          ))}
        </div>
      </div>

      {/* Salary */}
      <div className="mb-6">
        <h4 className="font-medium mb-2 font-serif">Salary Range</h4>
        <div className="space-y-2 text-sm">
          {SALARY_RANGES.map(range => (
            <label key={range} className="flex gap-2">
              <input
                type="checkbox"
                checked={selectedSalaryRanges.includes(range)}
                onChange={() => handleCheckboxChange(setSelectedSalaryRanges, selectedSalaryRanges, range)}
              />{" "}
              {range}
            </label>
          ))}
        </div>
      </div>

      {/* Role */}
      <div className="mb-6">
        <h4 className="font-medium mb-2 font-serif">Job Role</h4>
        <div className="space-y-2 text-sm">
          {ROLES.map(role => (
            <label key={role} className="flex gap-2">
              <input
                type="checkbox"
                checked={selectedRoles.includes(role)}
                onChange={() => handleCheckboxChange(setSelectedRoles, selectedRoles, role)}
              />{" "}
              {role}
            </label>
          ))}
        </div>
      </div>

      <button
        className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800"
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
    <div className="md:col-span-3 space-y-6">
      {jobs.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No jobs found.</div>
      ) : (
        jobs.map((job, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-900 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-blue-900 font-serif">
                  {job.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {job.company}
                </p>
                <div className="flex gap-5 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt size={14} /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaRupeeSign size={14} /> {job.salary}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaBriefcase size={14} /> {job.type}
                  </span>
                </div>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md">
                Apply Now
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}