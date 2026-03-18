import { useParams } from "react-router-dom";

import { blogs } from "../data/BlogsData.js";
import FullBlogPageTemplate from "./FullBlogPageTemplate.js";

export default function BlogDetailsPage() {

  const { slug } = useParams();

  const blog = blogs.find((b) => b.slug === slug);

  return <FullBlogPageTemplate blog={blog} />;
}