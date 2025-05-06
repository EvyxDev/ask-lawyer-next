import About from "@/components/home/About";
import Blogs from "@/components/home/Blogs";
import ContactUs from "@/components/home/ContactUs";
import HeroSection from "@/components/home/HeroSection";
import MobileApplication from "@/components/home/MobileApplication";

export default function Home() {
  return (
    <div className="h-full w-full ">
      <HeroSection />
      <About/>
      <MobileApplication/>
      <Blogs/>
      <ContactUs/>
    </div>
  );
}
