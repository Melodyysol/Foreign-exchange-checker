import type { tabs } from "../utilities/tabs";

export type Tab = "history" | "compare" | "favorites" | "log";

export type CurrentTab = (typeof tabs)[number];

export type TabProps = {
  currentTab: CurrentTab;
  setCurrentTab: (tab: CurrentTab) => void;
};
