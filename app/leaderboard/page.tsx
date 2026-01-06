import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { loadCurrentRating } from "@/lib/loadCurrentRating";
import { loadParticipantsById } from "@/lib/loadParticipants";

const columns = ["순위", "참가자", "티어", "레이팅", "μ값"];
// TODO: Set current season as a global constant.
const currentSeason = "season3";

export default function Leaderboard() {
  const currentRating = loadCurrentRating();
  const participants = loadParticipantsById();

  const participantsWithCurrentRating = Object.entries(participants)
    .map(([key, participant]) => {
      return {
        ...participant,
        ...(currentRating[key] ?? { value: Number.MIN_SAFE_INTEGER }),
      };
    })
    .slice()
    .sort((a, b) => b.value - a.value);

  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center py-16 px-8 md:py-32 md:px-16 bg-white dark:bg-black sm:items-start">
      <header className="mb-8 w-full">
        <h1 className="text-4xl font-bold">레이팅 리더보드</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          치레동 참가자들의 현재 레이팅 순위를 확인하세요.
        </p>
      </header>
      {/* TODO(#40): Add a point graph to map participant by rating value */}
      {/* TODO(#40): Add a popup component to describe about what "티어", "레이팅", and "μ값" is */}
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
          {participantsWithCurrentRating.map((participant, i) => (
            <TableRow key={participant.id}>
              <TableCell className="font-mono">
                {participant.mu ? i + 1 : "-"}
              </TableCell>
              <TableCell>
                <Avatar className="inline-block align-middle">
                  <AvatarImage
                    src={participant.avatarUrl}
                    alt={participant.displayName}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {participant.displayName?.[0] || ""}
                  </AvatarFallback>
                </Avatar>
                <span className="ml-2 inline-block align-middle">
                  {participant.displayName}
                </span>
              </TableCell>
              <TableCell>
                {participant.tiers ? participant.tiers[currentSeason] : "-"}
              </TableCell>
              <TableCell className="font-mono">
                {participant.mu ? roundToTwoDecimals(participant.value) : "-"}
              </TableCell>
              <TableCell className="font-mono">
                {participant.mu ? roundToTwoDecimals(participant.mu) : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>현재 기준 레이팅 순위</TableCaption>
      </Table>
    </main>
  );
}

function roundToTwoDecimals(num: number): string {
  return (Math.round(num * 100) / 100).toFixed(2);
}
