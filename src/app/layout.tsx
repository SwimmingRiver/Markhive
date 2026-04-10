import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import Providers from "@/components/providers";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Markhive",
  description: "Markhive는 북마크 관리를 위한 플랫폼입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.variable} ${dmSans.variable} antialiased`}
      >
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
