import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { loadCompetitionsById } from "@/lib/loadCompetitions";

export default function Participants() {
  const competitions = loadCompetitionsById();

  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center py-16 px-8 md:py-32 md:px-16 bg-background md:items-start">
      <header className="mb-8 w-full">
        <h1 className="text-4xl font-bold">다시보기 목록</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          치레동에서 진행된 경기들의 다시보기를 확인해보세요. 일자별 다시보기가
          정리되어 있습니다. 링크를 클릭하면 치지직으로 이동합니다.
        </p>
        <Accordion type="multiple" className="w-full mt-4">
          <AccordionItem value="season1" className="px-4 border-b">
            <AccordionTrigger>
              <h2 className="text-xl font-semibold">
                {competitions["season1"]?.name || "시즌 1"}
              </h2>
            </AccordionTrigger>
            <AccordionContent className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <VodCard
                title="본선"
                thumbnail="/vods/season1_1.jpg"
                url="https://chzzk.naver.com/video/6994458"
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="season2" className="px-4 border-b">
            <AccordionTrigger>
              <h2 className="text-xl font-semibold">
                {competitions["season2"]?.name || "시즌 2"}
              </h2>
            </AccordionTrigger>
            <AccordionContent className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <VodCard
                title="예선"
                thumbnail="/vods/season2_1.jpg"
                url="https://chzzk.naver.com/video/7992247"
              />
              <VodCard
                title="본선"
                thumbnail="/vods/season2_2.jpg"
                url="https://chzzk.naver.com/video/8108679"
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="season3" className="px-4 border-b">
            <AccordionTrigger>
              <h2 className="text-xl font-semibold">
                {competitions["season3"]?.name || "시즌 3"}
              </h2>
            </AccordionTrigger>
            <AccordionContent className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <VodCard
                title="예선"
                thumbnail="/vods/season3_1.jpg"
                url="https://chzzk.naver.com/video/10292130"
              />
              <VodCard
                title="본선"
                thumbnail="/vods/season3_2.jpg"
                url="https://chzzk.naver.com/video/10393351"
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="season4" className="px-4 border-b">
            <AccordionTrigger>
              <h2 className="text-xl font-semibold">
                {competitions["season4"]?.name || "시즌 4"}
              </h2>
            </AccordionTrigger>
            <AccordionContent className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <VodCard
                title="예선"
                thumbnail="/vods/season4_1.jpg"
                url="https://chzzk.naver.com/video/12049352"
              />
              <VodCard
                title="본선 1일차"
                thumbnail="/vods/season4_2.jpg"
                url="https://chzzk.naver.com/video/12110859"
              />
              <VodCard
                title="본선 2일차"
                thumbnail="/vods/season4_3.jpg"
                url="https://chzzk.naver.com/video/12128240"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </header>
    </main>
  );
}

function VodCard({
  title,
  thumbnail,
  url,
}: {
  title: string;
  thumbnail: string;
  url: string;
}) {
  return (
    <Link
      href={url}
      target="_blank"
      className="w-full underline hover:no-underline"
    >
      <Card className="overflow-hidden pt-0">
        <CardHeader className="px-0">
          <Image
            src={thumbnail || "/vod/default-thumbnail.png"}
            alt="VOD Thumbnail"
            width={640}
            height={360}
            className="w-full"
          />
        </CardHeader>
        <CardContent>
          <div className="font-semibold text-base">{title}</div>
        </CardContent>
      </Card>
    </Link>
  );
}
