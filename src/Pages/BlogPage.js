import { FaRegCalendarAlt, FaUser } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { blogs } from "../data/BlogsData.js";
import React from "react";

// Custom Link wrapper to scroll to top on navigation
function Link({ to, children, ...rest }) {
  function handleClick(e) {
    // Let any onClick prop also run
    if (rest.onClick) rest.onClick(e);
    // Use setTimeout to allow route navigation to begin before scrolling
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
    <section className="bg-blue-900 text-white py-20 text-center px-6">
      <h1 className="text-4xl font-bold font-serif mb-4">
        Sudhosan Insights
      </h1>
      <p className="max-w-2xl mx-auto text-blue-100">
        Discover career guidance, skill development insights,
        job market trends, and opportunities to build a successful future.
      </p>
      <p className="mt-4 text-orange-400 font-semibold">
        DREAM | DISCOVER | DELIVER
      </p>
    </section>
  );
}

function FeaturedBlog() {
  // For the example, assume a featured blog slug
  const featuredSlug = "bridging-gap-education-employment";
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
       
        <img
          src="/blog.avif"
          alt="Bridging the Gap Between Education and Employment"
          className="w-full h-80 object-cover rounded-xl shadow-lg"
        />
        <div>
          <span className="text-orange-500 text-sm font-medium">
            Featured Article
          </span>
          <h2 className="text-3xl font-bold font-serif mt-2 mb-4">
            Bridging the Gap Between Education and Employment
          </h2>
          <p className="text-gray-600 mb-6">
            Sudhosan Skill Solutions focuses on empowering youth from
            rural and semi-urban India with industry-aligned training
            and career opportunities.
          </p>
          <Link
            to={`/blogs/${featuredSlug}`}
            className="inline-block bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition"
          >
            Read Article
          </Link>
        </div>
      </div>
    </section>
  );
}

function BlogGrid() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold font-serif text-center mb-12">
          Latest Articles
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {blogs.map((blog, i) => (
            <div
              key={i}
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
                <h3 className="font-semibold text-lg mt-2 mb-4">
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
          ))}
        </div>
      </div>
    </section>
  );
}



function BlogCTA() {
  return (
    <section className="bg-blue-900 text-white py-20 text-center px-6">
      <h2 className="text-3xl font-bold font-serif mb-4">
        Stay Updated with Career Insights
      </h2>
      <p className="text-blue-100 mb-8">
        Get the latest articles, career tips, and job market insights
        from Sudhosan Skill Solutions.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-3 rounded-md text-black w-72"
        />
        <button className="bg-orange-500 px-6 py-3 rounded-md hover:bg-orange-600">
          Subscribe
        </button>
      </div>
    </section>
  );
}

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <FeaturedBlog />
      <BlogGrid />

      <BlogCTA />
    </>
  );
}