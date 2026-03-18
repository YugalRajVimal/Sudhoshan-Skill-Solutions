import { useParams } from "react-router-dom";
import ServicePageTemplate from "./ServicePageTemplate";
import { services } from "../data/services";


export default function ServiceDetailsPage() {

  const { slug } = useParams();

  const service = services.find((s) => s.slug === slug);

  return <ServicePageTemplate service={service} />;
}