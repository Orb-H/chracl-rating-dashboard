import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/Header";
import { MySidebar } from "@/components/MySidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { loadUpdates } from "@/lib/loadUpdates";

const paperlogy = localFont({
  src: [
    {
      path: "../fonts/paperlogy/Paperlogy-4Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/paperlogy/Paperlogy-5Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/paperlogy/Paperlogy-6SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/paperlogy/Paperlogy-7Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/paperlogy/Paperlogy-8ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-paperlogy",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "치레동 레이팅 대시보드 β",
  description: "치레동 참가자들의 실력을 숫자로 확인하세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const updates = loadUpdates();

  return (
    // The theme provider mutates document.documentElement.classList
    // before React hydration, which can cause an intentional mismatch on <html>.
    // Keep suppressHydrationWarning on <html> to ignore this specific mismatch.
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${paperlogy.variable} ${paperlogy.className} antialiased`}
      >
        <ThemeProvider defaultTheme="system" enableSystem attribute="class">
          <SidebarProvider>
            <MySidebar updates={updates} />
            <SidebarInset>
              <Header />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" &&
          process.env.NEXT_PUBLIC_GA_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ""} />
          )}
      </body>
    </html>
  );
}
