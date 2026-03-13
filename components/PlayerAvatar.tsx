import { GraduationCapIcon } from "lucide-react";
import Link from "next/link";
import { Player } from "@/types/player";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function PlayerAvatar({
  player,
  className,
}: {
  player: Player;
  className?: string;
}) {
  return (
    <Link
      href={`/players/${player.id}`}
      className={`flex items-center` + (className ? ` ${className}` : "")}
    >
      <Avatar>
        <AvatarImage
          src={player.avatarUrl}
          alt={player.displayName}
          className="object-cover"
        />
        <AvatarFallback>{player.displayName.charAt(0)}</AvatarFallback>
      </Avatar>
      <span className="ml-2 align-middle">
        <span className="underline hover:no-underline">
          {player.displayName}
        </span>
        {player.graduated && (
          <>
            {" "}
            <GraduationCapIcon className="inline w-5 h-5" aria-label="졸업" />
          </>
        )}
      </span>
    </Link>
  );
}
