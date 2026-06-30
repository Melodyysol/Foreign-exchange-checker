import { useState } from "react";
import type { Tab } from "../../../type/tabs";

const tabs: { tab: Tab; num?: number }[] = [
  { tab: "history" },
  { tab: "compare" },
  { tab: "favorites", num: 30 },
  { tab: "log", num: 8 },
];

const stats = [
  { title: "Open", value: "0.8516" },
  { title: "Last", value: "0.8516" },
  { title: "Change", value: "+0.0014", color: "text-green-500" },
  { title: "% Change", value: "▲ +0.16%", color: "text-green-500" },
];
const ranges = ["1D", "1W", "1M", "3M", "1Y", "5Y"];
const TabDetail = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [selectedRange, setSelectedRange] = useState("1D");

  return (
    <section className="w-10/12 md:4/5 mx-auto pb-10">
      <div className="border-b-2 border-b-base-200 hidden md:block">
        {tabs.map(({ tab, num }) => (
          <button
            key={tab}
            className={`uppercase btn border-b btn-sm ${currentTab.tab === tab ? "btn-soft" : "btn-ghost"}`}
            onClick={() => setCurrentTab({ tab, num })}
          >
            {tab}
            {num && (
              <span className="bg-gray-400/30  text-yellow-50 px-1.5 py-0.5 rounded-full text-[8px]">
                {num}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="dropdown dropdown-end w-full md:hidden">
        <button
          tabIndex={0}
          type="button"
          className="cursor-pointer uppercase btn btn-block btn-sm btn-soft gap-2"
        >
          {currentTab.tab}
          {currentTab.num ? (
            <span className="bg-gray-400/30  text-yellow-50 px-1.5 py-0.5 rounded-full text-[8px]">
              {currentTab.num}
            </span>
          ) : (
            ""
          )}
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content z-10 menu shadow bg-base-200 rounded-box w-full gap-2"
        >
          {tabs.map((t) => (
            <li
              key={t.tab}
              className="uppercase flex flex-row items-center gap-1 cursor-pointer hover:bg-base-300 p-2"
              value={t.tab}
              onClick={() => setCurrentTab(t)}
            >
              {t.tab}
              {t.num ? (
                <span className="bg-gray-400/30  text-yellow-50 px-1.5 py-0.5 rounded-full text-[8px]">
                  {t.num}
                </span>
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="my-5 flex flex-col gap-4 md:flex-row justify-between items-start md:items-center">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-center justify-between w-full">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="flex flex-col gap-2 bg-gray-900 p-3 rounded-lg"
            >
              <span className="text-xs uppercase">{stat.title}</span>
              <span className={`${stat.color ? stat.color : "text-gray-300"}`}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>
        <div className="bg-gray-900 rounded-md whitespace-nowrap">
          {ranges.map((range) => (
            <button
              key={range}
              className={`btn btn-md ${range === selectedRange ? "btn-soft" : "btn-ghost"}`}
              onClick={() => setSelectedRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-xl p-4 bg-gray-900">
        <div className="flex items-center justify-between">
          <span className="text-base-content">USD/EUR</span>
          <span className="uppercase text-[10px]">
            6.8538 - May 14 16:00 cet
          </span>
        </div>
        <div className="flex mt-4">
          <div className="flex justify-between pb-6.5">
            <div className="flex flex-col justify-between text-[10px] border-r-2 border-r-base-200 pr-5">
              <span>9.8612</span>
              <span>9.8516</span>
              <span>9.8421</span>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full overflow-x-scroll h-60"></div>
            <div className="flex justify-between border-t-2 border-t-base-200 pt-3">
              <span className="capitalize text-[10px]">Apr 14</span>
              <span className="capitalize text-[10px]">Apr 21</span>
              <span className="capitalize text-[10px]">Apr 28</span>
              <span className="capitalize text-[10px]">May 06</span>
              <span className="capitalize text-[10px]">May 14</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabDetail;
