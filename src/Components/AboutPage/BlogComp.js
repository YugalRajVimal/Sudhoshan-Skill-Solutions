import React from "react";
import { FaRegCalendarAlt, FaUser } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { blogs } from "../../data/BlogsData";


// Scroll-to-top Link
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

export default function HomeBlogsSection() {

  const latestBlogs = blogs.slice(0, 3);

  return (
    <section className="py-20 px-6 ">

      <div className="max-w-6xl mx-auto">

        {/* Section Header */}

        <div className="text-center mb-14">

          <h2 className="text-3xl font-bold font-serif mb-4">
            Latest Insights
          </h2>

          <p className="text-gray-600 max-w-xl mx-auto">
            Career tips, job market insights, and skill development
            guidance from Sudhosan Skill Solutions.
          </p>

        </div>


        {/* Blog Cards */}

        <div className="grid md:grid-cols-3 gap-10">

          {latestBlogs.map((blog, i) => (

            <div
              key={i}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >

              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">

                <span className="text-orange-500 text-sm">
                  {blog.category}
                </span>

                <h3 className="font-semibold text-lg mt-2 mb-4">
                  {blog.title}
                </h3>


                {/* meta */}

                <div className="flex text-gray-500 text-sm gap-4 mb-4">

                  <span className="flex items-center gap-1">
                    <FaUser size={14} />
                    {blog.author}
                  </span>

                  <span className="flex items-center gap-1">
                    <FaRegCalendarAlt size={14} />
                    {blog.date}
                  </span>

                </div>

                <Link
                  to={`/blogs/${blog.slug}`}
                  className="text-blue-900 font-medium hover:underline"
                >
                  Read More →
                </Link>

              </div>

            </div>

          ))}

        </div>


        {/* View All Blogs */}

        <div className="text-center mt-12">

          <Link
            to="/blogs"
            className="inline-block bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition"
          >
            View All Articles
          </Link>

        </div>

      </div>

    </section>
  );
}