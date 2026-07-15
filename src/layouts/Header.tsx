import { useState } from "react";
import { AnimatePresence } from "motion/react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import LogoIcon from "../assets/icons/logo.svg";
import MenuIcon from "../assets/icons/menu-icon.png";

export const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <header className="text-sm text-neutral-500 sticky top-0 bg-base-100 z-30">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="tooltip tooltip-bottom rounded-full mr-2 md:mr-10 cursor-pointer"
            type="button"
            data-tip="menu"
            onClick={() => setShowSidebar((prev) => !prev)}
          >
            <img
              src={MenuIcon}
              alt="menu icon"
              className="w-5 rounded-sm md:w-8"
            />
          </button>
          <div className="logo cursor-pointer w-30 sm:w-40 md:w-60">
            <img src={LogoIcon} alt="FX Checker" />
          </div>
        </div>
        <div className="uppercase text-xs md:text-lg">
          <small>30 Currencies · EOD · ECB data</small>
        </div>
      </div>
      <Navbar />
      <AnimatePresence mode="wait">
        {showSidebar && (
          <Sidebar key="sidebar" setShowSidebar={setShowSidebar} />
        )}
      </AnimatePresence>
    </header>
  );
};
