import About from "@/components/home/About";
import Blogs from "@/components/home/Blogs";
import ContactUs from "@/components/home/ContactUs";
import HeroSection from "@/components/home/HeroSection";
import MobileApplication from "@/components/home/MobileApplication";
type PageProps = {
  params: Promise<{ locale: string }>;
};
export default async function Home({ params }: PageProps) {
  const { locale } = await params; 
  return (
    <div className="h-full w-full ">
      <HeroSection />
      <About params={{ locale }} /> 
      <MobileApplication />
      <Blogs />
      <ContactUs />
    </div>
  );
}
