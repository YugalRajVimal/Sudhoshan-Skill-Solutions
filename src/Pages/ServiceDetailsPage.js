import { useParams } from "react-router-dom";
import ServicePageTemplate from "./ServicePageTemplate";

export default function ServiceDetailsPage({ allData,setOpen }) {
  const { slug } = useParams();
  const services = allData?.services ?? [];
  const service = services.find((s) => s.slug === slug);

  return <ServicePageTemplate service={service} setOpen={setOpen} />;
}