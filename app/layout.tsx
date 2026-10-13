import type { Metadata } from "next";
import { IBM_Plex_Sans, Instrument_Serif, Poppins } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  applicationName: "Portfolio OS",
  title: "Portfolio OS — Jinwh",
  description: "A one-person design studio — brand identity, digital product design, and AI-assisted development, end to end.",
  metadataBase: new URL("https://os.jinwh.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Portfolio OS — Jinwh",
    description: "A one-person design studio — brand identity, digital product design, and AI-assisted development, end to end.",
    url: "https://os.jinwh.com/",
    siteName: "Portfolio OS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio OS — Jinwh",
    description: "A one-person design studio — brand identity, digital product design, and AI-assisted development, end to end.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${poppins.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
