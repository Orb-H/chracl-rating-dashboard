import { notFound } from "next/navigation";
import { loadPlayerById, loadPlayers } from "@/lib/loadPlayers";
import { RatingChart } from "./RatingChart";

export const dynamicParams = false;

export async function generateStaticParams() {
  const participants = loadPlayers();

  return participants.map((participant) => ({
    id: participant.id,
  }));
}

export default async function Participant({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const participant = (() => {
    try {
      return loadPlayerById(id);
    } catch (_) {
      return notFound();
    }
  })();

  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center py-16 px-8 md:py-32 md:px-16 bg-background md:items-start">
      <h1 className="mb-8 text-4xl font-bold">{participant.displayName}</h1>
      <RatingChart />
    </main>
  );
}
