import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import type { Tab } from "../../../type/tabs";
import { fetchCurrencyHistory } from "../../../service/fetchCurrency";
import type { currencies } from "../../../utilities/currency";

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

const calculatedStartDate = (range: string) => {
  const now = new Date();

  switch (range) {
    case "1D":
      now.setDate(now.getDate() - 1);
      break;
    case "1W":
      now.setDate(now.getDate() - 7);
      break;
    case "1M":
      now.setMonth(now.getMonth() - 1);
      break;
    case "3M":
      now.setMonth(now.getMonth() - 3);
      break;
    case "1Y":
      now.setFullYear(now.getFullYear() - 1);
      break;
    case "5Y":
      now.setFullYear(now.getFullYear() - 5);
      break;
    default:
      now.setDate(now.getDate() - 1);
      break;
  }
  return now.toISOString().split("T")[0];
};
type Currency = (typeof currencies)[number];

type CurrencyProps = {
  sendCurrency: Currency;
  receiveCurrency: Currency;
};

const History = ({ sendCurrency, receiveCurrency }: CurrencyProps) => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [selectedRange, setSelectedRange] = useState("1W");

  const endDate = new Date().toISOString().split("T")[0];
  const startDate = calculatedStartDate(selectedRange);

  const { data: currencyHistory, isLoading } = useQuery({
    queryKey: ["currency-history", currentTab.tab, selectedRange],
    queryFn: () =>
      fetchCurrencyHistory(
        sendCurrency.code,
        receiveCurrency.code,
        startDate,
        endDate,
      ),
    enabled: currentTab.tab === "history",
    staleTime: 1000 * 60 * 30,
  });

  const chartPoints = currencyHistory?.rates
    ? Object.entries(currencyHistory.rates).map(
        ([date, rateOb]: [string, Record<string, number>]) => ({
          date,
          rate: rateOb["EUR"] ?? 0,
        }),
      )
    : [];

  const ratesArray = chartPoints.map((p) => p.rate);
  const maxRate = ratesArray.length ? Math.max(...ratesArray) : 1;
  const minRate = ratesArray.length ? Math.min(...ratesArray) : 0;
  const rangeDelta = maxRate - minRate || 1;

  const handleTabChange = (tab: Tab) => {
    const selectedTab = tabs.find((t) => t.tab === tab);
    if (selectedTab) {
      setCurrentTab(selectedTab);
    }
  };

  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
  };

  return (
    <section className="w-10/12 md:w-4/5 mx-auto pb-10">
      {/* Desktop Navigation */}
      <div className="border-b-2 border-b-base-200 hidden md:block">
        {tabs.map(({ tab, num }) => (
          <button
            key={tab}
            className={`uppercase btn border-b btn-sm ${currentTab.tab === tab ? "btn-soft" : "btn-ghost"}`}
            onClick={() => handleTabChange(tab)}
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

      {/* Mobile Navigation */}
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
      {/* Analytic Stat Headers */}
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
              onClick={() => handleRangeChange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      {/* Interactive Trend Chart */}
      <div className="rounded-xl p-4 bg-gray-900 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-200 font-semibold tracking-wide">
            USD/EUR Trend
          </span>
          <span className="uppercase text-[10px] text-gray-400">
            {chartPoints.length > 0
              ? `${chartPoints[chartPoints.length - 1].date}`
              : "Loading..."}
          </span>
        </div>
        <div className="flex mt-4">
          <div className="flex flex-col justify-between text-[10px] border-r-2 border-base-200 pr-4 pb-2.5 text-gray-400 h-60 min-w-12.5">
            <span>{maxRate.toFixed(4)}</span>
            <span>{((maxRate + minRate) / 2).toFixed(4)}</span>
            <span>{minRate.toFixed(4)}</span>
          </div>
          <div className="w-full pl-4 flex flex-col justify-between">
            {isLoading ? (
              <div className="h-60 flex items-center justify-center text-sm text-gray-500">
                Loading metrics...
              </div>
            ) : chartPoints.length === 0 ? (
              <div className="h-60 flex items-center justify-center text-sm text-gray-500">
                No chart data available We couldn't load rate history for [pair]
                right now. This usually clears up in a minute.
              </div>
            ) : (
              <div className="h-60 w-full relative bg-gray-950/40 rounded-lg border border-gray-800/40 overflow-hidden">
                {/* SVG Line Graph Canvas Component */}
                <svg
                  className="w-full h-full p-2"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d={chartPoints
                      .map((point, index) => {
                        const x = (index / (chartPoints.length - 1)) * 100;
                        // Invert Y scale calculation logic because SVG 0 coordinates start at the top
                        const y =
                          100 -
                          (((point.rate - minRate) / rangeDelta) * 80 + 10);
                        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
                      })
                      .join(" ")}
                    fill="none"
                    stroke="var(--color-primary, #3b82f6)" /* Fallback color fallback configuration logic */
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Invisible interactive hover nodes for data points */}
                <div className="absolute inset-0 flex justify-between p-2">
                  {chartPoints.map((point) => (
                    <div
                      key={point.date}
                      className="flex-1 h-full group relative cursor-crosshair"
                    >
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 border border-gray-700 text-white text-[9px] rounded p-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-30 mb-1 shadow-xl">
                        {point.date}:{" "}
                        <span className="text-info font-bold">
                          {point.rate.toFixed(4)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic Date Steps */}
            <div className="flex justify-between border-t-2 border-base-200 pt-3 text-gray-400 text-[10px]">
              {chartPoints.length > 1 ? (
                <>
                  <span>{chartPoints[0].date}</span>
                  <span>
                    {chartPoints[Math.floor(chartPoints.length / 2)].date}
                  </span>
                  <span>{chartPoints[chartPoints.length - 1].date}</span>
                </>
              ) : (
                <span className="w-full text-center">
                  Historical Timeline Window
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
