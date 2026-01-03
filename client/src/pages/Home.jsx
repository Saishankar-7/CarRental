import React from 'react'
import Hero from '../components/Hero'
import FeaturedSections from '../components/FeaturedSections'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedSections />
      <Banner />
      <Testimonial />
      <Newsletter />
    </div>
  )
}

export default Home
