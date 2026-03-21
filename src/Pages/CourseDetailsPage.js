import { useParams } from "react-router-dom";
import CoursePageTemplate from "./CoursePageTemplate";

export default function CourseDetailsPage({ allData }) {
  const { slug } = useParams();
  const COURSES_DETAILS = allData?.courses ?? [];
  const course = COURSES_DETAILS.find((c) => c.slug === slug);

  return <CoursePageTemplate course={course} />;
}