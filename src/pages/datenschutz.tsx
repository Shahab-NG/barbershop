import React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout/Layout"

const sections = [
  {
    title: "1. Datenschutz auf einen Blick",
    sub: "Allgemeine Hinweise",
    content: [
      "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.",
    ],
  },
  {
    title: "Datenerfassung auf dieser Website",
    sub: "Wer ist verantwortlich für die Datenerfassung auf dieser Website?",
    content: [
      "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.",
    ],
  },
  {
    title: "Wie erfassen wir Ihre Daten?",
    content: [
      "Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.",
      "Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.",
    ],
  },
  {
    title: "Wofür nutzen wir Ihre Daten?",
    content: [
      "Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.",
    ],
  },
  {
    title: "Welche Rechte haben Sie bezüglich Ihrer Daten?",
    content: [
      "Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
      "Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.",
      "Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.",
    ],
  },
  {
    title: "2. Hosting",
    content: [
      "Wir hosten die Inhalte unserer Website bei folgendem Anbieter: Externes Hosting. Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.",
    ],
  },
  {
    title: "3. Allgemeine Hinweise und Pflichtinformationen",
    sub: "Datenschutz",
    content: [
      "Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.",
      "Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.",
    ],
  },
  {
    title: "Hinweis zur verantwortlichen Stelle",
    content: [
      "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:",
      "Amir Barbershop\nMusterstraße 42\n60329 Frankfurt am Main\nTelefon: +49 150 1234 5678\nE-Mail: info@amir-barbershop.de",
    ],
  },
  {
    title: "Speicherdauer",
    content: [
      "Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.",
    ],
  },
  {
    title: "4. Datenerfassung auf dieser Website",
    sub: "Server-Log-Dateien",
    content: [
      "Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:",
      "• Browsertyp und Browserversion\n• Verwendetes Betriebssystem\n• Referrer URL\n• Hostname des zugreifenden Rechners\n• Uhrzeit der Serveranfrage\n• IP-Adresse",
      "Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.",
      "Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.",
    ],
  },
  {
    title: "5. Soziale Medien",
    sub: "Instagram, TikTok & Facebook",
    content: [
      "Auf dieser Website sind Links zu unseren Social-Media-Präsenzen eingebunden. Wenn Sie auf diese Links klicken, werden Sie auf die jeweiligen Plattformen weitergeleitet. Die Datenschutzerklärungen der jeweiligen Anbieter gelten dort.",
      "Die Nutzung dieser Dienste erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an einer möglichst sichtbaren Präsenz in den sozialen Medien.",
    ],
  },
]

const DatenschutzPage: React.FC<PageProps> = () => (
  <Layout>
    <section className="relative min-h-screen pt-40 pb-32 bg-[#050505]">
      {/* Ambient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/15 to-transparent" />
      <div className="absolute top-1/3 -right-60 w-[500px] h-[500px] rounded-full bg-[#c9a227] opacity-[0.02] blur-[140px] pointer-events-none" />

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
            Datenschutz&shy;erklärung
          </h1>
          <p className="text-white/30 text-sm mt-3">
            Zuletzt aktualisiert: Januar 2025
          </p>
          <div className="w-10 h-px bg-[#00d4ff]/40 mt-6" />
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((sec, idx) => (
            <div key={idx}>
              <h2 className="text-white font-medium text-sm tracking-wider uppercase mb-2 pb-3 border-b border-white/[0.06]">
                {sec.title}
              </h2>
              {sec.sub && (
                <p className="text-[#00d4ff] text-[0.65rem] tracking-[0.3em] uppercase mb-3 mt-4">
                  {sec.sub}
                </p>
              )}
              <div className="space-y-3 mt-4">
                {sec.content.map((line, i) => (
                  <p
                    key={i}
                    className="text-white/45 text-sm leading-relaxed whitespace-pre-line"
                  >
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
    <title>Datenschutz | Amir Barbershop Frankfurt</title>
    <meta name="robots" content="noindex, nofollow" />
    <meta name="theme-color" content="#0a0a0a" />
  </>
)

export default DatenschutzPage
