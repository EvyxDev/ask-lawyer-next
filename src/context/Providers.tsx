import { NextIntlClientProvider, useMessages } from "next-intl";
import type { ReactNode } from "react";
import TanStackProvider from "./QueryProvider";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <TanStackProvider>{children}</TanStackProvider>
    </NextIntlClientProvider>
  );
};

export default Providers;
