import React from "react";
import { FaRegCalendarAlt, FaUser } from "react-icons/fa";

const FullBlogPageTemplate = ({ blog }) => {

  if (!blog) {
    return (
      <div className="text-center py-20 text-xl">
        Blog not found
      </div>
    );
  }

  return (
    <section className="bg-white py-16 px-6">

      <div className="max-w-4xl mx-auto">

        {/* Image */}

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-80 object-cover rounded-xl mb-8"
        />

        {/* Title */}

        <h1 className="text-4xl font-bold font-serif text-blue-900 mb-4">
          {blog.title}
        </h1>

        {/* Meta */}

        <div className="flex gap-6 text-gray-500 text-sm mb-10">

          <span className="flex items-center gap-2">
            <FaUser /> {blog.author}
          </span>

          <span className="flex items-center gap-2">
            <FaRegCalendarAlt /> {blog.date}
          </span>

          <span className="text-orange-500">
            {blog.category}
          </span>

        </div>

        {/* Content */}

        <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
          {blog.content}
        </div>

        {/* CTA */}

        {/* <div className="bg-blue-900 text-white p-8 rounded-xl mt-14 text-center">

          <h3 className="text-2xl font-bold mb-4">
            Need Career Guidance?
          </h3>

          <p className="text-blue-100 mb-6">
            Sudhosan Skill Solutions helps students build skills,
            prepare for interviews, and connect with employers.
          </p>

          <button className="bg-orange-500 px-6 py-3 rounded-md hover:bg-orange-600">
            Explore Programs
          </button>

        </div> */}

      </div>

    </section>
  );
};

export default FullBlogPageTemplate;