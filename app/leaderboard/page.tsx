import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { loadCurrentRating } from "@/lib/loadCurrentRating";
import { loadParticipantsById } from "@/lib/loadParticipants";

const columns = ["이름", "레이싱 넘버", "레이팅", "티어", "평균"];
// TODO: Set current season as a global constant.
const currentSeason = "season3";

export default function Leaderboard() {
  const currentRating = loadCurrentRating();
  const participants = loadParticipantsById();

  const participantsWithCurrentRating = Object.entries(participants).map(
    ([key, participant]) => {
      return {
        ...participant,
        ...currentRating[key],
      };
    },
  );
  participantsWithCurrentRating.sort((a, b) => b.value - a.value);

  return (
    <div className="min-h-screen w-full items-center py-16 px-8 bg-white dark:bg-black sm:items-start">
      <header className="mb-8 w-full">
        <h1 className="text-4xl font-bold">레이팅 리더보드</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          치레동 참가자들의 현재 레이팅 순위를 확인하세요.
        </p>
      </header>
      {/* TODO(#40): Add a point graph to map participant by rating value */}
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* TODO(#40): Make each row to direct to participant detail page */}
          {/* TODO(#40): Change color palette of the row by tier value */}
          {participantsWithCurrentRating.map((participant) => (
            <TableRow key={participant.id}>
              <TableCell>
                <Avatar className="inline-block align-middle">
                  <AvatarImage
                    src={participant.avatarUrl}
                    alt={participant.displayName}
                    className="object-cover"
                  />
                  <AvatarFallback>{participant.displayName[0]}</AvatarFallback>
                </Avatar>
                <span className="ml-2 inline-block align-middle">
                  {participant.displayName}
                </span>
              </TableCell>
              <TableCell className="font-mono">
                #{participant.racingNumber}
              </TableCell>
              <TableCell className="font-mono">
                {roundToTwoDecimals(participant.value)}
              </TableCell>
              <TableCell>
                {participant.tiers ? participant.tiers[currentSeason] : "-"}
              </TableCell>
              <TableCell className="font-mono">
                {roundToTwoDecimals(participant.mu)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function roundToTwoDecimals(num: number): string {
  return (Math.round(num * 100) / 100).toFixed(2);
}
