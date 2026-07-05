import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Header } from "../../layouts/Header";
import { fetchCurrency } from "../../service/fetchCurrency";
import { currencies } from "../../utilities/currency";
import { instruction } from "./constant";
import useAuth from "../../custom-hook/UseAuth";
import LoadingCompare from "../../components/loading/LoadingCompare";
import { toast } from "sonner";

const uniqueCurrencies = Array.from(
  new Map(currencies.map((currency) => [currency.code, currency])).values(),
);

const Compare = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(1000);
  const [fromCode, setFromCode] = useState("USD");
  const [toCode, setToCode] = useState("EUR");

  const { loading: loadingSupabase } = useAuth();

  const {
    data: comparison,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["compare", amount, fromCode, toCode],
    queryFn: () => fetchCurrency(amount, fromCode, toCode),
    enabled: amount > 0 && fromCode !== toCode,
  });

  const convertedAmount = comparison?.rates?.[toCode] ?? 0;

  const stats = useMemo(
    () => [
      {
        label: "Estimated rate",
        value: `${(convertedAmount / amount || 0).toFixed(4)} ${toCode}`,
      },
      {
        label: "Converted amount",
        value: `${convertedAmount.toFixed(2)} ${toCode}`,
      },
      {
        label: "Market status",
        value: "Live · updated now",
      },
    ],
    [amount, convertedAmount, toCode],
  );

  if (isError) {
    return toast.error(`Error fetching data: ${error}`);
  }

  if (loadingSupabase) {
    return <LoadingCompare />;
  }

  return (
    <>
      <Header />
      <section className="w-11/12 md:w-4/5 mx-auto py-8 md:py-12 space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">
              Compare rates
            </p>
            <h1 className="text-3xl font-semibold text-white">
              Measure two currencies side by side
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-400">
              {instruction}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn btn-outline btn-sm"
          >
            Back to converter
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5 shadow-2xl shadow-black/20">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-gray-400">
                <span className="uppercase tracking-[0.25em]">Amount</span>
                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(event) => setAmount(Number(event.target.value))}
                  className="input input-bordered w-full bg-gray-950/70 text-white"
                />
              </label>

              <label className="space-y-2 text-sm text-gray-400">
                <span className="uppercase tracking-[0.25em]">From</span>
                <select
                  value={fromCode}
                  onChange={(event) => setFromCode(event.target.value)}
                  className="select select-bordered w-full bg-gray-950 text-white"
                >
                  {uniqueCurrencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} · {currency.country}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 text-sm text-gray-400 md:col-span-2">
                <span className="uppercase tracking-[0.25em]">To</span>
                <select
                  value={toCode}
                  onChange={(event) => setToCode(event.target.value)}
                  className="select select-bordered w-full bg-gray-950 text-white"
                >
                  {uniqueCurrencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} · {currency.country}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-6 rounded-xl border border-accent/20 bg-accent/10 p-4">
              <p className="text-sm uppercase tracking-[0.3em] text-accent">
                Preview
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                {isLoading
                  ? "Checking rate..."
                  : `${amount} ${fromCode} = ${convertedAmount.toFixed(2)} ${toCode}`}
              </h2>
              <p className="mt-2 text-sm text-gray-300">
                {fromCode} to {toCode} conversion is ready for review.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-gray-800 bg-gray-900/80 p-4"
              >
                <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                  {stat.label}
                </p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Compare;
