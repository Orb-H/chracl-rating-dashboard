import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/Header";
import { MySidebar } from "@/components/MySidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "치레동 레이팅 대시보드",
  description: "치레동 참가자들의 실력을 숫자로 확인하세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The theme provider mutates document.documentElement.classList
    // before React hydration, which can cause an intentional mismatch on <html>.
    // Keep suppressHydrationWarning on <html> to ignore this specific mismatch.
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider defaultTheme="system" enableSystem attribute="class">
          <SidebarProvider>
            <MySidebar />
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
