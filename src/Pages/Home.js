import React from 'react'
import HeroSection from '../Components/HeroSection'
import ServicesSection from '../Components/OurServices'
import JobSearchSection from '../Components/JobSearchSection'
import TestimonialSection from '../Components/TestimonialsSection'
import PlacementPartners from '../Components/PlacementPartners'

const Home = () => {
  return (
    <div>
        <HeroSection />
        <ServicesSection />
        <JobSearchSection />
        <PlacementPartners />   
        <TestimonialSection />
    </div>
  )
}

export default Home