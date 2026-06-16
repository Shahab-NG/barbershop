import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Amir Barbershop | Premium Herrenfriseur",
    titleTemplate: "%s | Amir Barbershop",
    description:
      "Premium Herrenfriseur und Barbershop. Modernste Barberkunst, luxuriöse Atmosphäre und erstklassige Pflege für den anspruchsvollen Mann.",
    siteUrl: "https://amir-barbershop.de",
    image: "/og-image.jpg",
  },
  plugins: [
    "gatsby-plugin-postcss",
  ],
}

export default config
