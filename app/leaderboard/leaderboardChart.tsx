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
  const chartData = ratingData.map((player) => ({
    name: player.displayName,
    value: roundToTwoDecimals(player.value),
    mu: roundToTwoDecimals(player.mu),
  }));
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
        <XAxis
          type="number"
          domain={[-10, 110]}
          ticks={[0, 20, 40, 60, 80, 100]}
        />
        <YAxis
          type="category"
          dataKey="name"
          interval={0}
          tickFormatter={(value, _) => {
            return value.toLocaleString().replace(/ /g, "\u00A0");
          }}
          widths={"auto"}
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

function roundToTwoDecimals(num: number): number {
  return Math.round(num * 100) / 100;
}
