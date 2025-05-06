import Image from "next/image";
import { authbg } from "../../../../public/assets";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function LocaleLayout({ children }: LayoutProps) {
  return (
    <div className="relative grid grid-cols-12 w-full h-full min-h-screen justify-center items-center">
      {/* Main content */}
      <main className="col-span-12 lg:col-span-6 w-full z-50 mx-auto container p-4">{children}</main>
      
      {/* Image on the right */}
      <div className="hidden lg:block col-span-6 relative h-full overflow-hidden rtl:transform rtl:scale-x-[-1]">
        <Image
          alt="lawyer background"
          className="object-cover"
          src={authbg}
          fill
          sizes="50vw"
          priority
        />
      </div>
    </div>
  );
}