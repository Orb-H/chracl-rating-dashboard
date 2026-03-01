import { Tier } from "@/types/player";
import { Badge } from "./ui/badge";

export function TierBadge({ tier }: { tier: Tier }) {
  return <Badge className={styleByTier(tier)}>{tier}</Badge>;
}

function styleByTier(tier: Tier): string {
  switch (tier) {
    case Tier.TIER1:
    case Tier.TIER1PLUS:
      return "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300";
    case Tier.TIER2:
      return "bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300";
    case Tier.TIER3:
    case Tier.TIER3PLUS:
      return "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300";
    case Tier.TIER4:
    case Tier.TIER4PLUS:
      return "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
    case Tier.TIER5:
      return "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300";
    case Tier.TIER6:
      return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
    default:
      return "bg-muted text-muted-foreground";
  }
}
