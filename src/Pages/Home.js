import React from 'react'
import HeroSection from '../Components/HeroSection'
import ServicesSection from '../Components/OurServices'
import JobSearchSection from '../Components/JobSearchSection'
import TestimonialSection from '../Components/TestimonialsSection'
import PlacementPartners from '../Components/PlacementPartners'
import { Leadership } from '../Components/AboutPage/LeadershipSection'
import HomeBlogsSection from '../Components/AboutPage/BlogComp'

const Home = () => {
  return (
    <div>
        <HeroSection />
        <ServicesSection />
        <JobSearchSection />
        <PlacementPartners />   
        <TestimonialSection />
        <Leadership />
    </div>
  )
}

export default Home