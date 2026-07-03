const stats = [
  { title: "Open", value: "0.8516" },
  { title: "Last", value: "0.8516" },
  { title: "Change", value: "+0.0014", color: "text-green-500" },
  { title: "% Change", value: "▲ +0.16%", color: "text-green-500" },
];
const ranges = ["1D", "1W", "1M", "3M", "1Y", "5Y"];

export const HistoryStats = ({
  setSelectedRange,
  selectedRange,
}: {
  setSelectedRange: (range: string) => void;
  selectedRange: string;
}) => {
  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
  };

  return (
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
  );
};
