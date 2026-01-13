import type { Metadata } from "next";
import { Nanum_Gothic_Coding } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { MySidebar } from "@/components/MySidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const paperlogy = localFont({
  src: [
    {
      path: "../public/fonts/Paperlogy-1Thin.woff2",
      weight: "100",
    },
    {
      path: "../public/fonts/Paperlogy-2ExtraLight.woff2",
      weight: "200",
    },
    {
      path: "../public/fonts/Paperlogy-3Light.woff2",
      weight: "300",
    },
    {
      path: "../public/fonts/Paperlogy-4Regular.woff2",
      weight: "400",
    },
    {
      path: "../public/fonts/Paperlogy-5Medium.woff2",
      weight: "500",
    },
    {
      path: "../public/fonts/Paperlogy-6SemiBold.woff2",
      weight: "600",
    },
    {
      path: "../public/fonts/Paperlogy-7Bold.woff2",
      weight: "700",
    },
    {
      path: "../public/fonts/Paperlogy-8ExtraBold.woff2",
      weight: "800",
    },
    {
      path: "../public/fonts/Paperlogy-9Black.woff2",
      weight: "900",
    },
  ],
  variable: "--font-paperlogy",
});

const nanumGothicCoding = Nanum_Gothic_Coding({
  variable: "--font-nanum-gothic-coding",
  subsets: ["latin"],
  weight: ["400", "700"],
});

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
    <html lang="en">
      <body
        className={`${paperlogy.variable} ${nanumGothicCoding.variable} antialiased`}
      >
        <SidebarProvider>
          <MySidebar />
          <SidebarInset>
            <Header />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
