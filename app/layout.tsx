import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://chrisjereza.io"),
  title: `${site.name} | Video Producer, Editor & Engineer`,
  description:
    "Chris Jereza is a video producer at The Verge, previously at BuzzFeed. Open for freelance video editing work. Explore selected editorial, branded, and social videos.",
  openGraph: {
    title: `${site.name} | Video Producer, Editor & Engineer`,
    description:
      "Chris Jereza is a video producer at The Verge, previously at BuzzFeed. Open for freelance video editing work. Explore selected editorial, branded, and social videos.",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "Chris Jereza portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Video Producer, Editor & Engineer`,
    description:
      "Chris Jereza is a video producer at The Verge, previously at BuzzFeed. Open for freelance video editing work. Explore selected editorial, branded, and social videos.",
    images: ["/og.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0d0d0d" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0d" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--bg)]">{children}</body>
    </html>
  );
}
