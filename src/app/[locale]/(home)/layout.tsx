import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Homelayout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <Toaster />
      {children}
      <Footer />
    </>
  );
}
