import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function roundToTwoDecimals(num: number): string {
  return (Math.round(num * 100) / 100).toFixed(2);
}

export function isTeamWin(careerDetail: string) {
  return careerDetail.includes("우승");
}

export function isIndividualWin(careerDetail: string) {
  return (
    careerDetail.includes("MVP") ||
    careerDetail.includes("챔피언") ||
    careerDetail.includes("1위")
  );
}
