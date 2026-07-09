import { useEffect, useState } from "react";

import { fetchCurrency } from "../service/fetchCurrency";

type Market = {
  pair: string;
  price: number;
  change: number;
};

const initialMarkets: Market[] = [
  { pair: "USD/JPY", price: 157.91, change: 0.84 },
  { pair: "EUR/USD", price: 1.0842, change: -0.22 },
  { pair: "GBP/USD", price: 1.2754, change: 0.18 },
  { pair: "USD/NGN", price: 1580.5, change: -0.05 },
];

const Navbar = () => {
  const [markets, setMarkets] = useState<Market[]>(initialMarkets);

  useEffect(() => {
    const updateMarkets = async () => {
      const marketUpdates = await Promise.all(
        initialMarkets.map(async (market) => {
          const [from, to] = market.pair.split("/");

          try {
            const data = await fetchCurrency(1, from, to);
            const latestPrice = Number(data?.rates?.[to] ?? 0);

            return {
              pair: market.pair,
              price: latestPrice,
              change: market.price
                ? ((latestPrice - market.price) / market.price) * 100
                : 0,
            };
          } catch {
            return market;
          }
        }),
      );

      setMarkets(marketUpdates);
    };

    updateMarkets();
    const intervalId = window.setInterval(updateMarkets, 15000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <nav className="flex">
      <span className="bg-accent text-black font-bold px-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        LIVE MARKETS
      </span>
      <div className="flex-1 overflow-hidden bg-gray-900">
        <div className="overflow-hidden bg-gray-900">
          <div className="flex w-max animate-marquee">
            {[...markets, ...markets].map((market, i) => (
              <div
                key={`${market.pair}-${i}`}
                className="flex items-center gap-3 px-5 whitespace-nowrap"
              >
                <span>{market.pair}</span>
                <span>{market.price.toFixed(market.pair.includes("USD") ? 2 : 4)}</span>
                <span
                  className={market.change > 0 ? "text-success" : "text-error"}
                >
                  {market.change > 0 ? "▲" : "▼"} {market.change.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
