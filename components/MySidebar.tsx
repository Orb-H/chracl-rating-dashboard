"use client";

import {
  BookTextIcon,
  BrainIcon,
  GithubIcon,
  GlobeIcon,
  HistoryIcon,
  HomeIcon,
  PresentationIcon,
  ScrollTextIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function MySidebar() {
  const pathname = usePathname() ?? undefined;

  const isActive = (href: string) => {
    if (!href || !pathname) return false;
    return pathname === href;
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/")}>
              <Link href="/">
                {/* TODO(#9): Add custom icon if possible. */}
                <HomeIcon className="inline" />{" "}
                <span>치레동 레이팅 대시보드</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>메인</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("#")}>
                  <Link href="#">
                    <TrophyIcon className="inline" />{" "}
                    <span>리더보드 (준비중)</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                {/* TODO(#9): Add collapsible to show players */}
                <SidebarMenuButton asChild isActive={isActive("#")}>
                  <Link href="#">
                    <UsersIcon className="inline" />{" "}
                    <span>참가자 목록 (준비중)</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                {/* TODO(#9): Add collapsible to show competitions */}
                <SidebarMenuButton asChild isActive={isActive("#")}>
                  <Link href="#">
                    <HistoryIcon className="inline" />{" "}
                    <span>대회 목록 (준비중)</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>기타</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("#")}>
                  <Link href="#">
                    <BookTextIcon className="inline" />{" "}
                    <span>레이팅 시스템 소개 (준비중)</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("#")}>
                  <Link href="#">
                    <BrainIcon className="inline" />{" "}
                    <span>레이팅 기반 예측 (준비중)</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("#")}>
                  <Link href="#">
                    <ScrollTextIcon className="inline" />{" "}
                    <span>업데이트 로그 (준비중)</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          {/* TODO(#9): Add links to the replays of past competitions, as a collapsible item */}
          {/* TODO(#9): Add a link to live Chzzk channel for live competition */}
          <SidebarGroupLabel>외부 링크</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="https://github.com/Orb-H/chracl-rating-dashboard">
                    <GithubIcon className="inline" /> <span>깃허브</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="https://namu.wiki/w/%EC%B9%98%EB%A0%88%EB%8F%99">
                    <GlobeIcon className="inline" />{" "}
                    <span>치레동 나무위키</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="https://www.chzzk-racing.club/">
                    <PresentationIcon className="inline" />{" "}
                    <span>치레보드</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
