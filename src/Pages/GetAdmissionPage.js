import { useState } from "react";

export default function GetAdmissionPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    course: "",
    qualification: "",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [resultMsg, setResultMsg] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitted(false);
    setErrorMsg("");
    setResultMsg("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admission-mail`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const text = await response.text();

      if (!response.ok) {
        setErrorMsg(text || "Something went wrong");
      } else {
        setSubmitted(true);
        setResultMsg(
          text || "Form submitted successfully. We'll contact you soon!"
        );

        setForm({
          fullName: "",
          email: "",
          phone: "",
          city: "",
          state: "",
          course: "",
          qualification: "",
          notes: "",
        });
      }
    } catch (err) {
      setErrorMsg("Server error. Please try again later.");
    }

    setSubmitting(false);
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12 px-3">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
            Get <span className="text-orange-500">Admission</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill out the form below and our team will contact you soon.
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-blue-900 mb-6">
            Admission Form
          </h2>

          {submitted && (
            <div className="bg-green-100 text-green-800 p-3 rounded mb-4 text-center">
              {resultMsg}
            </div>
          )}

          {errorMsg && (
            <div className="bg-red-100 text-red-800 p-3 rounded mb-4 text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* FULL NAME */}
            <FormField
              label="Full Name"
              name="fullName"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
              required
            />

            {/* EMAIL */}
            <FormField
              label="Email Address"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              value={form.email}
              onChange={handleChange}
              required
            />

            {/* PHONE */}
            <FormField
              label="Phone Number"
              name="phone"
              placeholder="+91 XXXXX XXXXX"
              value={form.phone}
              onChange={handleChange}
              required
            />

            {/* CITY + STATE */}
            <div className="grid md:grid-cols-2 gap-5">
              <FormField
                label="City / District"
                name="city"
                placeholder="e.g. Sheohar"
                value={form.city}
                onChange={handleChange}
                required
              />

              <SelectField
                label="State"
                name="state"
                value={form.state}
                onChange={handleChange}
                required
                options={[
                  "Select State",
                  "Bihar",
                  "Uttar Pradesh",
                  "Delhi",
                  "Maharashtra",
                  "Tamil Nadu",
                  "Karnataka",
                  "West Bengal",
                  "Other",
                ]}
              />
            </div>

            {/* COURSE */}
            {/*
              Course options with disabled headings for categories
            */}
            {(() => {
              const courses = [
                { label: "Select a Course", value: "" },

                // Medical
                { label: "— Medical —", value: "", disabled: true },
                { label: "MBBS (Bachelor of Medicine & Surgery)", value: "MBBS (Bachelor of Medicine & Surgery)" },
                { label: "BDS (Bachelor of Dental Surgery)", value: "BDS (Bachelor of Dental Surgery)" },
                { label: "BAMS (Ayurvedic Medicine & Surgery)", value: "BAMS (Ayurvedic Medicine & Surgery)" },
                { label: "BHMS (Homeopathic Medicine & Surgery)", value: "BHMS (Homeopathic Medicine & Surgery)" },
                { label: "BUMS (Unani Medicine & Surgery)", value: "BUMS (Unani Medicine & Surgery)" },
                { label: "MD / MS (Post Graduate Medical)", value: "MD / MS (Post Graduate Medical)" },

                // Para Medical
                { label: "— Para Medical —", value: "", disabled: true },
                { label: "B.Sc. Nursing / GNM Nursing", value: "B.Sc. Nursing / GNM Nursing" },
                { label: "ANM (Auxiliary Nurse Midwife)", value: "ANM (Auxiliary Nurse Midwife)" },
                { label: "DMLT / MLT (Lab Technician)", value: "DMLT / MLT (Lab Technician)" },
                { label: "B.Pharm / D.Pharm (Pharmacy)", value: "B.Pharm / D.Pharm (Pharmacy)" },
                { label: "Radiology & Imaging Technology", value: "Radiology & Imaging Technology" },
                { label: "Operation Theatre Technology (OTT)", value: "Operation Theatre Technology (OTT)" },
                { label: "Physiotherapy (BPT)", value: "Physiotherapy (BPT)" },
                { label: "Optometry", value: "Optometry" },
                { label: "Emergency Medical Technician (EMT)", value: "Emergency Medical Technician (EMT)" },

                // Management
                { label: "— Management —", value: "", disabled: true },
                { label: "MBA (Master of Business Administration)", value: "MBA (Master of Business Administration)" },
              ];
              return (
                <div>
                  <label className="text-sm text-gray-600 font-medium">
                    Course Interest <span className="text-orange-500">*</span>
                  </label>
                  <select
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 border rounded-md px-4 py-3 bg-white"
                  >
                    {courses.map((opt, i) => (
                      <option
                        key={i}
                        value={opt.value}
                        disabled={!!opt.disabled}
                        hidden={i === 0 && opt.value === ""} // only hide in list if it's the select a course placeholder
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })()}

            {/* QUALIFICATION */}
            <SelectField
              label="Highest Qualification"
              name="qualification"
              value={form.qualification}
              onChange={handleChange}
              required
              options={[
                "Select Qualification",
                "Below 10th",
                "10th Pass (Matriculation)",
                "12th Pass (Intermediate)",
                "Diploma / ITI",
                "Graduate (B.A. / B.Sc. / B.Com / BBA / Other)",
                "Post Graduate (M.A. / M.Sc. / M.Com / MBA / Other)",
                "Currently Studying",
              ]}
            />

            {/* NOTES */}
            <div>
              <label className="text-sm text-gray-600 font-medium">
                Additional Notes (optional)
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="w-full mt-1 border rounded-md px-4 py-2"
                placeholder="Any additional info"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-orange-500 to-blue-900 text-white py-3 rounded-lg font-bold"
            >
              {submitting ? "Submitting..." : "Apply for Admission"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* INPUT FIELD */
function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}) {
  return (
    <div>
      <label className="text-sm text-gray-600 font-medium">
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full mt-1 border rounded-md px-4 py-3"
      />
    </div>
  );
}

/* SELECT FIELD */
function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required,
}) {
  return (
    <div>
      <label className="text-sm text-gray-600 font-medium">
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full mt-1 border rounded-md px-4 py-3 bg-white"
      >
        {options.map((opt, i) => (
          <option key={i} value={i === 0 ? "" : opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}