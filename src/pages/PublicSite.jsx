import Navbar from '../components/Navbar'
import Hero from '../sections/Hero'
import StatsBar from '../sections/StatsBar'
import About from '../sections/About'
import Packages from '../sections/Packages'
import ALaCarte from '../sections/ALaCarte'
import Ceramic from '../sections/Ceramic'
import Interior from '../sections/Interior'
import DetailShopBanner from '../sections/DetailShopBanner'
import Gallery from '../sections/Gallery'
import Testimonials from '../sections/Testimonials'
import FinalCta from '../sections/FinalCta'
import ContactForm from '../sections/ContactForm'
import Footer from '../components/Footer'

export default function PublicSite() {
  return (
    <div className="min-h-screen bg-white text-ink selection:bg-brand selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Packages />
        <ALaCarte />
        <Ceramic />
        <Interior />
        <DetailShopBanner />
        <Gallery />
        <Testimonials />
        <FinalCta />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
