import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/layout/TopNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { KeyboardShortcutHelper } from "@/components/layout/KeyboardShortcutHelper";
import { ClientLayoutWrapper } from "@/components/layout/ClientLayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SAMA LINK | Operational Intelligence Center",
  description: "Enterprise Grade AI Emergency Operations & Intelligence Platform. Powered by Gemini.",
  applicationName: "SAMA LINK",
  authors: [{ name: "SAMA Systems" }],
  generator: "Next.js",
  keywords: ["Emergency Operations", "AI", "Intelligence", "Dispatch", "SAMA"],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "SAMA LINK | Operational Intelligence Center",
    description: "Enterprise Grade AI Emergency Operations & Intelligence Platform. Powered by Gemini.",
    type: "website",
    siteName: "SAMA LINK",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
      <body className="min-h-full flex flex-col relative text-slate-900 dark:text-slate-50 overflow-x-hidden">
        <AnimatedBackground />
        <KeyboardShortcutHelper />
        <Sidebar />
        <TopNav />
        <ClientLayoutWrapper>
          <main className="flex-1 min-h-screen pt-16">
            {children}
          </main>
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
