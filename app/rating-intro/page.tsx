import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function RatingIntro() {
  return (
    <main className="flex flex-col gap-6 min-h-screen w-full max-w-3xl mx-auto items-start py-16 px-8 md:py-32 md:px-16 bg-background">
      <h2 className="mb-6 text-4xl font-extrabold">🏁 치레동 레이팅 시스템</h2>
      <h3 className="text-2xl font-semibold">세 줄? 요약</h3>
      <ol className="ml-6 list-decimal [&>li]:mt-2">
        <li>
          선수의 실력을 확률로 표현하는 시스템을 활용했습니다. 이 사이트에서는
          주로 <strong>레이팅</strong>과 <strong>μ</strong>라는 두 숫자로
          표현합니다. 각각 시스템이 판단하는 실력의 저점과 평균을 의미합니다.
        </li>
        <li>
          경기에 많이 참여하면 레이팅의 신뢰도가 올라갑니다. 초반에는 레이팅이
          크게 오르내릴 수 있지만, 시간이 지날수록 변동폭이 줄어듭니다.
        </li>
        <li>
          강한 상대를 이기면 레이팅이 크게 오르고, 약한 상대에게 이기면 레이팅이
          적게 오르는 구조입니다. 반대로 약한 상대에게 지면 레이팅이 크게
          떨어집니다. 팀 단위로도 마찬가지로 적용됩니다.
        </li>
      </ol>
      <h3 className="text-2xl font-semibold">들어가기에 앞서</h3>
      <ul className="ml-6 list-disc [&>li]:mt-2">
        <li>
          원본은 제 블로그 포스트입니다:{" "}
          <Link
            href="https://blog.orbithv.dev/chzzk-racing-rating-1"
            className="text-primary underline"
          >
            https://blog.orbithv.dev/chzzk-racing-rating-1
          </Link>
        </li>
        <li>
          어떻게 해야 쉽게 설명할 수 있을지 감이 안 잡혀서 아래 글은 대부분
          LLM에게 맡겼습니다.
        </li>
      </ul>
      <Separator />
      <h3 className="text-2xl font-semibold">🤔 기존 티어, 뭐가 부족했나요?</h3>
      <p>
        치레동에서는 원래 <strong>티어 지수</strong>와{" "}
        <strong>랭킹 지수</strong>
        라는 값으로 선수들의 실력을 나눴어요. 간단히 말하면 이런 식이에요:
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>지수</TableHead>
            <TableHead>의미</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>티어 지수</TableCell>
            <TableCell>특정 대회에서 얼마나 잘했는가</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>랭킹 지수</TableCell>
            <TableCell>전체 대회를 통틀어 얼마나 잘하는가</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p>나쁘지 않은 방식이지만, 몇 가지 아쉬운 점이 있었어요:</p>
      <ul className="ml-6 list-disc [&>li]:mt-2">
        <li>
          😤 팀전 결과가 반영되지 않음 — 팀 순위를 위한 행동이 점수에 안 잡힘
        </li>
        <li>
          🎲 대회 한 번으로 티어가 결정될 수 있음 — 운이 좋았는지 실력인지
          구분이 어려움
        </li>
        <li>
          ⚖️ 상대 실력을 고려하지 않음 — 약한 팀만 만난 선수와 강한 팀만 만난
          선수의 점수가 같게 나올 수 있음
        </li>
      </ul>
      <p>이 세 가지 문제를 해결하기 위해 새로운 레이팅 시스템을 도입했어요.</p>
      <Separator />
      <h3 className="text-2xl font-semibold">
        📊 레이팅, 어떻게 읽으면 될까요?
      </h3>
      <p>레이팅 리더보드 페이지를 보면 선수마다 두 개의 숫자가 보여요:</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>...</TableHead>
            <TableHead>레이팅</TableHead>
            <TableHead>μ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>...</TableCell>
            <TableCell>32.5</TableCell>
            <TableCell>48.2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p>이 두 숫자를 이렇게 이해하면 돼요:</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>숫자</TableHead>
            <TableHead>의미</TableHead>
            <TableHead>쉽게 말하면</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <strong>레이팅</strong>
            </TableCell>
            <TableCell>
              시스템이 &quot;최소 이 정도는 한다&quot;고 보장하는 값
            </TableCell>
            <TableCell>
              👉 <strong>이 숫자를 중심으로 보세요</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>μ (평균)</strong>
            </TableCell>
            <TableCell>시스템이 추정하는 선수의 평균 실력</TableCell>
            <TableCell>참고용</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p>
        💡 <strong>레이팅이 높을수록 강한 선수</strong>입니다. 평균보다 레이팅을
        더 신뢰하세요.
      </p>
      <Separator />
      <h3 className="text-2xl font-semibold">
        ⚙️ 레이팅이 오르내리는 3가지 원칙
      </h3>
      <h4 className="text-xl font-semibold">
        1. 강자를 이기면 더 많이 오른다 ⚔️
      </h4>
      <ul className="ml-6 list-disc [&>li]:mt-2">
        <li>레이팅이 높은 선수를 꺾으면 → 내 레이팅이 크게 오름</li>
        <li>레이팅이 낮은 선수에게 지면 → 내 레이팅이 크게 내려감</li>
      </ul>
      <p>
        당연히 이겨야 할 상대를 이겨도 조금밖에 안 오르고, 의외의 역전을 해냈을
        때 크게 오르는 구조예요. 이변이 제대로 평가받는 시스템이죠.
      </p>
      <h4 className="text-xl font-semibold">
        2. 꾸준히 참가할수록 신뢰도가 올라간다 📈
      </h4>
      <p>
        레이팅은 단순한 숫자가 아니라 &quot;이 정도 실력일 것이다&quot;라는
        범위로 표현돼요.
      </p>
      <ul className="ml-6 list-disc [&>li]:mt-2">
        <li>
          대회 참가 횟수가 <strong>적을수록</strong> → 범위가 넓음 (불확실)
        </li>
        <li>
          대회 참가 횟수가 <strong>많을수록</strong> → 범위가 좁아짐 (신뢰도 ↑)
        </li>
      </ul>
      <p>
        같은 레이팅이라도 대회를 꾸준히 참가한 선수 쪽이 실력에 대한 신뢰도가 더
        높아요. 한 번 잘해서 레이팅이 높은 선수보다, 매번 꾸준히 잘한 선수가 더
        높은 레이팅을 가져가는 구조입니다.
      </p>
      <h4 className="text-xl font-semibold">
        3. 팀전 + 개인전, 둘 다 반영된다 🤝
      </h4>
      <p>
        기존 시스템은 개인 순위만 봤지만, 이 레이팅은{" "}
        <strong>팀 순위도 같이 봐요</strong>.
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>경기 종류</TableHead>
            <TableHead>반영 비중</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>본선 개인 순위</TableCell>
            <TableCell>███████░░░ 70%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>본선 팀 순위</TableCell>
            <TableCell>███░░░░░░░ 30%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>퀄리파잉</TableCell>
            <TableCell>본선보다 낮은 비중</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p>
        팀을 위해 희생하는 플레이도, 팀을 들고 혼자 올라오는 플레이도 어느 정도
        반영됩니다.
      </p>
      <Separator />
      <h3 className="text-2xl font-semibold">📋 데이터 직접 보기</h3>
      <p>실제 선수별 레이팅 수치와 순위는 아래 페이지에서 확인하세요!</p>
      <Button asChild>
        <Link href="/leaderboard">
          치레동 레이팅 리더보드 페이지 바로가기 →
        </Link>
      </Button>
    </main>
  );
}
