import React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout/Layout"

const sections = [
  {
    title: "Angaben gemäß § 5 TMG",
    content: [
      "Amir Barbershop",
      "Musterstraße 42",
      "60329 Frankfurt am Main",
      "Deutschland",
    ],
  },
  {
    title: "Kontakt",
    content: [
      "Telefon: +49 150 1234 5678",
      "E-Mail: info@amir-barbershop.de",
    ],
  },
  {
    title: "Umsatzsteuer-ID",
    content: [
      "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:",
      "DE 123 456 789",
    ],
  },
  {
    title: "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV",
    content: [
      "Amir Mustermann",
      "Musterstraße 42",
      "60329 Frankfurt am Main",
    ],
  },
  {
    title: "Streitschlichtung",
    content: [
      "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/.",
      "Unsere E-Mail-Adresse finden Sie oben im Impressum.",
      "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    ],
  },
  {
    title: "Haftung für Inhalte",
    content: [
      "Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
      "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
    ],
  },
  {
    title: "Haftung für Links",
    content: [
      "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.",
      "Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
    ],
  },
  {
    title: "Urheberrecht",
    content: [
      "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.",
      "Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.",
    ],
  },
]

const ImpressumPage: React.FC<PageProps> = () => (
  <Layout>
    <section className="relative min-h-screen pt-40 pb-32 bg-[#050505]">
      {/* Ambient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/15 to-transparent" />
      <div className="absolute top-1/3 -left-60 w-[500px] h-[500px] rounded-full bg-[#00d4ff] opacity-[0.02] blur-[140px] pointer-events-none" />

      <div className="container-luxury max-w-3xl">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[#00d4ff] text-[0.65rem] tracking-[0.55em] uppercase mb-5">
            Rechtliches
          </p>
          <h1
            className="font-display font-light text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Impressum
          </h1>
          <div className="w-10 h-px bg-[#00d4ff]/40 mt-6" />
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map(sec => (
            <div key={sec.title}>
              <h2 className="text-white font-medium text-sm tracking-wider uppercase mb-4 pb-3 border-b border-white/[0.06]">
                {sec.title}
              </h2>
              <div className="space-y-2">
                {sec.content.map((line, i) => (
                  <p key={i} className="text-white/45 text-sm leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-20">
          <a
            href="/"
            className="inline-flex items-center gap-4 text-[0.7rem] tracking-[0.3em] uppercase text-white/30 hover:text-[#00d4ff] transition-colors duration-300 group"
          >
            <span className="w-8 h-px bg-white/20 group-hover:bg-[#00d4ff] group-hover:w-12 transition-all duration-300" />
            Zurück zur Startseite
          </a>
        </div>
      </div>
    </section>
  </Layout>
)

export const Head: HeadFC = () => (
  <>
    <title>Impressum | Amir Barbershop Frankfurt</title>
    <meta name="robots" content="noindex, nofollow" />
    <meta name="theme-color" content="#0a0a0a" />
  </>
)

export default ImpressumPage
