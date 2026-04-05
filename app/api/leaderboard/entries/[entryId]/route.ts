import { NextResponse } from "next/server";
import { loadLeaderboardRatingsByEntry } from "@/lib/loadLeaderboardRatingsByEntry";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ entryId: string }> },
) {
  const { entryId } = await params;

  try {
    const ratings = loadLeaderboardRatingsByEntry(entryId);
    return NextResponse.json({ ratings });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to load leaderboard entry";
    return NextResponse.json({ message }, { status: 404 });
  }
}
