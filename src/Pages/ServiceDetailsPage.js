import { useParams } from "react-router-dom";
import ServicePageTemplate from "./ServicePageTemplate";

export default function ServiceDetailsPage({ allData, setOpen }) {
  const { slug } = useParams();

  // No fallback services, only use provided data
  const services = allData?.services || [];

  // try to find with and without leading slash
  const service =
    services.find(
      (s) =>
        s.slug === slug ||
        s.slug === "/" + slug ||
        s.slug === slug.replace(/^\//, "")
    ) || null;

  return <ServicePageTemplate service={service} setOpen={setOpen} />;
}