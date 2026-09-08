import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sai Koushik | Software Engineer · AI · Backend · Full Stack",
  description:
    "Software engineer building intelligent, production-grade systems across applied AI, backend, full stack and cloud. Based in Chicago.",
  metadataBase: new URL("https://saikoushik.dev"),
  openGraph: {
    title: "Sai Koushik | Software Engineer",
    description:
      "Engineering intelligence into systems that actually ship. AI · Backend · Full Stack · Cloud.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#090B10",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${plexMono.variable}`}
    >
      <body className="bg-midnight text-ivory font-sans min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
