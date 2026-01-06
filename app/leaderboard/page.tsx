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

const columns = ["", "이름", "레이싱 넘버", "레이팅", "티어", "평균"];
// TODO(#40): Set current season as a global constant.
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
    <main className="min-h-screen w-full items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
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
          {participantsWithCurrentRating.map((participant) => (
            <TableRow key={participant.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={participant.avatarUrl}
                    alt={participant.displayName}
                    className="object-cover"
                  />
                  <AvatarFallback>{participant.displayName[0]}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{participant.displayName}</TableCell>
              <TableCell>#{participant.racingNumber}</TableCell>
              <TableCell>{roundToTwoDecimals(participant.value)}</TableCell>
              <TableCell>
                {participant.tiers ? participant.tiers[currentSeason] : "-"}
              </TableCell>
              <TableCell>{roundToTwoDecimals(participant.mu)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}

function roundToTwoDecimals(num: number): string {
  return (Math.round(num * 100) / 100).toFixed(2);
}
