"use client";

import {
  BookTextIcon,
  BrainIcon,
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
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { Update } from "@/types/update";

export function MySidebar({ updates }: { updates: Update[] }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!href || !pathname) return false;
    return pathname === href;
  };

  const sidebar = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuItem className="px-4 py-3 text-lg font-semibold">
          <Image
            src="/favicon.svg"
            alt=""
            width={24}
            height={24}
            className="scheme-only-light inline align-center"
          />{" "}
          <span>치레동 레이팅 대시보드 β</span>
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
                <SidebarMenuButton asChild isActive={isActive("/leaderboard")}>
                  <Link href="/leaderboard">
                    <TrophyIcon className="inline" />{" "}
                    <span>레이팅 리더보드</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                {/* TODO(#9): Add collapsible to show players */}
                <SidebarMenuButton asChild isActive={isActive("/players")}>
                  <Link href="/players">
                    <UsersIcon className="inline" /> <span>선수 목록</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                {/* TODO(#9): Add collapsible to show competitions */}
                <SidebarMenuButton asChild isActive={isActive("/competitions")}>
                  <Link href="/competitions">
                    <HistoryIcon className="inline" /> <span>대회 목록</span>
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
                  <Link href="/rating-intro">
                    <BookTextIcon className="inline" />{" "}
                    <span>레이팅 시스템 소개</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  {/* TODO(#210): Add link to prediction page. */}
                  <Link href="#">
                    <BrainIcon className="inline" />{" "}
                    <span>승부 예측 (준비중)</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Sheet>
                  <SheetTrigger asChild>
                    <SidebarMenuButton className="hover:cursor-pointer">
                      <ScrollTextIcon className="inline" />{" "}
                      <span>업데이트 내역 (준비중)</span>
                    </SidebarMenuButton>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>업데이트 내역</SheetTitle>
                      <SheetDescription>
                        업데이트 날짜는 배포 날짜가 아닌 깃허브에 기능이 추가된
                        날짜를 기준으로 합니다. 따라서 실제로 페이지가 배포되지
                        않은 날짜에 개발이 완료되었다고 표시된 기능이 있을 수
                        있습니다.
                      </SheetDescription>
                    </SheetHeader>
                    {/* TODO(#216): Add real update content in updates.json */}
                    {updates
                      .sort(
                        (a, b) =>
                          new Date(b.date).getTime() -
                          new Date(a.date).getTime(),
                      )
                      .map((update) => (
                        <div key={update.date} className="px-4">
                          <Separator className="my-4" />
                          <h3 className="font-semibold mb-4">{update.date}</h3>
                          <ul className="text-sm list-disc list-inside">
                            {update.content.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </SheetContent>
                </Sheet>
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
              <SidebarMenuItem>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="w-full">
                      <ClapperboardIcon className="inline" />{" "}
                      <span>치레동 다시보기</span>
                      <ChevronRightIcon className="inline ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side={sidebar.isMobile ? "bottom" : "right"}
                    align={sidebar.isMobile ? "end" : "center"}
                    className="rounded-lg"
                  >
                    <DropdownMenuItem>
                      <Link href="https://chzzk.naver.com/video/6994458">
                        제 1회: 고속도로 배틀
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="https://chzzk.naver.com/video/7992247">
                        제 2회: 포뮬러 그랑프리 (예선)
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="https://chzzk.naver.com/video/8108679">
                        제 2회: 포뮬러 그랑프리 (본선)
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="https://chzzk.naver.com/video/10292130">
                        제 3회: 레인 헬 (예선)
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="https://chzzk.naver.com/video/10393351">
                        제 3회: 레인 헬 (본선)
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="https://chzzk.naver.com/video/12049352">
                        제 4회: 포뮬러 챔피언쉽 (예선)
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="https://chzzk.naver.com/video/12110859">
                        제 4회: 포뮬러 챔피언쉽 (본선 1일차)
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="https://chzzk.naver.com/video/12128240">
                        제 4회: 포뮬러 챔피언쉽 (본선 2일차)
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
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
