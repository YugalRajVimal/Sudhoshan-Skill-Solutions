import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import { fetchBlogs } from "../data/BlogsData.js";

// We use "quill" ONLY for read/view - we do not use react-quill.
// When rendering, we dynamically create a Quill instance in read-only mode on a div.

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const quillRef = useRef(null);
  const quillInstanceRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchBlogs()
      .then((blogs) => {
        if (isMounted) {
          const foundBlog = blogs.find((b) => b.slug === slug);
          setBlog(foundBlog);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [slug]);
  
  // Dynamically inject Quill on demand only for the viewer
  useEffect(() => {
    if (!blog || !blog.content) return;

    // Clean up previous instance
    if (quillInstanceRef.current) {
      quillInstanceRef.current = null;
      if (quillRef.current) quillRef.current.innerHTML = "";
    }

    let isCancelled = false;

    async function initQuill() {
      // Dynamically import so Quill is not included in initial bundle
      const Quill = (await import("quill")).default;
      if (quillRef.current && !isCancelled) {
        quillInstanceRef.current = new Quill(quillRef.current, {
          readOnly: true,
          theme: "bubble", // Bubble theme is best for readonly display
        });

        // If it's Quill Delta, parse as JSON
        let content = blog.content;
        // Accept both delta and html strings
        let isDelta = false;
        if (typeof content === "string") {
          try {
            const asJson = JSON.parse(content);
            if (asJson && typeof asJson === "object" && (asJson.ops || asJson.insert)) {
              content = asJson;
              isDelta = true;
            }
          } catch (e) {
            // not JSON, probably html
          }
        }
        if (isDelta) {
          quillInstanceRef.current.setContents(content);
        } else {
          // fallback: assume HTML, dangerously paste
          quillInstanceRef.current.clipboard.dangerouslyPasteHTML(content);
        }
      }
    }
    initQuill();

    return () => {
      isCancelled = true;
      // Clean up instance
      if (quillInstanceRef.current) {
        quillInstanceRef.current = null;
        if (quillRef.current) quillRef.current.innerHTML = "";
      }
    };
  }, [blog]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog details.</div>;
  if (!blog) return <div>Blog not found.</div>;

  // Render basic blog info and inject Quill readonly div for content
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold font-serif mb-4">{blog.title}</h1>
      {blog.author && (
        <p className="mb-2 text-gray-500 text-sm">by {blog.author}</p>
      )}
      {/* Add any blog meta you want */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="mb-6 w-full rounded-xl max-h-[400px] object-cover"
        />
      )}
      <div ref={quillRef} />
    </div>
  );
}