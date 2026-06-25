// import { Navbar } from "./Navbar"
import LogoImage from "../assets/icons/logo.svg";
import ChevronDropImage from "../assets/icons/icon-chevron-down.svg";

export const Header = () => {
  return (
    <header className="text-sm text-neutral-500">
      <div className="p-4 flex items-center justify-between">
        <div className="logo cursor-pointer">
          <img src={LogoImage} alt="image-logo" />
        </div>
        <div className="uppercase text-[10px] md:text-xs">
          <small>55 currencies . eod . ecb data</small>
        </div>
      </div>
      <div className="flex justify-between">
        <span className="bg-accent text-neutral-950 text-xs px-4 py-1 uppercase font-bold">
          . Live Markets
        </span>
        <div className="overflow-x-scroll flex items-center bg-gray-900 scrollbar-none">
          <span className="text-red-600 text-xs px-4 py-1 border-r border-r-black">
            -0.14%
          </span>
          <div className="flex gap-2 px-3 py-1 text-xs">
            <span>USD/JPY</span>
            <span>157.91</span>
            <img
              src={ChevronDropImage}
              alt="Chevron raise image"
              className="rotate-180"
            />{" "}
            <span>+0.84%</span>
          </div>
          <div className="flex gap-2 px-3 py-1 text-xs">
            <span>USD/JPY</span>
            <span>157.91</span>
            <img
              src={ChevronDropImage}
              alt="Chevron raise image"
              className="rotate-180"
            />{" "}
            <span>+0.84%</span>
          </div>
          <div className="flex gap-2 px-3 py-1 text-xs">
            <span>USD/JPY</span>
            <span>157.91</span>
            <img
              src={ChevronDropImage}
              alt="Chevron raise image"
              className="rotate-180"
            />{" "}
            <span>+0.84%</span>
          </div>
          <div className="flex gap-2 px-3 py-1 text-xs">
            <span>USD/JPY</span>
            <span>157.91</span>
            <img
              src={ChevronDropImage}
              alt="Chevron raise image"
              className="rotate-180"
            />{" "}
            <span>+0.84%</span>
          </div>
          <div className="flex gap-2 px-3 py-1 text-xs">
            <span>USD/JPY</span>
            <span>157.91</span>
            <img
              src={ChevronDropImage}
              alt="Chevron raise image"
              className="rotate-180"
            />{" "}
            <span>+0.84%</span>
          </div>
          <div className="flex gap-2 px-3 py-1 text-xs">
            <span>USD/JPY</span>
            <span>157.91</span>
            <img
              src={ChevronDropImage}
              alt="Chevron raise image"
              className="rotate-180"
            />{" "}
            <span>+0.84%</span>
          </div>
        </div>
      </div>
    </header>
  );
};
