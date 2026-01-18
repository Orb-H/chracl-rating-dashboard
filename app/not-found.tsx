"use client";

import { HomeIcon, MailIcon, Undo2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center justify-start py-16 px-8 md:py-32 md:px-16 bg-background md:items-start">
      <header className="mb-8 w-full">
        <h1 className="text-4xl font-bold">페이지를 찾을 수 없습니다</h1>
      </header>
      <p className="mt-2 text-lg text-muted-foreground">
        요청하신 페이지가 존재하지 않거나, 삭제되었거나, 이동되었을 수 있습니다.
        URL을 다시 한 번 확인해 주세요. 혹시라도 있어야 하는 페이지인데 존재하지
        않는다면, 현재 주소와 함께 제작자에게 메일을 보내주세요.
      </p>
      <div className="flex flex-col md:flex-row my-10">
        <Button className="mx-2 my-2" onClick={() => router.back()}>
          <Undo2Icon /> 이전 페이지로 돌아가기
        </Button>
        <Button variant="secondary" className="mx-2 my-2" asChild>
          <Link href="/">
            <HomeIcon />
            홈으로 돌아가기
          </Link>
        </Button>
        <Button variant="ghost" className="mx-2 my-2" asChild>
          <Link href="mailto:orbithv@orbithv.dev">
            <MailIcon /> 제작자에게 메일 보내기
          </Link>
        </Button>
      </div>
    </main>
  );
}
