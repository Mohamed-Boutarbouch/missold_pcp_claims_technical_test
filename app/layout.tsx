import type { Metadata } from "next";
import "./globals.css";
import { poppins, inter, lato } from "./fonts";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Claim Money Back from Mis-sold Car Finance | PCPClaims",
  description: "Get your money back from mis-sold PCP or HP car finance. Trusted by thousands of UK claimants. Free advice from FCA-approved solicitors.",
  openGraph: {
    title: "Claim Money Back from Mis-sold Car Finance | PCPClaims",
    description: "Get your money back from mis-sold PCP or HP car finance. Trusted by thousands of UK claimants.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claim Money Back from Mis-sold Car Finance",
    description: "Trusted UK service to claim mis-sold car finance redress",
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "overflow-x-hidden", poppins.variable, inter.variable, lato.variable)}
    >
      <body className="min-h-full flex flex-col">
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/wallpaper.jpg')" }}
        />
        <div className="fixed inset-0 -z-10 bg-hero-gradient" />

        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
