import AboutHero from "../Components/AboutPage/AboutHeroSection";
import { AboutCTA } from "../Components/AboutPage/FinalCTASection";
import { Leadership } from "../Components/AboutPage/LeadershipSection";
import { OurImpact } from "../Components/AboutPage/OurImpact";
import { OurMission } from "../Components/AboutPage/OurMission";
import { SuccessStories } from "../Components/AboutPage/SucessStories";
import TestimonialSection from "../Components/TestimonialsSection";

export default function AboutPage() {
    return (
      <>
        <AboutHero/>
        <OurMission />

        <Leadership />

        <AboutCTA />
      </>
    );
  }