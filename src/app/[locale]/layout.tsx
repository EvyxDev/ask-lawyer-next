import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Tajawal } from "next/font/google"; 
import NavBar from "@/components/NavBar";
import Providers from "@/context/Providers";
import Footer from "@/components/Footer";

const tajawal = Tajawal({
  subsets: ["arabic"], 
  weight: ["400", "700"], 
  variable: "--font-tajawal", 
});

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("meta-title"),
    description: t("meta-description"),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={tajawal.className}
    >
      <body>
        <Providers>
          <NavBar />
          {children}
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
