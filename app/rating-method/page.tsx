import { DownloadIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PDF_PATH = "/papers/rating-method.pdf";

export const metadata: Metadata = {
  title: "치레동 레이팅 방법론 | 치레동 레이팅 대시보드 β",
  description:
    "TrueSkill 기반 개인·팀 혼합 평가 방법을 기술한 기술 노트 (PDF).",
};

export default function RatingMethod() {
  return (
    <main className="flex flex-col gap-4 min-h-screen w-full max-w-5xl mx-auto py-10 px-4 md:py-16 md:px-8 bg-background">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-3xl font-extrabold">📄 레이팅 방법론</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            치레동 레이팅의 계산 방법을 정리한 기술 노트입니다. 쉬운 설명은{" "}
            <Link href="/rating-intro" className="text-primary underline">
              간략 소개
            </Link>
            를 참고하세요.
          </p>
        </div>
        <Button asChild variant="outline">
          <a href={PDF_PATH} download="chracl-rating-method.pdf">
            <DownloadIcon /> PDF 다운로드
          </a>
        </Button>
      </div>
      <iframe
        src={`${PDF_PATH}#view=FitH`}
        title="치레동 레이팅 방법론 (PDF)"
        className="w-full h-[85vh] min-h-[480px] rounded-md border bg-muted"
      />
      <p className="text-xs text-muted-foreground">
        PDF가 보이지 않으면{" "}
        <a href={PDF_PATH} className="text-primary underline">
          새 탭에서 열기
        </a>
        를 이용해 주세요. 정식 논문이 아니며 동료 심사를 거치지 않았습니다.
      </p>
    </main>
  );
}
