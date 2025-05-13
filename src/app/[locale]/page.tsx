import About from "@/components/home/About";
import Blogs from "@/components/home/Blogs";
import ContactUs from "@/components/home/ContactUs";
import HeroSection from "@/components/home/HeroSection";
import MobileApplication from "@/components/home/MobileApplication";
interface Params {
  locale: string;
}
export default function Home({ params }: { params: Params }) {
  return (
    <div className="h-full w-full ">
      <HeroSection />
      <About params={params}/>
      <MobileApplication/>
      <Blogs/>
      <ContactUs/>
    </div>
  );
}
