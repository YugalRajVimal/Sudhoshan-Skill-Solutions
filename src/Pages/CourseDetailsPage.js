import { useParams } from "react-router-dom";

import CoursePageTemplate from "./CoursePageTemplate";
import { COURSES_DETAILS } from "../data/CourcesData";


export default function CourseDetailsPage() {

  const { slug } = useParams();

  const course = COURSES_DETAILS.find(
    (c) => c.slug === slug
  );

  return <CoursePageTemplate course={course} />;
}