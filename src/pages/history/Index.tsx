import { useMemo, useState } from "react";

import { Header } from "../../layouts/Header";
import { currencies } from "../../utilities/currency";
import History from "./History";

const HistoryPage = () => {
  const [sendCurrency, setSendCurrency] = useState(currencies[0]);
  const [receiveCurrency, setReceiveCurrency] = useState(
    currencies[currencies.length - 1],
  );

  const summaryItems = useMemo(
    () => [
      {
        label: "Selected pair",
        value: `${sendCurrency.code}/${receiveCurrency.code}`,
      },
      {
        label: "Coverage",
        value: "Last 5 years",
      },
      {
        label: "Source",
        value: "ECB market data",
      },
    ],
    [receiveCurrency.code, sendCurrency.code],
  );

  return (
    <>
      <Header />
      <section className="w-11/12 md:w-4/5 mx-auto py-8 md:py-12 space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">
              History
            </p>
            <h1 className="text-3xl font-semibold text-white">
              Follow your chosen pair over time
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-400">
              Explore trend movement, compare ranges, and review the recent path
              of your selected currencies in a dedicated dashboard.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm text-gray-400">
              <span className="mb-2 block uppercase tracking-[0.25em]">
                From
              </span>
              <select
                value={sendCurrency.code}
                onChange={(event) => {
                  const selected = currencies.find(
                    (currency) => currency.code === event.target.value,
                  );
                  if (selected) {
                    setSendCurrency(selected);
                  }
                }}
                className="select select-bordered w-full bg-gray-950/70 text-white"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} · {currency.country}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm text-gray-400">
              <span className="mb-2 block uppercase tracking-[0.25em]">
                To
              </span>
              <select
                value={receiveCurrency.code}
                onChange={(event) => {
                  const selected = currencies.find(
                    (currency) => currency.code === event.target.value,
                  );
                  if (selected) {
                    setReceiveCurrency(selected);
                  }
                }}
                className="select select-bordered w-full bg-gray-950/70 text-white"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} · {currency.country}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {summaryItems.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-gray-800 bg-gray-900/80 p-4"
            >
              <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                {item.label}
              </p>
              <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>

        <History sendCurrency={sendCurrency} receiveCurrency={receiveCurrency} />
      </section>
    </>
  );
};

export default HistoryPage;
