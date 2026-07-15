import type { Tab } from "../types/tabs";

export const tabs: { tab: Tab; num?: number }[] = [
  { tab: "history" },
  { tab: "compare" },
  { tab: "favorites", num: 30 },
  { tab: "log", num: 8 },
];
