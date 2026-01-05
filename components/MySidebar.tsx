"use client";

import {
  BookTextIcon,
  BrainIcon,
  ChartLineIcon,
  ChevronRightIcon,
  ClapperboardIcon,
  GithubIcon,
  GlobeIcon,
  HistoryIcon,
  HomeIcon,
  PresentationIcon,
  ScrollTextIcon,
  TrophyIcon,
  UsersIcon,
  VideoIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!href || !pathname) return false;
    return pathname === href;
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuItem className="px-4 py-3 text-lg font-semibold">
          {/* TODO(#9): Add custom icon if possible. */}
          <ChartLineIcon className="inline" />{" "}
          <span>치레동 레이팅 대시보드</span>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>메인</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/")}>
                  <Link href="/">
                    <HomeIcon className="inline" /> <span>메인 페이지</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <TrophyIcon className="inline" />{" "}
                    <span>레이팅 리더보드 (준비중)</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                {/* TODO(#9): Add collapsible to show players */}
                <SidebarMenuButton asChild isActive={isActive("/participants")}>
                  {/* TODO(#10): Enable link to the real page when ready */}
                  <Link href="#">
                    <UsersIcon className="inline" />{" "}
                    <span>참가자 목록 (준비중)</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                {/* TODO(#9): Add collapsible to show competitions */}
                <SidebarMenuButton asChild isActive={isActive("/competitions")}>
                  {/* TODO(#14): Enable link to the real page when ready */}
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
                <SidebarMenuButton asChild isActive={isActive("/rating-intro")}>
                  {/* TODO(#13): Enable link to the real page when ready */}
                  <Link href="#">
                    <BookTextIcon className="inline" />{" "}
                    <span>레이팅 시스템 소개 (준비중)</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <BrainIcon className="inline" />{" "}
                    <span>가상 대결 예측 (준비중)</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <ScrollTextIcon className="inline" />{" "}
                    <span>업데이트 내역 (준비중)</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>외부 링크</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="https://chzzk.naver.com/live/2cc562e9370970d567c1a25c5c7d0e77">
                    <VideoIcon className="inline" /> <span>치레동 생중계</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <DropdownMenu>
                <SidebarMenuItem>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="w-full">
                      <ClapperboardIcon className="inline" />{" "}
                      <span>치레동 다시보기</span>
                      <ChevronRightIcon className="inline ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" className="rounded-lg">
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link href="https://chzzk.naver.com/video/6994458">
                            제 1회: 고속도로 배틀
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link href="https://chzzk.naver.com/video/8108679">
                            제 2회: 포뮬러 그랑프리
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link href="https://chzzk.naver.com/video/10393351">
                            제 3회: 레인 헬
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </DropdownMenuContent>
                </SidebarMenuItem>
              </DropdownMenu>
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
