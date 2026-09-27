import { About } from './components/about/About'
import { Contact } from './components/contact/Contact'
import { Events } from './components/events/Events'
import { Footer } from './components/footer/Footer'
import { Gallery } from './components/gallery/Gallery'
import { Header } from './components/header/Header'
import { Hero } from './components/hero/Hero'
import { Ministries } from './components/ministries/Ministries'
import { Schedule } from './components/schedule/Schedule'
import { Warta } from './components/warta/Warta'
import { useContent } from './hooks/useContent'
import { useScrollReveal } from './hooks/usePageEffects'

export default function App() {
  const { content } = useContent()
  useScrollReveal(content)

  return (
    <>
      <a className="skip-link" href="#konten">
        Langsung ke konten
      </a>
      <Header name={content.site.name} />
      <main id="konten">
        <Hero site={content.site} schedules={content.schedules} />
        <About site={content.site} />
        <Schedule schedules={content.schedules} />
        <Warta announcements={content.announcements} />
        <Ministries ministries={content.ministries} />
        <Events events={content.events} />
        <Gallery items={content.gallery} />
        <Contact site={content.site} />
      </main>
      <Footer site={content.site} />
    </>
  )
}
