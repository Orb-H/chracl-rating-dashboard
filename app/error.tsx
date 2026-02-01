"use client";

import { HomeIcon, MailIcon, Undo2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center justify-start py-16 px-8 md:py-32 md:px-16 bg-background md:items-start">
      <header className="mb-8 w-full">
        <h1 className="text-4xl font-bold">알 수 없는 오류가 발생했습니다.</h1>
      </header>
      <p className="mt-2 text-lg text-muted-foreground">
        요청하신 페이지를 불러오는 도중 오류가 발생했습니다. 혹시라도 있어야
        하는 페이지인데 오류가 발생했다면, 현재 주소와 함께 제작자에게 메일을
        보내주세요.
      </p>
      <div className="flex flex-col md:flex-row my-10 gap-2">
        <Button onClick={() => router.back()}>
          <Undo2Icon /> 이전 페이지로 돌아가기
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/">
            <HomeIcon />
            홈으로 돌아가기
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="mailto:orbithv@orbithv.dev">
            <MailIcon /> 제작자에게 메일 보내기
          </Link>
        </Button>
      </div>
    </main>
  );
}
