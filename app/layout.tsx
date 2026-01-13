import type { Metadata } from "next";
import "./globals.css";
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
    <html lang="en">
      <body className={`antialiased`}>
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
