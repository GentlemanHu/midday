import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import type { ReactNode } from "react";
import { Provider } from "./provider";

export default function Layout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactNode;
}) {
  return (
    <Provider locale={locale}>
      <Header />
      <main className="container mx-auto">{children}</main>
      <Footer />
    </Provider>
  );
}
