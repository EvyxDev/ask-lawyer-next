import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Homelayout({ children }: LayoutProps) {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
