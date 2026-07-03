export const HistoryChart = ({
  isLoading,
  chartPoints,
  sendCurrency,
  receiveCurrency,
}: {
  isLoading: boolean;
  chartPoints: { date: string; rate: number }[];
  sendCurrency: {
    code: string;
    country: string;
    flag: string;
  };
  receiveCurrency: {
    code: string;
    country: string;
    flag: string;
  };
}) => {
  const rateArray = chartPoints.map((p) => p.rate);
  const maxRate = rateArray.length ? Math.max(...rateArray) : 1;
  const minRate = rateArray.length ? Math.min(...rateArray) : 0;
  const rangeDelta = maxRate - minRate || 1;

  return (
    <div className="rounded-xl p-4 bg-gray-900 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-200 font-semibold tracking-wide">
          {isLoading ? (
            <div className="loading loading-infinity"></div>
          ) : (
            `${sendCurrency.code}/${receiveCurrency.code}`
          )}
        </span>
        <span className="uppercase text-[10px] text-gray-400">
          {chartPoints.length > 0 ? (
            `${chartPoints[chartPoints.length - 1].date}`
          ) : (
            <div className="loading loading-spinner"></div>
          )}
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
                        100 - (((point.rate - minRate) / rangeDelta) * 80 + 10);
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
  );
};
