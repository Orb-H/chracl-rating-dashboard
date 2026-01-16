"use client";

import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function Header() {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark" | "system">(
    "system",
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentTheme(
      (localStorage.getItem("theme") as "light" | "dark" | "system") ||
        "system",
    );
  }, []);

  return (
    <header className="flex h-12 p-2 shrink-0 items-center gap-4 border-b sticky top-0 bg-background z-10">
      <SidebarTrigger className="ml-2" />
      <Separator orientation="vertical" />
      {/* TODO(#9): Add breadcrumb indicating where the user is in the app */}
      <h1 className="text-lg font-semibold mx-2 mr-auto">
        치레동 레이팅 대시보드
      </h1>
      <Separator orientation="vertical" />
      <Popover>
        <PopoverTrigger className="mr-2">
          <SunMoonIcon className="w-5 h-5" />
        </PopoverTrigger>
        <PopoverContent align="end" className="w-auto p-0">
          <Tabs defaultValue={currentTheme} className="w-full">
            <TabsList className="bg-transparent border-0 p-1">
              <TabsTrigger
                value="light"
                className="not-data-[state=active]:bg-muted not-data-[state=active]:text-muted-foreground"
                onClick={() => {
                  setCurrentTheme("light");
                  localStorage.setItem("theme", "light");
                  document.documentElement.classList.remove("dark");
                }}
              >
                <SunIcon className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger
                value="system"
                className="not-data-[state=active]:bg-muted not-data-[state=active]:text-muted-foreground"
                onClick={() => {
                  setCurrentTheme("system");
                  localStorage.removeItem("theme");
                  if (
                    window.matchMedia("(prefers-color-scheme: dark)").matches
                  ) {
                    document.documentElement.classList.add("dark");
                  } else {
                    document.documentElement.classList.remove("dark");
                  }
                }}
              >
                <SunMoonIcon className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger
                value="dark"
                className="not-data-[state=active]:bg-muted not-data-[state=active]:text-muted-foreground"
                onClick={() => {
                  setCurrentTheme("dark");
                  localStorage.setItem("theme", "dark");
                  document.documentElement.classList.add("dark");
                }}
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
