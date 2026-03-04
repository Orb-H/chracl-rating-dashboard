"use client";

import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function Header() {
  const { theme, setTheme, systemTheme } = useTheme();

  return (
    <header className="flex h-12 p-2 shrink-0 items-center gap-4 border-b sticky top-0 bg-background z-10">
      <SidebarTrigger className="ml-2" />
      <Separator orientation="vertical" />
      {/* TODO(#9): Add breadcrumb indicating where the user is in the app */}
      <h1 className="text-lg font-semibold mx-2 mr-auto">
        치레동 레이팅 대시보드 β
      </h1>
      <Separator orientation="vertical" />
      <Popover>
        <PopoverTrigger className="mr-2" aria-label="테마 변경" asChild>
          <Button variant="ghost" size="icon">
            <SunMoonIcon className="w-5 h-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-auto p-0">
          <Tabs
            value={theme ?? systemTheme}
            className="w-full"
            onValueChange={(value) => setTheme(value)}
          >
            <TabsList>
              <TabsTrigger
                value="light"
                className="not-data-[state=active]:bg-muted not-data-[state=active]:text-muted-foreground"
                aria-label="라이트 모드"
              >
                <SunIcon className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger
                value="system"
                className="not-data-[state=active]:bg-muted not-data-[state=active]:text-muted-foreground"
                aria-label="시스템 설정"
              >
                <SunMoonIcon className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger
                value="dark"
                className="not-data-[state=active]:bg-muted not-data-[state=active]:text-muted-foreground"
                aria-label="다크 모드"
              >
                <MoonIcon className="w-4 h-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </PopoverContent>
      </Popover>
    </header>
  );
}
