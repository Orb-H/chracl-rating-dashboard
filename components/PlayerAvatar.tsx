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
      className={
        `flex items-center underline hover:no-underline` +
        (className ? ` ${className}` : "")
      }
    >
      <Avatar>
        <AvatarImage
          src={player.avatarUrl}
          alt={player.displayName}
          className="object-cover"
        />
        <AvatarFallback>{player.displayName.charAt(0)}</AvatarFallback>
      </Avatar>
      <span className="ml-2 align-middle">{player.displayName}</span>
    </Link>
  );
}
