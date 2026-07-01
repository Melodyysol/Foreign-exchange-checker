import { createContext } from "react";
import type { SectionContextType } from "../type/section";

export const SectionContext = createContext<SectionContextType | undefined>(
  undefined,
);
