import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchCurrencyHistory } from "../../service/fetchCurrency";
import { HistoryStats } from "./HistoryStats";
import { HistoryTabs } from "./HistoryTabs";
import { tabs } from "../../utilities/tabs";
import { calculatedStartDate } from "../../utilities/calculateStartDate";
import { HistoryChart } from "./HistoryChart";
import type { CurrencyProps } from "../../type/history";
import { toast } from "sonner";

const History = ({ sendCurrency, receiveCurrency }: CurrencyProps) => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [selectedRange, setSelectedRange] = useState("1W");

  const endDate = new Date().toISOString().split("T")[0];
  const startDate = calculatedStartDate(selectedRange);

  const {
    data: currencyHistory,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["currency-history", selectedRange],
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
          rate: rateOb[receiveCurrency.code] ?? 0,
        }),
      )
    : [];

  const latestRate = chartPoints[chartPoints.length - 1]?.rate ?? 0;
  const previousRate = chartPoints[chartPoints.length - 2]?.rate ?? latestRate;

  if (isError) {
    toast.error(`Error fetch History: ${error.message}`);
  }

  return (
    <section className="w-10/12 md:w-4/5 mx-auto pb-10">
      <HistoryTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {/* Analytic Stat Headers */}
      <HistoryStats
        setSelectedRange={setSelectedRange}
        selectedRange={selectedRange}
        latestRate={latestRate}
        previousRate={previousRate}
      />
      {/* Interactive Trend Chart */}
      <HistoryChart
        isLoading={isLoading}
        chartPoints={chartPoints}
        sendCurrency={sendCurrency}
        receiveCurrency={receiveCurrency}
      />
    </section>
  );
};

export default History;
