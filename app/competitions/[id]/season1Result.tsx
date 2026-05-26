import { CrownIcon } from "lucide-react";
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

export default function Season1Result() {
  const teams = loadCompetitionById("season1").teams;
  const teamsById = Object.fromEntries(teams.map((t) => [t.id, t]));
  const players = loadPlayersById();

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
          <TableRow>
            <TableCell className="text-center">
              <CrownIcon className="inline-block w-4 h-4" />
            </TableCell>
            <TableCell className="text-center">
              <Badge
                className={
                  teamsById["season1-team-hyungdok"]?.style?.badge ?? ""
                }
              >
                형독
              </Badge>
            </TableCell>
            <TableCell className="text-center">
              <PlayerAvatar player={players["hyungdok"]} />
            </TableCell>
            <TableCell className="text-center">
              <PlayerAvatar player={players["hamkubby"]} />
            </TableCell>
            <TableCell className="text-center">
              <PlayerAvatar player={players["reo"]} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center font-bold">2</TableCell>
            <TableCell className="text-center">
              <Badge
                className={
                  teamsById["season1-team-namgung-hyuk"]?.style?.badge ?? ""
                }
              >
                남궁혁
              </Badge>
            </TableCell>
            <TableCell className="text-center">
              <PlayerAvatar player={players["namgung-hyuk"]} />
            </TableCell>
            <TableCell className="text-center">
              <PlayerAvatar player={players["odanming"]} />
            </TableCell>
            <TableCell className="text-center">
              <PlayerAvatar player={players["chochou"]} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center font-bold">3</TableCell>
            <TableCell className="text-center">
              <Badge
                className={
                  teamsById["season1-team-cheongalice"]?.style?.badge ?? ""
                }
              >
                강지형
              </Badge>
            </TableCell>
            <TableCell className="text-center">
              <PlayerAvatar player={players["cheongalice"]} />
            </TableCell>
            <TableCell className="text-center">
              <PlayerAvatar player={players["oversleepzzz"]} />
            </TableCell>
            <TableCell className="text-center">
              <PlayerAvatar player={players["hera"]} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center font-bold">4</TableCell>
            <TableCell className="text-center">
              <Badge
                className={teamsById["season1-team-yona"]?.style?.badge ?? ""}
              >
                요나
              </Badge>
            </TableCell>
            <TableCell className="text-center">
              <PlayerAvatar player={players["yona"]} />
            </TableCell>
            <TableCell className="text-center">
              <PlayerAvatar player={players["a2-duck"]} />
            </TableCell>
            <TableCell className="text-center">
              <PlayerAvatar player={players["yang-mei"]} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <header className="text-lg font-semibold mb-2">MVP</header>
      <Table>
        <TableBody>
          <TableRow className="border-b-0">
            <TableCell className="text-center">
              <PlayerAvatar player={players["namgung-hyuk"]} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center">
              <PlayerAvatar player={players["hyungdok"]} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Separator className="my-8" />
      <header className="text-2xl font-bold mb-2">팀 세부결과</header>
      <Accordion
        type="multiple"
        defaultValue={["total"]}
        className="w-full mb-4"
      >
        <AccordionItem value="round1-match1" className="w-full border-b">
          <AccordionTrigger className="w-full">
            <header className="font-semibold text-lg">
              라운드 1 점수 집계
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
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season1-team-namgung-hyuk"]?.style?.badge ??
                        ""
                      }
                    >
                      남궁혁
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center items-center">
                    남궁혁
                    <br />
                    20
                  </TableCell>
                  <TableCell className="text-center">
                    오단밍
                    <br />2
                  </TableCell>
                  <TableCell className="text-center items-center">
                    쵸쵸우
                    <br />9
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    31
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season1-team-hyungdok"]?.style?.badge ?? ""
                      }
                    >
                      형독
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    형독
                    <br />
                    17
                  </TableCell>
                  <TableCell className="text-center">
                    햄쿠비
                    <br />1
                  </TableCell>
                  <TableCell className="text-center">
                    김레오
                    <br />
                    11
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    29
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season1-team-yona"]?.style?.badge ?? ""
                      }
                    >
                      요나
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    요나
                    <br />
                    15
                  </TableCell>
                  <TableCell className="text-center">
                    서애덕
                    <br />0
                  </TableCell>
                  <TableCell className="text-center">
                    양메이
                    <br />7
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    22
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season1-team-cheongalice"]?.style?.badge ??
                        ""
                      }
                    >
                      강지형
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    강지형
                    <br />
                    13
                  </TableCell>
                  <TableCell className="text-center">
                    늦잠
                    <br />5
                  </TableCell>
                  <TableCell className="text-center">
                    헤라
                    <br />3
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    21
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="round2" className="w-full border-b">
          <AccordionTrigger className="w-full">
            <header className="font-semibold text-lg">
              라운드 2 점수 집계
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
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season1-team-hyungdok"]?.style?.badge ?? ""
                      }
                    >
                      형독
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    형독
                    <br />
                    20
                  </TableCell>
                  <TableCell className="text-center">
                    햄쿠비
                    <br />1
                  </TableCell>
                  <TableCell className="text-center">
                    김레오
                    <br />
                    11
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    32
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season1-team-cheongalice"]?.style?.badge ??
                        ""
                      }
                    >
                      강지형
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    강지형
                    <br />
                    15
                  </TableCell>
                  <TableCell className="text-center">
                    늦잠
                    <br />9
                  </TableCell>
                  <TableCell className="text-center">
                    헤라
                    <br />5
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    29
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season1-team-namgung-hyuk"]?.style?.badge ??
                        ""
                      }
                    >
                      남궁혁
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center items-center">
                    남궁혁
                    <br />
                    17
                  </TableCell>
                  <TableCell className="text-center">
                    오단밍
                    <br />0
                  </TableCell>
                  <TableCell className="text-center items-center">
                    쵸쵸우
                    <br />7
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    24
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season1-team-yona"]?.style?.badge ?? ""
                      }
                    >
                      요나
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    요나
                    <br />
                    13
                  </TableCell>
                  <TableCell className="text-center">
                    서애덕
                    <br />2
                  </TableCell>
                  <TableCell className="text-center">
                    양메이
                    <br />3
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    18
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="total" className="w-full border-b">
          <AccordionTrigger className="w-full">
            <header className="font-semibold text-lg">종합</header>
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">순위</TableHead>
                  <TableHead className="text-center">팀</TableHead>
                  <TableHead className="text-center" colSpan={3}>
                    개인 점수
                  </TableHead>
                  <TableHead className="text-center">총점</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-center">
                    <CrownIcon className="inline-block w-4 h-4" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season1-team-hyungdok"]?.style?.badge ?? ""
                      }
                    >
                      형독
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="flex flex-col items-center justify-center">
                      <PlayerAvatar player={players["hyungdok"]} />
                      37
                      <br />
                      <span className="text-sm text-muted-foreground">
                        17＋20
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="flex flex-col items-center justify-center">
                      <PlayerAvatar player={players["hamkubby"]} />2<br />
                      <span className="text-sm text-muted-foreground">
                        1＋1
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="flex flex-col items-center justify-center">
                      <PlayerAvatar player={players["reo"]} />
                      22
                      <br />
                      <span className="text-sm text-muted-foreground">
                        11＋11
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    61
                    <br />
                    <span className="text-sm text-muted-foreground">
                      29＋32
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">2</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season1-team-namgung-hyuk"]?.style?.badge ??
                        ""
                      }
                    >
                      남궁혁
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center items-center">
                    <span className="flex flex-col items-center justify-center">
                      <PlayerAvatar player={players["namgung-hyuk"]} />
                      37
                      <br />
                      <span className="text-sm text-muted-foreground">
                        20＋17
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="flex flex-col items-center justify-center">
                      <PlayerAvatar player={players["odanming"]} />2
                      <br />
                      <span className="text-sm text-muted-foreground">
                        2＋0
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="text-center items-center">
                    <span className="flex flex-col items-center justify-center">
                      <PlayerAvatar player={players["chochou"]} />
                      16
                      <br />
                      <span className="text-sm text-muted-foreground">
                        9＋7
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    55
                    <br />
                    <span className="text-sm text-muted-foreground">
                      31＋24
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">3</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season1-team-cheongalice"]?.style?.badge ??
                        ""
                      }
                    >
                      강지형
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="flex flex-col items-center justify-center">
                      <PlayerAvatar player={players["cheongalice"]} />
                      28
                      <br />
                      <span className="text-sm text-muted-foreground">
                        13＋15
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="flex flex-col items-center justify-center">
                      <PlayerAvatar player={players["oversleepzzz"]} />
                      14
                      <br />
                      <span className="text-sm text-muted-foreground">
                        5＋9
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="flex flex-col items-center justify-center">
                      <PlayerAvatar player={players["hera"]} />8
                      <br />
                      <span className="text-sm text-muted-foreground">
                        3＋5
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    50
                    <br />
                    <span className="text-sm text-muted-foreground">
                      21＋29
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">4</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season1-team-yona"]?.style?.badge ?? ""
                      }
                    >
                      요나
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="flex flex-col items-center justify-center">
                      <PlayerAvatar player={players["yona"]} />
                      28
                      <br />
                      <span className="text-sm text-muted-foreground">
                        15＋13
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="flex flex-col items-center justify-center">
                      <PlayerAvatar player={players["a2-duck"]} />
                      2
                      <br />
                      <span className="text-sm text-muted-foreground">
                        0＋2
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="flex flex-col items-center justify-center">
                      <PlayerAvatar player={players["yang-mei"]} />
                      10
                      <br />
                      <span className="text-sm text-muted-foreground">
                        7＋3
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    40
                    <br />
                    <span className="text-sm text-muted-foreground">
                      22＋18
                    </span>
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
        defaultValue={["individual"]}
        className="w-full mb-4"
      >
        <AccordionItem value="individual" className="w-full border-b">
          <AccordionTrigger className="w-full">
            <header className="font-semibold text-lg">
              티어 지수 기반 개인 순위
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
                    라운드 1
                  </TableHead>
                  <TableHead className="text-center" colSpan={2}>
                    라운드 2
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
                  <TableCell className="text-center font-bold" rowSpan={2}>
                    <CrownIcon className="inline-block w-4 h-4" />
                  </TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["namgung-hyuk"]} />
                  </TableCell>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell className="text-center">2</TableCell>
                  <TableCell className="text-center">2</TableCell>
                  <TableCell className="text-center font-semibold">
                    1.5
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["hyungdok"]} />
                  </TableCell>
                  <TableCell className="text-center">2</TableCell>
                  <TableCell className="text-center">2</TableCell>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell className="text-center font-semibold">
                    1.5
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">3</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["yona"]} />
                  </TableCell>
                  <TableCell className="text-center">3</TableCell>
                  <TableCell className="text-center">3</TableCell>
                  <TableCell className="text-center">3</TableCell>
                  <TableCell className="text-center">4</TableCell>
                  <TableCell className="text-center font-semibold">
                    3.35
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">4</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["cheongalice"]} />
                  </TableCell>
                  <TableCell className="text-center">4</TableCell>
                  <TableCell className="text-center">4</TableCell>
                  <TableCell className="text-center">5</TableCell>
                  <TableCell className="text-center">3</TableCell>
                  <TableCell className="text-center font-semibold">
                    3.8
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">5</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["reo"]} />
                  </TableCell>
                  <TableCell className="text-center">5</TableCell>
                  <TableCell className="text-center">5</TableCell>
                  <TableCell className="text-center">4</TableCell>
                  <TableCell className="text-center">5</TableCell>
                  <TableCell className="text-center font-semibold">
                    4.85
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">6</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["oversleepzzz"]} />
                  </TableCell>
                  <TableCell className="text-center">8</TableCell>
                  <TableCell className="text-center">8</TableCell>
                  <TableCell className="text-center">6</TableCell>
                  <TableCell className="text-center">6</TableCell>
                  <TableCell className="text-center font-semibold">7</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">7</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["chochou"]} />
                  </TableCell>
                  <TableCell className="text-center">10</TableCell>
                  <TableCell className="text-center">6</TableCell>
                  <TableCell className="text-center">10</TableCell>
                  <TableCell className="text-center">7</TableCell>
                  <TableCell className="text-center font-semibold">
                    7.55
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">8</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["yang-mei"]} />
                  </TableCell>
                  <TableCell className="text-center">7</TableCell>
                  <TableCell className="text-center">7</TableCell>
                  <TableCell className="text-center">8</TableCell>
                  <TableCell className="text-center">9</TableCell>
                  <TableCell className="text-center font-semibold">
                    7.85
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">9</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["hera"]} />
                  </TableCell>
                  <TableCell className="text-center">9</TableCell>
                  <TableCell className="text-center">9</TableCell>
                  <TableCell className="text-center">9</TableCell>
                  <TableCell className="text-center">8</TableCell>
                  <TableCell className="text-center font-semibold">
                    8.65
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold">10</TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["a2-duck"]} />
                  </TableCell>
                  <TableCell className="text-center">6</TableCell>
                  <TableCell className="text-center">12</TableCell>
                  <TableCell className="text-center">7</TableCell>
                  <TableCell className="text-center">10</TableCell>
                  <TableCell className="text-center font-semibold">
                    9.65
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center font-bold" rowSpan={2}>
                    11
                  </TableCell>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["odanming"]} />
                  </TableCell>
                  <TableCell className="text-center">11</TableCell>
                  <TableCell className="text-center">10</TableCell>
                  <TableCell className="text-center">12</TableCell>
                  <TableCell className="text-center">12</TableCell>
                  <TableCell className="text-center font-semibold">
                    11.15
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <PlayerAvatar player={players["hamkubby"]} />
                  </TableCell>
                  <TableCell className="text-center">12</TableCell>
                  <TableCell className="text-center">11</TableCell>
                  <TableCell className="text-center">11</TableCell>
                  <TableCell className="text-center">11</TableCell>
                  <TableCell className="text-center font-semibold">
                    11.15
                  </TableCell>
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
