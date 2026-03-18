"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Update } from "@/types/update";

export function UpdateSheet({
  triggerChild,
  updates,
}: {
  triggerChild: React.ReactNode;
  updates: Update[];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>{triggerChild}</SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>업데이트 내역</SheetTitle>
          <SheetDescription>
            업데이트 날짜는 배포 날짜가 아닌 깃허브에 기능이 추가된 날짜를
            기준으로 합니다. 따라서 실제로 페이지가 배포되지 않은 날짜에 개발이
            완료되었다고 표시된 기능이 있을 수 있습니다.
          </SheetDescription>
        </SheetHeader>
        <div className="overflow-y-auto px-4">
          {[...updates]
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            )
            .map((update, i) => (
              <div key={update.date}>
                {i !== 0 && <Separator className="my-4" />}
                <h3 className="font-semibold mb-4">{update.date}</h3>
                <ul className="text-sm list-disc list-inside [&>li]:mb-2">
                  {update.content.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
