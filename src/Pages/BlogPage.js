import { FaRegCalendarAlt, FaUser } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../data/BlogsData.js";

// Custom Link wrapper to scroll to top on navigation
function Link({ to, children, ...rest }) {
  function handleClick(e) {
    if (rest.onClick) rest.onClick(e);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }

  return (
    <RouterLink to={to} {...rest} onClick={handleClick}>
      {children}
    </RouterLink>
  );
}

function BlogHero() {
  return (
    <section
      className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white py-20 text-center px-6 overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(to bottom right, #1e3a8a, #2563eb, #3b82f6)',
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
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

      <div className="relative z-10">
        <h1 className="text-4xl font-bold font-serif mb-4">
        Sudhosan <span className="text-orange-500">Insights</span> 
        </h1>
        <p className="max-w-2xl mx-auto text-blue-100">
          Discover career guidance, skill development insights, job market trends, and opportunities to build a successful future.
        </p>
        <p className="mt-4 text-orange-400 font-semibold">
          DREAM | DISCOVER | DELIVER
        </p>
      </div>
    </section>
  );
}

function FeaturedBlog({ blogs }) {
  // Try to find the featured blog dynamically (by some logic, e.g., slug or isFeatured property)
  // Fallback: hardcode slug or pick first if not found
  const featuredSlug = "bridging-gap-education-employment";
  let featured = blogs && blogs.length
    ? blogs.find(b => b.slug === featuredSlug) || blogs[0]
    : null;

  if (!featured) {
    // fallback content if blogs not loaded or empty
    return null;
  }

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <img
          src={featured.image || "/blog.avif"}
          alt={featured.title || "Featured Blog"}
          className="w-full h-80 object-cover rounded-xl shadow-lg"
        />
        <div>
          <span className="text-orange-500 text-sm font-medium">
            Featured Article
          </span>
          <h2 className="text-3xl font-bold font-serif mt-2 mb-4">
            {featured.title}
          </h2>
          <p className="text-gray-600 mb-6">
            {featured.description ||
              "Sudhosan Skill Solutions focuses on empowering youth from rural and semi-urban India with industry-aligned training and career opportunities."}
          </p>
          <Link
            to={`/blogs/${featured.slug}`}
            className="inline-block bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition"
          >
            Read Article
          </Link>
        </div>
      </div>
    </section>
  );
}

function BlogGrid({ blogs, loading, error }) {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold font-serif text-center mb-12">
          Latest Articles
        </h2>
        {loading && (
          <div className="text-center py-16 text-gray-500">Loading articles...</div>
        )}
        {!loading && error && (
          <div className="text-center py-16 text-red-500">Error loading blogs. Please reload the page.</div>
        )}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            {(!blogs || blogs.length === 0) ? (
              <div className="col-span-3 text-gray-400 text-center py-8">
                No articles available.
              </div>
            ) : (
              blogs.map((blog, i) => (
                <div
                  key={blog.slug ?? i}
                  className="bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  <img
                    src={blog.image}
                    className="w-full h-48 object-cover"
                    alt={blog.title}
                  />
                  <div className="p-6">
                    <span className="text-orange-500 text-sm">
                      {blog.category}
                    </span>
                    <h3 className="font-semibold text-lg mt-2 mb-4 font-serif">
                      {blog.title}
                    </h3>
                    <div className="flex text-gray-500 text-sm gap-4 mb-4">
                      <span className="flex items-center gap-1">
                        <FaUser size={14} /> {blog.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaRegCalendarAlt size={14} /> {blog.date}
                      </span>
                    </div>
                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="text-blue-900 font-medium hover:underline"
                    >
                      Read More &rarr;
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// Newsletter subscription CTA with backend API integration using REACT_APP_API_URL
function BlogCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  async function handleSubscribe(e) {
    e.preventDefault();
    setMessage("");
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || ""}/api/subscribe-newsletter`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim() }),
        }
      );
      const data = await response.json();
      if (response.ok && data.message) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data?.error || "Unable to subscribe. Please try again later.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <section className="bg-zinc-50 text-white py-20 text-center px-6">
      <h2 className="text-3xl font-bold font-serif mb-4 text-gray-900">
        Stay Updated with Career Insights
      </h2>
      <p className="text-gray-700 mb-8">
        Get the latest articles, career tips, and job market insights
        from Sudhosan Skill Solutions.
      </p>
      <form className="flex justify-center gap-4 flex-wrap"
        onSubmit={handleSubscribe}
        aria-label="Subscribe to newsletter"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-3 rounded-md text-gray-900 w-72"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
        />
        <button
          className={`bg-orange-500 px-6 py-3 rounded-md hover:bg-orange-600 text-white transition disabled:opacity-60`}
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {!!message && (
        <div
          className={`mt-6 text-center text-sm font-medium transition 
            ${
              status === "success"
                ? "text-green-600"
                : status === "error"
                ? "text-red-500"
                : "text-gray-800"
            }`}
          role={status === "error" ? "alert" : undefined}
        >
          {message}
        </div>
      )}
    </section>
  );
}


export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch blogs from API
    setLoading(true);
    setError(null);
    fetchBlogs()
      .then((data) => {
        setBlogs(data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setBlogs([]);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <BlogHero />
      <FeaturedBlog blogs={blogs} />
      <BlogGrid blogs={blogs} loading={loading} error={error} />
      <BlogCTA />
    </>
  );
}