import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionContext } from "../hook/useSection";

export const SectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentSection, setCurrentSection] = useState<string>("converter");

  const navigate = useNavigate();

  const handleSectionChange = (section: string) => {
    if (section === "settings") {
      navigate("/settings");
    }
    setCurrentSection(section);
  };

  return (
    <SectionContext.Provider value={{ currentSection, handleSectionChange }}>
      {children}
    </SectionContext.Provider>
  );
};
