const SITE_URL = "https://tirionindustries.com";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tirion Industries",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.png`,
    description:
      "Tirion Industries builds Archangel, Africa's first multi-domain situational intelligence platform. Real-time fusion of air, maritime, ground, space, and signals data for defense and security forces across Africa and the Middle East.",
    foundingDate: "2024",
    knowsAbout: [
      "Multi-Domain Situational Intelligence",
      "Defense Technology",
      "Airspace Surveillance",
      "Maritime Domain Awareness",
      "Ground Intelligence",
      "Satellite Intelligence",
      "Signals Intelligence (SIGINT)",
      "Cross-Domain Correlation",
      "Anomaly Detection",
      "Geospatial Intelligence (GEOINT)",
      "Entity Tracking and Risk Scoring",
      "C4ISR Systems",
      "African Defense and Security",
      "Sovereign Data Architecture",
      "ITAR-Free Defense Platforms",
    ],
    areaServed: [
      { "@type": "Continent", name: "Africa" },
      { "@type": "Place", name: "Middle East" },
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "SoftwareApplication",
          name: "Archangel",
          applicationCategory: "SecurityApplication",
          operatingSystem: "Web-based",
          description:
            "Real-time multi-domain situational intelligence platform that fuses air, maritime, ground, space, and sensor data into a single operational picture. Built for African defense and security commands.",
          featureList: [
            "Real-time data fusion across 5 intelligence domains",
            "Automated anomaly detection",
            "Cross-domain threat correlation",
            "Entity intelligence with risk scoring",
            "Geospatial operations across 54 nations",
            "Sovereign architecture — no ITAR dependency",
            "24/7 continuous operations",
          ],
        },
      },
    ],
    slogan: "In God We Trust. All Others We Monitor.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tirion Industries",
    alternateName: "Tirion",
    url: SITE_URL,
    description:
      "Africa's sovereign intelligence infrastructure. Home of Archangel, the multi-domain situational intelligence platform.",
    publisher: {
      "@type": "Organization",
      name: "Tirion Industries",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FAQJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Tirion Industries?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tirion Industries is a defense technology company building Africa's first sovereign multi-domain intelligence infrastructure. Their flagship product, Archangel, fuses real-time data across air, maritime, ground, space, and signals domains into a single operational picture for defense and security forces.",
        },
      },
      {
        "@type": "Question",
        name: "What is Archangel?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Archangel is a real-time situational intelligence platform that fuses live air, maritime, ground, space, and sensor data into a single operational picture. It provides automated anomaly detection, cross-domain correlation, entity tracking with risk scoring, and geospatial operations across 54 African nations. It is built with sovereign architecture — no ITAR dependency and no foreign infrastructure control.",
        },
      },
      {
        "@type": "Question",
        name: "What intelligence domains does Archangel cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Archangel covers 5 intelligence domains: Air (aircraft tracking, flight patterns, airspace monitoring), Maritime (vessel tracking, port activity, coastal surveillance), Ground (events, movements, border activity), Space (satellite imagery, thermal, environmental data), and Sensors (signals intelligence, open source intelligence, pattern analysis).",
        },
      },
      {
        "@type": "Question",
        name: "Who does Tirion Industries serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tirion Industries serves three primary audiences: Defense Ministries requiring continental awareness and threat intelligence, Armed Forces needing real-time multi-domain situational awareness at operational scale, and strategic investors backing Africa's first sovereign intelligence infrastructure company in a $52B+ African defense market.",
        },
      },
      {
        "@type": "Question",
        name: "Is Archangel ITAR-dependent?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Archangel is built with sovereign architecture by design. It has no ITAR dependency and no foreign infrastructure control. This is critical for African governments that cannot rely on U.S.-regulated defense platforms due to ITAR export restrictions that block many American defense technology platforms from being deployed in Africa.",
        },
      },
      {
        "@type": "Question",
        name: "What is the African defense market size?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The African defense market exceeds $52 billion. There is no dominant local competitor in the multi-domain intelligence space, and ITAR restrictions block most U.S. platforms from operating freely in the region, creating a significant market opportunity for sovereign solutions like Archangel.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
