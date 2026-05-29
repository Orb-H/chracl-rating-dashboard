import { CrownIcon } from "lucide-react";
import { Fragment } from "react";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { loadCompetitionById } from "@/lib/loadCompetitions";
import { loadPlayersById } from "@/lib/loadPlayers";

export default function Season2Result() {
  const teams = loadCompetitionById("season2").teams;
  const teamsById = Object.fromEntries(teams.map((t) => [t.id, t]));
  const players = loadPlayersById();
  const rankedTeams = [
    "season2-team-namgung-hyuk",
    "season2-team-cheongalice",
    "season2-team-hyungdok",
    "season2-team-yona",
  ]
    .map((teamId) => teamsById[teamId] ?? null)
    .filter((team): team is NonNullable<typeof team> => team !== null);

  return (
    <>
      <header className="text-2xl font-bold mb-6">결과</header>
      <header className="text-lg font-semibold mb-2">팀 순위</header>
      <Table className="mb-6">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">순위</TableHead>
            <TableHead className="text-center">팀</TableHead>
            <TableHead className="text-center" colSpan={3}>
              팀원
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rankedTeams.map((team, index) => (
            <Fragment key={team.id}>
              <TableRow>
                <TableCell className="text-center font-bold" rowSpan={2}>
                  {index === 0 ? (
                    <CrownIcon
                      className="inline-block w-4 h-4 mr-1"
                      aria-label="1"
                    />
                  ) : (
                    index + 1
                  )}
                </TableCell>
                <TableCell className="text-center" rowSpan={2}>
                  <Badge className={team.style?.badge ?? ""}>{team.name}</Badge>
                </TableCell>
                {team.members.slice(0, 3).map((memberId) => (
                  <TableCell className="text-center" key={memberId}>
                    <PlayerAvatar player={players[memberId]} />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {team.members.slice(3).map((memberId) => (
                  <TableCell className="text-center" key={memberId}>
                    <PlayerAvatar player={players[memberId]} />
                  </TableCell>
                ))}
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
      <header className="text-lg font-semibold mb-2">MVP</header>
      <Table>
        <TableBody>
          <TableRow>
            <TableHead className="text-center">본선 MVP</TableHead>
            <TableCell className="text-center">
              <PlayerAvatar player={players["namgung-hyuk"]} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="text-center">예선 MVP</TableHead>
            <TableCell className="text-center">
              <PlayerAvatar player={players["zen1th-hwang"]} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Separator className="my-8" />
      <header className="text-2xl font-bold mb-2">팀 세부결과</header>
      <Accordion
        type="multiple"
        defaultValue={["final"]}
        className="w-full mb-4"
      >
        <AccordionItem value="semifinal-a" className="w-full border-b">
          <AccordionTrigger className="w-full">
            <header className="font-semibold text-lg">4강 A조 점수 집계</header>
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">팀</TableHead>
                  <TableHead className="text-center" colSpan={3}>
                    개인 점수
                  </TableHead>
                  <TableHead className="text-center">총점</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-center" rowSpan={2}>
                    <Badge
                      className={
                        teamsById["season2-team-cheongalice"]?.style?.badge ??
                        ""
                      }
                    >
                      이글콥1등하면페라리
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    강지형
                    <br />
                    17
                  </TableCell>
                  <TableCell className="text-center">
                    쵸쵸우
                    <br />7
                  </TableCell>
                  <TableCell className="text-center">
                    제황
                    <br />
                    20
                  </TableCell>
                  <TableCell className="text-center font-semibold" rowSpan={2}>
                    57
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    노돌리
                    <br />
                    13
                  </TableCell>
                  <TableCell className="text-center">
                    이글콥
                    <br />0
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center" rowSpan={2}>
                    <Badge
                      className={
                        teamsById["season2-team-yona"]?.style?.badge ?? ""
                      }
                    >
                      레요헤호케
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    요나
                    <br />
                    15
                  </TableCell>
                  <TableCell className="text-center">
                    헤라
                    <br />9
                  </TableCell>
                  <TableCell className="text-center">
                    김레오
                    <br />4
                  </TableCell>
                  <TableCell className="text-center font-semibold" rowSpan={2}>
                    41
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    문호준
                    <br />
                    11
                  </TableCell>
                  <TableCell className="text-center">
                    케인
                    <br />2
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="semifinal-b" className="w-full border-b">
          <AccordionTrigger className="w-full">
            <header className="font-semibold text-lg">4강 B조 점수 집계</header>
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">팀</TableHead>
                  <TableHead className="text-center" colSpan={3}>
                    개인 점수
                  </TableHead>
                  <TableHead className="text-center">총점</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-center" rowSpan={2}>
                    <Badge
                      className={
                        teamsById["season2-team-namgung-hyuk"]?.style?.badge ??
                        ""
                      }
                    >
                      투자는남궁혁처럼
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    남궁혁
                    <br />
                    20
                  </TableCell>
                  <TableCell className="text-center">
                    오단밍
                    <br />4
                  </TableCell>
                  <TableCell className="text-center">
                    김토키
                    <br />7
                  </TableCell>
                  <TableCell className="text-center font-semibold" rowSpan={2}>
                    53
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    뽀구미
                    <br />
                    13
                  </TableCell>
                  <TableCell className="text-center">
                    햄쿠비
                    <br />9
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center" rowSpan={2}>
                    <Badge
                      className={
                        teamsById["season2-team-hyungdok"]?.style?.badge ?? ""
                      }
                    >
                      오버테이크
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    형독
                    <br />
                    17
                  </TableCell>
                  <TableCell className="text-center">
                    서애덕
                    <br />0
                  </TableCell>
                  <TableCell className="text-center">
                    양메이
                    <br />2
                  </TableCell>
                  <TableCell className="text-center font-semibold" rowSpan={2}>
                    45
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    박인수
                    <br />
                    15
                  </TableCell>
                  <TableCell className="text-center">
                    박지
                    <br />
                    11
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="third" className="w-full border-b">
          <AccordionTrigger className="w-full">
            <header className="font-semibold text-lg">
              3·4위 결정전 점수 집계
            </header>
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">팀</TableHead>
                  <TableHead className="text-center" colSpan={3}>
                    개인 점수
                  </TableHead>
                  <TableHead className="text-center">총점</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-center" rowSpan={2}>
                    <Badge
                      className={
                        teamsById["season2-team-hyungdok"]?.style?.badge ?? ""
                      }
                    >
                      오버테이크
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    형독
                    <br />
                    13
                  </TableCell>
                  <TableCell className="text-center">
                    서애덕
                    <br />9
                  </TableCell>
                  <TableCell className="text-center">
                    양메이
                    <br />0
                  </TableCell>
                  <TableCell className="text-center font-semibold" rowSpan={2}>
                    49
                    <br />
                    <span className="text-muted-foreground">20(박인수)</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    박인수
                    <br />
                    20
                  </TableCell>
                  <TableCell className="text-center">
                    박지
                    <br />7
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center" rowSpan={2}>
                    <Badge
                      className={
                        teamsById["season2-team-yona"]?.style?.badge ?? ""
                      }
                    >
                      레요헤호케
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    요나
                    <br />
                    15
                  </TableCell>
                  <TableCell className="text-center">
                    헤라
                    <br />2
                  </TableCell>
                  <TableCell className="text-center">
                    김레오
                    <br />
                    11
                  </TableCell>
                  <TableCell className="text-center font-semibold" rowSpan={2}>
                    49
                    <br />
                    <span className="text-muted-foreground">17(문호준)</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    문호준
                    <br />
                    17
                  </TableCell>
                  <TableCell className="text-center">
                    케인
                    <br />4
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="final" className="w-full border-b">
          <AccordionTrigger className="w-full">
            <header className="font-semibold text-lg">결승전 점수 집계</header>
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">팀</TableHead>
                  <TableHead className="text-center" colSpan={3}>
                    개인 점수
                  </TableHead>
                  <TableHead className="text-center">총점</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-center" rowSpan={2}>
                    <Badge
                      className={
                        teamsById["season2-team-namgung-hyuk"]?.style?.badge ??
                        ""
                      }
                    >
                      투자는남궁혁처럼
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    남궁혁
                    <br />
                    20
                  </TableCell>
                  <TableCell className="text-center">
                    오단밍
                    <br />
                    13
                  </TableCell>
                  <TableCell className="text-center">
                    김토키
                    <br />
                    11
                  </TableCell>
                  <TableCell className="text-center font-semibold" rowSpan={2}>
                    55
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    뽀구미
                    <br />7
                  </TableCell>
                  <TableCell className="text-center">
                    햄쿠비
                    <br />4
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center" rowSpan={2}>
                    <Badge
                      className={
                        teamsById["season2-team-cheongalice"]?.style?.badge ??
                        ""
                      }
                    >
                      이글콥1등하면페라리
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    강지형
                    <br />
                    17
                  </TableCell>
                  <TableCell className="text-center">
                    쵸쵸우
                    <br />0
                  </TableCell>
                  <TableCell className="text-center">
                    제황
                    <br />
                    15
                  </TableCell>
                  <TableCell className="text-center font-semibold" rowSpan={2}>
                    43
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    노돌리
                    <br />9
                  </TableCell>
                  <TableCell className="text-center">
                    이글콥
                    <br />2
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Separator className="my-8" />
      <header className="text-2xl font-bold mb-2">개인 세부결과</header>
      <Accordion
        type="multiple"
        defaultValue={["individual", "pre-laptime"]}
        className="w-full mb-4"
      >
        <AccordionItem value="individual" className="w-full border-b">
          <AccordionTrigger className="w-full">
            <header className="font-semibold text-lg">
              본선 티어 지수 기반 개인 순위
            </header>
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center" rowSpan={2}>
                    순위
                  </TableHead>
                  <TableHead className="text-center" rowSpan={2}>
                    선수
                  </TableHead>
                  <TableHead className="text-center" colSpan={2}>
                    4강
                  </TableHead>
                  <TableHead className="text-center" colSpan={2}>
                    3·4위전 / 결승전
                  </TableHead>
                  <TableHead className="text-center" rowSpan={2}>
                    티어 지수
                  </TableHead>
                </TableRow>
                <TableRow>
                  <TableHead className="text-center">퀄리파잉</TableHead>
                  <TableHead className="text-center">레이스</TableHead>
                  <TableHead className="text-center">퀄리파잉</TableHead>
                  <TableHead className="text-center">레이스</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-center font-bold">
                    <CrownIcon
                      className="inline-block w-4 h-4"
                      aria-label="1"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["namgung-hyuk"]} />
                  </TableCell>
                  <TableCell className="text-center">3</TableCell>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell className="text-center font-semibold">
                    1.3
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">2</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["park-insoo"]} />
                  </TableCell>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell className="text-center">3</TableCell>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell className="text-center font-semibold">
                    1.7
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">3</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["zen1th-hwang"]} />
                  </TableCell>
                  <TableCell className="text-center">2</TableCell>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell className="text-center">2</TableCell>
                  <TableCell className="text-center">3</TableCell>
                  <TableCell className="text-center font-semibold">2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">4</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["cheongalice"]} />
                  </TableCell>
                  <TableCell className="text-center">6</TableCell>
                  <TableCell className="text-center">2</TableCell>
                  <TableCell className="text-center">3</TableCell>
                  <TableCell className="text-center">2</TableCell>
                  <TableCell className="text-center font-semibold">
                    2.75
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">5</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["hyungdok"]} />
                  </TableCell>
                  <TableCell className="text-center">2</TableCell>
                  <TableCell className="text-center">2</TableCell>
                  <TableCell className="text-center">3</TableCell>
                  <TableCell className="text-center">4</TableCell>
                  <TableCell className="text-center font-semibold">
                    2.85
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">6</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["yona"]} />
                  </TableCell>
                  <TableCell className="text-center">3</TableCell>
                  <TableCell className="text-center">3</TableCell>
                  <TableCell className="text-center">6</TableCell>
                  <TableCell className="text-center">3</TableCell>
                  <TableCell className="text-center font-semibold">
                    3.45
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">7</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["moon-hojun"]} />
                  </TableCell>
                  <TableCell className="text-center">5</TableCell>
                  <TableCell className="text-center">5</TableCell>
                  <TableCell className="text-center">2</TableCell>
                  <TableCell className="text-center">2</TableCell>
                  <TableCell className="text-center font-semibold">
                    3.5
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">8</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["nodolly"]} />
                  </TableCell>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell className="text-center">4</TableCell>
                  <TableCell className="text-center">4</TableCell>
                  <TableCell className="text-center">6</TableCell>
                  <TableCell className="text-center font-semibold">
                    4.25
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">9</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["bbogumi"]} />
                  </TableCell>
                  <TableCell className="text-center">4</TableCell>
                  <TableCell className="text-center">4</TableCell>
                  <TableCell className="text-center">5</TableCell>
                  <TableCell className="text-center">7</TableCell>
                  <TableCell className="text-center font-semibold">
                    5.2
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">10</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["reo"]} />
                  </TableCell>
                  <TableCell className="text-center">4</TableCell>
                  <TableCell className="text-center">8</TableCell>
                  <TableCell className="text-center">4</TableCell>
                  <TableCell className="text-center">5</TableCell>
                  <TableCell className="text-center font-semibold">
                    5.75
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">11</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["parkgee"]} />
                  </TableCell>
                  <TableCell className="text-center">6</TableCell>
                  <TableCell className="text-center">5</TableCell>
                  <TableCell className="text-center">5</TableCell>
                  <TableCell className="text-center">7</TableCell>
                  <TableCell className="text-center font-semibold">
                    5.85
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold" rowSpan={2}>
                    12
                  </TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["kim-toki"]} />
                  </TableCell>
                  <TableCell className="text-center">8</TableCell>
                  <TableCell className="text-center">7</TableCell>
                  <TableCell className="text-center">6</TableCell>
                  <TableCell className="text-center">5</TableCell>
                  <TableCell className="text-center font-semibold">
                    6.3
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["odanming"]} />
                  </TableCell>
                  <TableCell className="text-center">7</TableCell>
                  <TableCell className="text-center">8</TableCell>
                  <TableCell className="text-center">7</TableCell>
                  <TableCell className="text-center">4</TableCell>
                  <TableCell className="text-center font-semibold">
                    6.3
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">14</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["a2-duck"]} />
                  </TableCell>
                  <TableCell className="text-center">5</TableCell>
                  <TableCell className="text-center">10</TableCell>
                  <TableCell className="text-center">7</TableCell>
                  <TableCell className="text-center">6</TableCell>
                  <TableCell className="text-center font-semibold">
                    7.4
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">15</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["hera"]} />
                  </TableCell>
                  <TableCell className="text-center">7</TableCell>
                  <TableCell className="text-center">6</TableCell>
                  <TableCell className="text-center">8</TableCell>
                  <TableCell className="text-center">9</TableCell>
                  <TableCell className="text-center font-semibold">
                    7.5
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">16</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["hamkubby"]} />
                  </TableCell>
                  <TableCell className="text-center">9</TableCell>
                  <TableCell className="text-center">6</TableCell>
                  <TableCell className="text-center">10</TableCell>
                  <TableCell className="text-center">8</TableCell>
                  <TableCell className="text-center font-semibold">
                    7.75
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">17</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["chochou"]} />
                  </TableCell>
                  <TableCell className="text-center">8</TableCell>
                  <TableCell className="text-center">7</TableCell>
                  <TableCell className="text-center">8</TableCell>
                  <TableCell className="text-center">10</TableCell>
                  <TableCell className="text-center font-semibold">
                    8.35
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">18</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["kanetv8"]} />
                  </TableCell>
                  <TableCell className="text-center">10</TableCell>
                  <TableCell className="text-center">9</TableCell>
                  <TableCell className="text-center">10</TableCell>
                  <TableCell className="text-center">8</TableCell>
                  <TableCell className="text-center font-semibold">
                    8.95
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">19</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["eaglekop"]} />
                  </TableCell>
                  <TableCell className="text-center">9</TableCell>
                  <TableCell className="text-center">10</TableCell>
                  <TableCell className="text-center">9</TableCell>
                  <TableCell className="text-center">9</TableCell>
                  <TableCell className="text-center font-semibold">
                    9.35
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">20</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["yang-mei"]} />
                  </TableCell>
                  <TableCell className="text-center">10</TableCell>
                  <TableCell className="text-center">9</TableCell>
                  <TableCell className="text-center">9</TableCell>
                  <TableCell className="text-center">10</TableCell>
                  <TableCell className="text-center font-semibold">
                    9.5
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="pre-laptime" className="w-full border-b">
          <AccordionTrigger className="w-full">
            <header className="font-semibold text-lg">
              예선 퀄리파잉 랩타임 순위
            </header>
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">순위</TableHead>
                  <TableHead className="text-center">선수</TableHead>
                  <TableHead className="text-center">랩타임</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-center font-bold">
                    <CrownIcon
                      className="inline-block w-4 h-4"
                      aria-label="1"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["zen1th-hwang"]} />
                  </TableCell>
                  <TableCell className="text-center">1:12.500</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">2</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["park-insoo"]} />
                  </TableCell>
                  <TableCell className="text-center">1:13.024</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">3</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["reo"]} />
                  </TableCell>
                  <TableCell className="text-center">1:13.690</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">4</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["moon-hojun"]} />
                  </TableCell>
                  <TableCell className="text-center">1:13.697</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">5</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["nodolly"]} />
                  </TableCell>
                  <TableCell className="text-center">1:14.237</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">6</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["yang-mei"]} />
                  </TableCell>
                  <TableCell className="text-center">1:14.272</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">7</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["kim-toki"]} />
                  </TableCell>
                  <TableCell className="text-center">1:14.449</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">8</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["parkgee"]} />
                  </TableCell>
                  <TableCell className="text-center">1:14.920</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">9</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["odanming"]} />
                  </TableCell>
                  <TableCell className="text-center">1:15.220</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">10</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["a2-duck"]} />
                  </TableCell>
                  <TableCell className="text-center">1:15.381</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">11</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["bbogumi"]} />
                  </TableCell>
                  <TableCell className="text-center">1:15.616</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">12</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["hera"]} />
                  </TableCell>
                  <TableCell className="text-center">1:15.670</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">13</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["hamkubby"]} />
                  </TableCell>
                  <TableCell className="text-center">1:15.941</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">14</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["chochou"]} />
                  </TableCell>
                  <TableCell className="text-center">1:16.148</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">15</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["kanetv8"]} />
                  </TableCell>
                  <TableCell className="text-center">1:17.937</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">16</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["eaglekop"]} />
                  </TableCell>
                  <TableCell className="text-center">1:19.065</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="tier-calculation" className="w-full border-b">
          <AccordionTrigger className="w-full">
            <header className="font-semibold text-lg">티어 지수 계산법</header>
          </AccordionTrigger>
          <AccordionContent>
            티어 지수는 대회에서 기록한 순위를 바탕으로 아래 수식과 같이
            계산합니다.
            <blockquote className="p-4 my-4 border-s-4 bg-muted">
              (퀄리파잉 평균 순위)×0.3＋(레이스 평균 순위)×0.7
            </blockquote>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
