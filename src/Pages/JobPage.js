import React, { useState, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaBriefcase, FaRupeeSign, FaFilter, FaBuilding } from "react-icons/fa";
import { GiConsoleController } from "react-icons/gi";

// Utility to parse query parameters
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

// Helper: Get unique values (optionally mapped) from jobs[key], which may be array or string
function getUniqueFromJobs(jobs, key, valueMap = null) {
  const set = new Set();
  jobs.forEach(job => {
    let val = job[key];
    if (Array.isArray(val)) {
      val.forEach(v => set.add(valueMap ? valueMap(v) : v));
    } else if (typeof val === "string" && val.trim()) {
      set.add(valueMap ? valueMap(val) : val);
    }
  });
  return Array.from(set).filter(Boolean);
}

// Helper: Get all distinct categories across all jobs (job.categories as array)
function getUniqueCategories(jobs) {
  const catSet = new Set();
  jobs.forEach(job => {
    if (Array.isArray(job.categories)) {
      job.categories.forEach(c => {
        if (typeof c === "string" && c.trim()) catSet.add(c.trim());
      });
    }
  });
  // REMOVE SORTING - don't sort the resulting array
  return Array.from(catSet);
}

// Helper: Get unique companies
function getUniqueCompanies(jobs) {
  return getUniqueFromJobs(jobs, "company", company => company && company.trim());
}

function getUniqueSalaryRanges(jobs) {
  const salaryRangesSet = new Set();
  jobs.forEach(job => {
    let val = job.salaryRange || job.salary;
    if (!val) return;
    if (
      val.includes("LPA") &&
      (
        val.includes("0-3") ||
        val.includes("3-6") ||
        val.includes("6-10") ||
        val.includes("10+") ||
        val.includes("10 - ") || val.includes("10 +")
      )
    ) {
      salaryRangesSet.add(val.trim());
    } else {
      const match = val.match(/(\d+(\.\d+)?)/g);
      if (match) {
        const num = parseFloat(match[0]);
        if (num < 3) salaryRangesSet.add("0-3 LPA");
        else if (num < 6) salaryRangesSet.add("3-6 LPA");
        else if (num < 10) salaryRangesSet.add("6-10 LPA");
        else salaryRangesSet.add("10+ LPA");
      }
    }
  });
  // REMOVE SORTING - do not sort using canonicalOrder
  return Array.from(salaryRangesSet);
}

export default function JobsPage({ allData }) {
  const jobs = allData?.jobs ?? [];

  useEffect(()=>{
console.log(jobs);
  },[]);

  const query = useQuery();
  const navigate = useNavigate();

  const LOCATIONS = useMemo(
    () => getUniqueFromJobs(jobs, "location", loc => loc && loc.trim()),
    [jobs]
  );
  const COMPANIES = useMemo(() => getUniqueCompanies(jobs), [jobs]);
  const SALARY_RANGES = useMemo(() => getUniqueSalaryRanges(jobs), [jobs]);
  const CATEGORIES = useMemo(() => getUniqueCategories(jobs), [jobs]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Modal state for apply form
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJobForApply, setSelectedJobForApply] = useState(null);

  // Sync state with URL query on mount or when url changes
  useEffect(() => {
    const locationParam = query.get("location");
    const companyParam = query.get("company");
    const titleParam = query.get("title");
    const filtersCategoriesParam = query.get("categories");

    if (locationParam) {
      setSelectedLocations(
        locationParam
          .split(",")
          .filter(loc => !!loc && LOCATIONS.includes(loc))
      );
    }

    if (companyParam) {
      setSelectedCompanies(
        companyParam
          .split(",")
          .filter(cmp => !!cmp && COMPANIES.includes(cmp))
      );
    }

    if (filtersCategoriesParam) {
      setSelectedCategories(
        filtersCategoriesParam
          .split(",")
          .filter(cat => !!cat && CATEGORIES.includes(cat))
      );
    }

    let result = jobs;

    if (locationParam) {
      result = result.filter(job =>
        locationParam
          .split(",")
          .some(loc =>
            (job.location || "").toLowerCase().includes(loc.toLowerCase())
          )
      );
    }

    if (companyParam) {
      result = result.filter(job =>
        companyParam
          .split(",")
          .some(cmp =>
            (job.company || "").toLowerCase().includes(cmp.toLowerCase())
          )
      );
    }

    if (titleParam) {
      result = result.filter(job =>
        (job.title || "").toLowerCase().includes(titleParam.toLowerCase())
      );
    }

    if (filtersCategoriesParam) {
      const catsArr = filtersCategoriesParam.split(",").map(s => s.trim());
      result = result.filter(job =>
        Array.isArray(job.categories)
          ? job.categories.some(c => catsArr.includes(c))
          : false
      );
    }

    setFilteredJobs(result);
    // eslint-disable-next-line
  }, [jobs, query, LOCATIONS, CATEGORIES, COMPANIES]);

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    if (selectedLocations.length > 0) params.set("location", selectedLocations.join(","));
    if (selectedCompanies.length > 0) params.set("company", selectedCompanies.join(","));
    if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","));

    navigate({
      pathname: "/jobs",
      search: params.toString(),
    });

    let result = jobs;
    if (selectedLocations.length > 0) {
      result = result.filter(job =>
        selectedLocations.some(loc =>
          (job.location || "").toLowerCase().includes(loc.toLowerCase())
        )
      );
    }
    if (selectedCompanies.length > 0) {
      result = result.filter(job =>
        selectedCompanies.some(cmp =>
          (job.company || "").toLowerCase().includes(cmp.toLowerCase())
        )
      );
    }
    if (selectedSalaryRanges.length > 0) {
      result = result.filter(job => {
        const jobSalaryRange = job.salaryRange || job.salary || "";
        return selectedSalaryRanges.some(range =>
          jobSalaryRange.includes(range)
        );
      });
    }
    if (selectedCategories.length > 0) {
      result = result.filter(job =>
        Array.isArray(job.categories)
          ? job.categories.some(c => selectedCategories.includes(c))
          : false
      );
    }
    setFilteredJobs(result);
    setShowMobileFilters(false);
  };

  const openApplyModal = job => {
    setSelectedJobForApply(job);
    setShowApplyModal(true);
  };

  const closeApplyModal = () => {
    setShowApplyModal(false);
    setSelectedJobForApply(null);
  };

  // --- Here we set a fixed height for the primary scroll area and make both filter and jobs list scrollable (desktop only) ---
  // We will use 80vh for the main grid height on md+ screens, adjust as needed.

  return (
    <section className="bg-gray-50 min-h-screen py-8 px-2 sm:py-14 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 font-serif">
            Latest <span className="text-orange-500">Job Openings</span>
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
                LOCATIONS={LOCATIONS}
                COMPANIES={COMPANIES}
                SALARY_RANGES={SALARY_RANGES}
                CATEGORIES={CATEGORIES}
                selectedLocations={selectedLocations}
                setSelectedLocations={setSelectedLocations}
                selectedCompanies={selectedCompanies}
                setSelectedCompanies={setSelectedCompanies}
                selectedSalaryRanges={selectedSalaryRanges}
                setSelectedSalaryRanges={setSelectedSalaryRanges}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                onApply={handleApplyFilters}
                isMobile={true}
                onClose={() => setShowMobileFilters(false)}
              />
            </div>
          )}
        </div>
        {/* Large screens: Filters in grid sidebar */}
        <div
          className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-8"
          style={{ height: "80vh", minHeight: "500px", maxHeight: "1000px" }} // fixed grid height for scroll separation, can adjust
        >
          {/* Filter sidebar, scrollable within its segment */}
          <div
            className="hidden sm:block h-full"
            style={{ maxHeight: "100%", height: "100%", overflow: "auto" }}
          >
            <Filters
              LOCATIONS={LOCATIONS}
              COMPANIES={COMPANIES}
              SALARY_RANGES={SALARY_RANGES}
              CATEGORIES={CATEGORIES}
              selectedLocations={selectedLocations}
              setSelectedLocations={setSelectedLocations}
              selectedCompanies={selectedCompanies}
              setSelectedCompanies={setSelectedCompanies}
              selectedSalaryRanges={selectedSalaryRanges}
              setSelectedSalaryRanges={setSelectedSalaryRanges}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              onApply={handleApplyFilters}
            />
          </div>
          {/* Job Listings with scroll in main content (spanning 3 columns) */}
          <div
            className="col-span-1 md:col-span-3 h-full"
            style={{ maxHeight: "100%", height: "100%", overflow: "auto" }}
          >
            <JobListings jobs={filteredJobs} onApplyClick={openApplyModal} />
          </div>
        </div>
        {/* For small screens, use the original stacking layout */}
        <div className="md:hidden grid sm:grid-cols-1">
          <JobListings jobs={filteredJobs} onApplyClick={openApplyModal} />
        </div>
      </div>
      {/* Modal Popup for Job Application */}
      <ApplyModal
        open={showApplyModal}
        job={selectedJobForApply}
        onClose={closeApplyModal}
      />
    </section>
  );
}

// Filters now supports categories and company!
function Filters({
  LOCATIONS = [],
  COMPANIES = [],
  SALARY_RANGES = [],
  CATEGORIES = [],
  selectedLocations,
  setSelectedLocations,
  selectedCompanies,
  setSelectedCompanies,
  selectedSalaryRanges,
  setSelectedSalaryRanges,
  selectedCategories = [],
  setSelectedCategories,
  onApply,
  isMobile = false,
  onClose,
}) {
  const handleCheckboxChange = (setter, selected, value) => {
    if (selected.includes(value)) {
      setter(selected.filter(v => v !== value));
    } else {
      setter([...selected, value]);
    }
  };

  // On desktop, make filter body scrollable if tall, else let grow to max parent height
  return (
    <div
      className={`bg-white rounded-xl p-4 sm:p-6 h-fit ${isMobile ? "w-full max-w-md mx-auto" : ""}`}
      style={
        isMobile
          ? {}
          : {
              // Let parent control maxHeight via md:grid, but prevent huge content
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }
      }
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

      {/* Scrollable body for filter options */}
      <div
        style={
          isMobile
            ? undefined
            : {
                flex: 1,
                overflowY: "auto",
                minHeight: 0,
                paddingBottom: "1rem",
              }
        }
      >
        {/* Location */}
        <div className="mb-6">
          <h4 className="font-medium mb-2 font-serif text-sm sm:text-base">Location</h4>
          <div className="space-y-2 text-xs sm:text-sm">
            {LOCATIONS.length === 0 ? (
              <div className="text-gray-400">No locations found</div>
            ) : (
              LOCATIONS.map(loc => (
                <label key={loc} className="flex gap-2 cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes(loc)}
                    onChange={() => handleCheckboxChange(setSelectedLocations, selectedLocations, loc)}
                    className="accent-blue-900"
                  />{" "}
                  <span>{loc}</span>
                </label>
              ))
            )}
          </div>
        </div>

        {/* Company */}
        <div className="mb-6">
          <h4 className="font-medium mb-2 font-serif text-sm sm:text-base">Company</h4>
          <div className="space-y-2 text-xs sm:text-sm">
            {COMPANIES.length === 0 ? (
              <div className="text-gray-400">No companies found</div>
            ) : (
              COMPANIES.map(cmp => (
                <label key={cmp} className="flex gap-2 cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={selectedCompanies.includes(cmp)}
                    onChange={() => handleCheckboxChange(setSelectedCompanies, selectedCompanies, cmp)}
                    className="accent-blue-900"
                  />{" "}
                  <span>{cmp}</span>
                </label>
              ))
            )}
          </div>
        </div>

        {/* Salary */}
        <div className="mb-6">
          <h4 className="font-medium mb-2 font-serif text-sm sm:text-base">Salary Range</h4>
          <div className="space-y-2 text-xs sm:text-sm">
            {SALARY_RANGES.length === 0 ? (
              <div className="text-gray-400">No salary ranges found</div>
            ) : (
              SALARY_RANGES.map(range => (
                <label key={range} className="flex gap-2 cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={selectedSalaryRanges.includes(range)}
                    onChange={() => handleCheckboxChange(setSelectedSalaryRanges, selectedSalaryRanges, range)}
                    className="accent-blue-900"
                  />{" "}
                  <span>{range}</span>
                </label>
              ))
            )}
          </div>
        </div>

        {/* Category */}
        <div className="mb-6">
          <h4 className="font-medium mb-2 font-serif text-sm sm:text-base">Category</h4>
          <div className="space-y-2 text-xs sm:text-sm">
            {CATEGORIES.length === 0 ? (
              <div className="text-gray-400">No categories found</div>
            ) : (
              CATEGORIES.map(cat => (
                <label key={cat} className="flex gap-2 cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCheckboxChange(setSelectedCategories, selectedCategories, cat)}
                    className="accent-blue-900"
                  />{" "}
                  <span>{cat}</span>
                </label>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Apply Button at the bottom (sticky, not scrolled away) */}
      <div className={isMobile ? "" : "pt-3"}>
        <button
          className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 text-sm sm:text-base"
          onClick={onApply}
          type="button"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}

// --- ApplyModal Component with scrollable body if needed ---
function ApplyModal({ open, job, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    resume: null,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const modalRef = useRef(null);

  React.useEffect(() => {
    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
      resume: null,
    });
    setErrors({});
    setSubmitted(false);
    setSubmitMessage(null);
    setSubmitting(false);
  }, [open, job]);

  if (!open || !job) return null;

  function validate(form) {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim() || !/^(\d{10}|\+?\d{11,13})$/.test(form.phone.replace(/\s+/g, ''))) e.phone = "Valid phone is required";
    return e;
  }

  function handleInputChange(e) {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length === 0) {
      setSubmitting(true);
      setSubmitMessage(null);
      try {
        const formData = new FormData();
        formData.append("name", form.name.trim());
        formData.append("email", form.email.trim());
        formData.append("phone", form.phone.trim());
        formData.append("message", form.message.trim());
        formData.append("jobTitle", job.title);
        formData.append("jobCompany", job.company);
        formData.append("jobLocation", job.location);
        if (form.resume) {
          formData.append("resume", form.resume);
        }

        const API_URL = process.env.REACT_APP_API_URL || (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.REACT_APP_API_URL) || "";
        let apiUrl = (API_URL || "").replace(/\/$/, "") + "/api/job-apply";

        const response = await fetch(apiUrl, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          let msg = "An error occurred while submitting your application.";
          if (response.headers.get("content-type")?.includes("application/json")) {
            const payload = await response.json();
            msg = payload?.error || payload?.message || msg;
          } else {
            msg = await response.text() || msg;
          }
          setSubmitMessage({ type: "error", text: msg });
        } else {
          const payload = await (response.headers.get("content-type")?.includes("application/json") ? response.json() : response.text());
          let msg = typeof payload === "string"
            ? payload
            : (payload?.message || "Your application was submitted successfully.");
          setSubmitted(true);
          setSubmitMessage({ type: "success", text: msg });
          setTimeout(() => {
            onClose && onClose();
          }, 2200);
        }
      } catch (err) {
        setSubmitMessage({ type: "error", text: "An error occurred while submitting your application." });
      } finally {
        setSubmitting(false);
      }
    }
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed z-[100] top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center px-2"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      style={{
        overflowY: 'auto'
      }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-lg w-full relative"
        style={{
          maxHeight: "calc(100vh - 40px)",
          overflowY: "auto",
        }}
      >
        <button
          className="absolute right-4 top-4 text-2xl font-bold text-gray-800 hover:text-orange-500"
          aria-label="Close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
        <h2 className="text-xl sm:text-2xl font-bold mb-1 text-blue-900 font-serif">Apply for {job.title}</h2>
        <p className="text-sm text-gray-600 mb-4">{job.company} &middot; {job.location}</p>
        {submitted ? (
          <div className="text-center py-10 min-h-[48px] text-green-700 font-semibold text-lg">
            {submitMessage?.text || "Your application has been submitted!"}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
            <div>
              <label className="block text-sm text-blue-900 font-medium mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full border ${errors.name ? "border-red-500" : "border-gray-300"} px-3 py-2 rounded-md`}
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                required
                autoComplete="name"
                disabled={submitting}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm text-blue-900 font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full border ${errors.email ? "border-red-500" : "border-gray-300"} px-3 py-2 rounded-md`}
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                required
                autoComplete="email"
                disabled={submitting}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm text-blue-900 font-medium mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full border ${errors.phone ? "border-red-500" : "border-gray-300"} px-3 py-2 rounded-md`}
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                required
                autoComplete="tel"
                disabled={submitting}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm text-blue-900 font-medium mb-1">Cover Letter / Message</label>
              <textarea
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
                name="message"
                value={form.message}
                onChange={handleInputChange}
                rows={3}
                placeholder="(Optional) Brief message or cover letter"
                disabled={submitting}
              />
            </div>
            <div>
              <label className="block text-sm text-blue-900 font-medium mb-1">
                Upload Resume <span className="text-gray-400">(optional)</span>
              </label>
              <input
                className={`w-full border ${errors.resume ? "border-red-500" : "border-gray-300"} px-3 py-2 rounded-md`}
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleInputChange}
                disabled={submitting}
              />
              {/* Resume is now optional; show error only if backend or client checks complain */}
              {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
            </div>
            {submitMessage?.type === "error" && (
              <div className="bg-red-100 text-red-600 text-center rounded-md p-2 text-sm">
                {submitMessage.text}
              </div>
            )}
            <button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md text-sm sm:text-base font-semibold flex items-center justify-center gap-2"
              type="submit"
              disabled={submitting}
            >
              {submitting ? (
                <span>
                  <svg className="inline-block mr-1 animate-spin" width={20} height={20} viewBox="0 0 50 50">
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="5"
                      opacity="0.5"
                    />
                    <path
                      d="M25 5
                        a 20 20 0 0 1 0 40
                        a 20 20 0 0 1 0 -40"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Submit Application"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// JobListings for 2-column layout, fits inside a scrollable container.
// ADD minimumQualification LINE BELOW TITLE, IF DEFINED
function JobListings({ jobs, onApplyClick }) {
  if (!jobs.length) {
    return (
      <div className="col-span-1 md:col-span-3">
        <div className="text-center text-gray-500 py-10">No jobs found.</div>
      </div>
    );
  }

  return (
    <div className="col-span-1 md:col-span-3 w-full">
      {/* On big screens (md+): 2 columns, sm and down: 1 column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        {jobs.map((job, i) => (
          <div
            key={i}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border-l-4 border-blue-900 hover:shadow-md transition flex flex-col justify-between h-full"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h3 className="text-base xs:text-lg font-semibold text-blue-900 font-serif">
                  {job.title}
                </h3>
                {/* Render minimumQualification if present */}
                {job.minimumQualification && (
                  <div className="text-xs xs:text-sm text-gray-700 mt-1 mb-1 flex items-center">
                    <span className="font-semibold text-gray-600 mr-1">Min. Qualification:</span>
                    <span>{job.minimumQualification}</span>
                  </div>
                )}
                {/* <p className="text-gray-600 text-xs xs:text-sm mb-2 flex items-center gap-1">
                  
                </p> */}
                <div className="flex flex-col xs:flex-row xs:gap-5 gap-2 text-xs xs:text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <FaBuilding size={13} /> {job.company}
                  </span>
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
                {(job.categories && job.categories.length > 0) && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {job.categories.map((cat, idx) => (
                      <span
                        key={cat + idx}
                        className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded font-semibold"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  className="mt-2 md:mt-0 whitespace-nowrap bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2 rounded-md text-sm sm:text-base w-full xs:w-auto"
                  onClick={() => onApplyClick && onApplyClick(job)}
                  type="button"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}