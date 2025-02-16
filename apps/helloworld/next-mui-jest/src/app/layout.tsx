import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DashboardLayout } from "./shared";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// TODO: apply this
const SEOBestPracticeLimits = {
  TITLE: 60,
  DESCRIPTION: 170
} as const;

const TITLE = "Building the Future: Otu's Full-Stack Developer Portfolio"; // 4 over
const DESCRIPTION = "Skilled Full-Stack Developer with expertise in Javascript (Angular, React), Java, & Spring Framework. " +
"I design, develop, & deploy full-stack web applications. My portfolio showcases projects that bridge the gap between user interaction & " +
"server-side logic, ensuring a seamless user experience.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`} style={{maxHeight: "100dvh", overflowY: "hidden"}}>
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </body>
    </html>
  );
}
