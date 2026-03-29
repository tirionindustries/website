import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Product from "@/components/Product";
import Capabilities from "@/components/Capabilities";
import Domains from "@/components/Domains";
import Audience from "@/components/Audience";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Ticker />
      <Product />
      <Capabilities />
      <Domains />
      <Audience />
      <CtaSection />
      <Footer />
    </>
  );
}
