const ranges = ["1D", "1W", "1M", "3M", "1Y", "5Y"];

export const HistoryStats = ({
  setSelectedRange,
  selectedRange,
  latestRate,
  previousRate,
}: {
  setSelectedRange: (range: string) => void;
  selectedRange: string;
  latestRate: number;
  previousRate: number;
}) => {
  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
  };

  const change = latestRate - previousRate;
  const changePercent = previousRate > 0 ? (change / previousRate) * 100 : 0;
  const isPositive = change >= 0;

  const stats = [
    { title: "Open", value: previousRate.toFixed(4) },
    { title: "Last", value: latestRate.toFixed(4) },
    {
      title: "Change",
      value: `${isPositive ? "+" : ""}${change.toFixed(4)}`,
      color: isPositive ? "text-green-500" : "text-red-500",
    },
    {
      title: "% Change",
      value: `${isPositive ? "▲" : "▼"} ${changePercent.toFixed(2)}%`,
      color: isPositive ? "text-green-500" : "text-red-500",
    },
  ];

  return (
    <div className="my-5 flex flex-col gap-4 md:flex-row justify-between items-start md:items-center">
      <div className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-center justify-between">
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
  );
};
