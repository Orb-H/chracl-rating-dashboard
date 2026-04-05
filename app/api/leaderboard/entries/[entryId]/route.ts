import { NextResponse } from "next/server";
import { loadLeaderboardRatingsByEntry } from "@/lib/loadLeaderboardRatingsByEntry";

const CACHE_CONTROL =
  "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ entryId: string }> },
) {
  const { entryId } = await params;

  try {
    const ratings = loadLeaderboardRatingsByEntry(entryId);
    return NextResponse.json(
      { ratings },
      { headers: { "Cache-Control": CACHE_CONTROL } },
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to load leaderboard entry";
    return NextResponse.json(
      { message },
      {
        status: 404,
        headers: { "Cache-Control": CACHE_CONTROL },
      },
    );
  }
}
