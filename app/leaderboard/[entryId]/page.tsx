import { notFound } from "next/navigation";
import { loadEntries, loadEntriesById } from "@/lib/loadEntries";
import { LeaderboardPageContent } from "../leaderboardPageContent";

export const dynamicParams = false;

export async function generateStaticParams() {
  return loadEntries().map((entry) => ({ entryId: entry.id }));
}

export default async function LeaderboardByEntryPage({
  params,
}: {
  params: Promise<{ entryId: string }>;
}) {
  const { entryId } = await params;
  const entry = loadEntriesById()[entryId];
  if (!entry) {
    return notFound();
  }

  return <LeaderboardPageContent selectedEntryId={entry.id} />;
}
