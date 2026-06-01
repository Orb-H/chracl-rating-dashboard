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

export default function Season3Result() {
  const teams = loadCompetitionById("season3").teams;
  const teamsById = Object.fromEntries(teams.map((t) => [t.id, t]));
  const players = loadPlayersById();
  const rankedTeams = [
    "season3-team-hyungdok",
    "season3-team-yona",
    "season3-team-reo",
    "season3-team-namgung-hyuk",
    "season3-team-zen1th-hwang",
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
            <TableHead className="text-center">
              드라이버 챔피언
              <br />
              (STINT 3 1위)
            </TableHead>
            <TableCell className="text-center">
              <PlayerAvatar player={players["hyungdok"]} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="text-center">STINT 2 1위</TableHead>
            <TableCell className="text-center">
              <PlayerAvatar player={players["odanming"]} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="text-center">STINT 1 1위</TableHead>
            <TableCell className="text-center">
              <PlayerAvatar player={players["oversleepzzz"]} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Separator className="my-8" />
      <header className="text-2xl font-bold mb-2">팀 세부결과</header>
      <Accordion
        type="multiple"
        defaultValue={["stint1", "stint2", "stint3"]}
        className="w-full mb-4"
      >
        <AccordionItem value="stint1" className="w-full border-b">
          <AccordionTrigger className="w-full">
            <header className="font-semibold text-lg">STINT 1 점수 집계</header>
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">팀</TableHead>
                  <TableHead className="text-center" colSpan={2}>
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
                        teamsById["season3-team-namgung-hyuk"]?.style?.badge ??
                        ""
                      }
                    >
                      혁이네어뢰시장
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    이글콥
                    <br />8
                  </TableCell>
                  <TableCell className="text-center">
                    유리리
                    <br />4
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    12
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season3-team-hyungdok"]?.style?.badge ?? ""
                      }
                    >
                      래피드
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    레아나
                    <br />0
                  </TableCell>
                  <TableCell className="text-center">
                    늦잠
                    <br />
                    10
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    10
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season3-team-yona"]?.style?.badge ?? ""
                      }
                    >
                      강지형연습왜안옴ㅡㅡ;
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    하쁘
                    <br />0
                  </TableCell>
                  <TableCell className="text-center">
                    로션욤
                    <br />6
                  </TableCell>
                  <TableCell className="text-center font-semibold">6</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season3-team-reo"]?.style?.badge ?? ""
                      }
                    >
                      좡
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    새담
                    <br />5
                  </TableCell>
                  <TableCell className="text-center">
                    아로
                    <br />1
                  </TableCell>
                  <TableCell className="text-center font-semibold">6</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season3-team-zen1th-hwang"]?.style?.badge ??
                        ""
                      }
                    >
                      식스센스
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    이치카 히비
                    <br />3
                  </TableCell>
                  <TableCell className="text-center">
                    미치르 메르헨
                    <br />2
                  </TableCell>
                  <TableCell className="text-center font-semibold">5</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="stint2" className="w-full border-b">
          <AccordionTrigger className="w-full">
            <header className="font-semibold text-lg">STINT 2 점수 집계</header>
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">팀</TableHead>
                  <TableHead className="text-center" colSpan={2}>
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
                        teamsById["season3-team-hyungdok"]?.style?.badge ?? ""
                      }
                    >
                      래피드
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    오단밍
                    <br />
                    15
                  </TableCell>
                  <TableCell className="text-center">
                    해마티엘
                    <br />
                    12
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    27
                    <br />
                    (37)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season3-team-namgung-hyuk"]?.style?.badge ??
                        ""
                      }
                    >
                      혁이네어뢰시장
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    김토키
                    <br />
                    10
                  </TableCell>
                  <TableCell className="text-center">
                    최케빈
                    <br />6
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    16
                    <br />
                    (28)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season3-team-reo"]?.style?.badge ?? ""
                      }
                    >
                      좡
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    뽀구미
                    <br />2
                  </TableCell>
                  <TableCell className="text-center">
                    하루토
                    <br />8
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    10
                    <br />
                    (16)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season3-team-zen1th-hwang"]?.style?.badge ??
                        ""
                      }
                    >
                      식스센스
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    양메이
                    <br />5
                  </TableCell>
                  <TableCell className="text-center">
                    서애덕
                    <br />3
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    8<br />
                    (13)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season3-team-yona"]?.style?.badge ?? ""
                      }
                    >
                      강지형연습왜안옴ㅡㅡ;
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    새싹감자
                    <br />4
                  </TableCell>
                  <TableCell className="text-center">
                    쵸쵸우
                    <br />1
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    5<br />
                    (11)
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="stint3" className="w-full border-b">
          <AccordionTrigger className="w-full">
            <header className="font-semibold text-lg">STINT 3 점수 집계</header>
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">팀</TableHead>
                  <TableHead className="text-center" colSpan={2}>
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
                        teamsById["season3-team-hyungdok"]?.style?.badge ?? ""
                      }
                    >
                      래피드
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    형독
                    <br />
                    25
                  </TableCell>
                  <TableCell className="text-center">
                    유영혁
                    <br />
                    18
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    43
                    <br />
                    (80)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season3-team-yona"]?.style?.badge ?? ""
                      }
                    >
                      강지형연습왜안옴ㅡㅡ;
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    요나
                    <br />
                    15
                  </TableCell>
                  <TableCell className="text-center">
                    강지형
                    <br />
                    12
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    27
                    <br />
                    (38)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season3-team-reo"]?.style?.badge ?? ""
                      }
                    >
                      좡
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    김레오
                    <br />6
                  </TableCell>
                  <TableCell className="text-center">
                    사모장
                    <br />
                    10
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    16
                    <br />
                    (32)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season3-team-namgung-hyuk"]?.style?.badge ??
                        ""
                      }
                    >
                      혁이네어뢰시장
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    남궁혁
                    <br />1
                  </TableCell>
                  <TableCell className="text-center">
                    헤라
                    <br />2
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    3
                    <br />
                    (31)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        teamsById["season3-team-zen1th-hwang"]?.style?.badge ??
                        ""
                      }
                    >
                      식스센스
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    제황
                    <br />8
                  </TableCell>
                  <TableCell className="text-center">
                    백마력티비
                    <br />4
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    12
                    <br />
                    (25)
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
