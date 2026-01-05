"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="flex h-12 p-2 shrink-0 items-center gap-4 border-b">
      <SidebarTrigger className="ml-2" />
      <Separator orientation="vertical" />
      {/* TODO(#9): Add breadcrumb indicating where the user is in the app */}
      <h1 className="text-lg font-semibold mx-2">치레동 레이팅 대시보드</h1>
    </header>
  );
}
