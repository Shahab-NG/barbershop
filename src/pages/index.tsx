import React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout/Layout"
import HeroSection from "../components/sections/HeroSection"
import ServicesSection from "../components/sections/ServicesSection"
import TransformationSection from "../components/sections/TransformationSection"
import AboutSection from "../components/sections/AboutSection"
import GallerySection from "../components/sections/GallerySection"
import ExpertiseSection from "../components/sections/ExpertiseSection"
import ReviewsSection from "../components/sections/ReviewsSection"
import BookingSection from "../components/sections/BookingSection"
import ContactSection from "../components/sections/ContactSection"

const IndexPage: React.FC<PageProps> = () => (
  <Layout>
    <HeroSection />
    <ServicesSection />
    {/* <TransformationSection /> */}
    <AboutSection />
    <GallerySection />
    <ExpertiseSection />
    <ReviewsSection />
    <BookingSection />
    <ContactSection />
  </Layout>
)

export const Head: HeadFC = () => (
  <>
    <title>Amir Barbershop | Premium Herrenfriseur Frankfurt</title>
    <meta
      name="description"
      content="Amir Barbershop – Premium Herrenfriseur in Frankfurt. Modernste Barberkunst, Skin Fades, Bartpflege und luxuriöses Grooming-Erlebnis für den anspruchsvollen Mann."
    />
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content="Amir Barbershop | Premium Herrenfriseur Frankfurt" />
    <meta
      property="og:description"
      content="Premium Herrenfriseur in Frankfurt. Modernste Barberkunst, luxuriöse Atmosphäre und erstklassige Pflege."
    />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="de_DE" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="theme-color" content="#0a0a0a" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
  </>
)

export default IndexPage
