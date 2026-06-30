const markets = [
  {
    pair: "USD/JPY",
    price: 157.91,
    change: 0.84,
  },
  {
    pair: "EUR/USD",
    price: 1.0842,
    change: -0.22,
  },
  {
    pair: "GBP/USD",
    price: 1.2754,
    change: 0.18,
  },
  {
    pair: "USD/NGN",
    price: "1580.50",
    change: -0.05,
  },
];
const Navbar = () => {
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
                key={i}
                className="flex items-center gap-3 px-5 whitespace-nowrap"
              >
                <span>{market.pair}</span>
                <span>{market.price}</span>
                <span
                  className={market.change > 0 ? "text-success" : "text-error"}
                >
                  {market.change > 0 ? "▲" : "▼"} {market.change}%
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
