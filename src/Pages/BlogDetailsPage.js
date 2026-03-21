import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { fetchBlogs } from "../data/BlogsData.js";
import FullBlogPageTemplate from "./FullBlogPageTemplate.js";

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog details.</div>;
  if (!blog) return <div>Blog not found.</div>;

  return <FullBlogPageTemplate blog={blog} />;
}