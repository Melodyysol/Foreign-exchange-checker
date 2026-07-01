import { useContext } from "react";
import { SectionContext } from "../hook/useSection";

export const UseSection = () => {
  const sectionContext = useContext(SectionContext);
  if (!sectionContext) {
    throw new Error("UseSection must be used within a SectionProvider");
  }
  return sectionContext;
};
