export function GET() {
  const content = `# Tirion Industries
> Africa's Sovereign Intelligence Infrastructure

## Company Overview
Tirion Industries is a defense technology company building Africa's first sovereign multi-domain intelligence infrastructure. Headquarters and operations serve defense and security forces across Africa and the Middle East.

## Flagship Product: Archangel
Archangel is a real-time multi-domain situational intelligence platform. It fuses live data from five intelligence domains into a single operational picture.

### Intelligence Domains
- **Air**: Aircraft tracking, flight pattern analysis, airspace anomaly detection, real-time radar correlation
- **Maritime**: Vessel tracking (AIS/non-AIS), port activity monitoring, coastal surveillance, shipping lane analysis
- **Ground**: Ground event monitoring, movement tracking, border activity analysis, infrastructure surveillance
- **Space**: Satellite imagery analysis, thermal detection, environmental monitoring, orbital data integration
- **Sensors (SIGINT)**: Signals intelligence, open source intelligence fusion, communications pattern analysis, electronic warfare detection

### Core Capabilities
1. **Real-Time Data Fusion**: Ingests and correlates data streams across all five domains simultaneously
2. **Automated Anomaly Detection**: Machine learning models detect deviations from established patterns across domains
3. **Cross-Domain Threat Correlation**: Links events across air, sea, ground, space, and signals to identify coordinated activity
4. **Entity Intelligence & Risk Scoring**: Builds entity profiles with behavioral scoring, movement history, and risk assessment
5. **Geospatial Operations**: Full geospatial coverage across 54 African nations with layered intelligence overlays
6. **Sovereign Architecture**: No ITAR dependency. No foreign infrastructure control. Data sovereignty by design.

## Key Differentiators
- **ITAR-Free**: Unlike most Western defense platforms, Archangel has zero dependency on U.S. International Traffic in Arms Regulations, allowing unrestricted deployment across Africa
- **Built for Africa**: Purpose-built for the unique operational environment of the African continent — 54 nations, diverse terrain, vast maritime zones
- **Sovereign by Design**: All data processing and storage under client-nation control. No foreign backdoors or data exfiltration
- **Continental Scale**: Designed to operate across the world's second-largest continent with real-time performance

## Market
- African defense market exceeds $52 billion
- No dominant local competitor in multi-domain intelligence
- ITAR restrictions block most U.S. platforms from Africa
- Growing demand for indigenous defense technology solutions

## Audiences
- **Defense Ministries**: Continental awareness, strategic threat intelligence, policy-grade situational data
- **Armed Forces**: Real-time multi-domain operational awareness at tactical and strategic scale
- **Strategic Investors**: First-mover opportunity in Africa's sovereign intelligence infrastructure sector

## Contact
Website: https://tirionindustries.com
Email: contact@tirionindustries.com

## Slogan
In God We Trust. All Others We Monitor.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
