
import LogoImage from "../assets/icons/logo.svg";
import Navbar from "./widget/Navbar";

export const Header = () => {
  return (
    <header className="text-sm text-neutral-500">
      <div className="p-4 flex items-center justify-between">
        <div className="logo cursor-pointer w-30 sm:w-40 md:w-60">
          <img src={LogoImage} alt="FX Checker" />
        </div>
        <div className="uppercase text-xs md:text-lg">
          <small>55 Currencies · EOD · ECB data</small>
        </div>
      </div>
      <Navbar />
    </header>
  );
};
