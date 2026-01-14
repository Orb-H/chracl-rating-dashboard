"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { roundToTwoDecimals } from "@/lib/utils";
import { Player } from "@/types/player";
import { Rating } from "@/types/rating";

type LeaderboardChartProps = {
  ratingData: (Player & Rating)[];
};

const chartConfig: ChartConfig = {
  value: {
    label: "레이팅",
    color: "var(--chart-1)",
  },
  mu: {
    label: "μ값",
    color: "var(--chart-5)",
  },
};

export function LeaderboardChart({ ratingData }: LeaderboardChartProps) {
  const chartData = ratingData
    .filter((player) => player.value !== undefined && player.mu !== undefined)
    .map((player) => ({
      name: player.displayName,
      value: roundToTwoDecimals(player.value),
      mu: roundToTwoDecimals(player.mu),
    }));
  const min =
    Math.min(
      0,
      ...chartData.map((player) =>
        Math.min(Number(player.value), Number(player.mu)),
      ),
    ) - 5;

  const max =
    Math.max(
      100,
      ...chartData.map((player) =>
        Math.max(Number(player.value), Number(player.mu)),
      ),
    ) + 5;

  const ticks = [];
  const step = 25;
  for (
    let i = Math.ceil(min / step) * step;
    i <= Math.floor(max / step) * step;
    i += step
  ) {
    ticks.push(i);
  }
  return (
    <ChartContainer
      className="w-full min-h-50 aspect-9/16 md:aspect-square"
      config={chartConfig}
    >
      <LineChart
        layout="vertical"
        data={chartData}
        margin={{ top: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[min, max]} ticks={ticks} />
        <YAxis
          type="category"
          dataKey="name"
          interval={0}
          tickFormatter={(value, _) => {
            return value.toLocaleString().replace(/ /g, "\u00A0");
          }}
        />
        <Line
          type="linear"
          dataKey="value"
          name="레이팅"
          stroke="var(--color-value)"
        />
        <Line type="linear" dataKey="mu" name="μ값" stroke="var(--color-mu)" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
    </ChartContainer>
  );
}
