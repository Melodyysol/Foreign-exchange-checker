import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import useAuth from "../../../custom-hook/UseAuth";
import { currencies } from "../../../utilities/currency";

import { fetchCurrency } from "../../../service/fetchCurrency";

import ExchangeIcon from "../../../assets/icons/icon-exchange.svg";
import ExchangeVerticalIcon from "../../../assets/icons/icon-exchange-vertical.svg";
import StarIcon from "../../../assets/icons/icon-star.svg";
import FilledStarIcon from "../../../assets/icons/icon-star-filled.svg";
import { toast } from "sonner";

type Currency = (typeof currencies)[number];

type CurrencyProps = {
  sendCurrency: Currency;
  setSendCurrency: (cur: Currency) => void;
  receiveCurrency: Currency;
  setReceiveCurrency: (cur: Currency) => void;
};

export const Exchange = ({
  sendCurrency,
  setSendCurrency,
  receiveCurrency,
  setReceiveCurrency,
}: CurrencyProps) => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState(1000);

  const [favorite, setFavorite] = useState(false);

  const { user } = useAuth();

  // TanStack Query using amount directly
  const {
    data: product,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["currency", amount, sendCurrency.code, receiveCurrency.code],
    queryFn: () =>
      fetchCurrency(amount, sendCurrency.code, receiveCurrency.code),
    enabled: amount > 0 && sendCurrency.code !== receiveCurrency.code,
  });

  // Swap currencies function
  const swapCurrencies = () => {
    setSendCurrency(receiveCurrency);
    setReceiveCurrency(sendCurrency);
  };

  const calcultedAmount = product?.rates[receiveCurrency.code] || 0;

  const statusLabel = useMemo(() => {
    if (isLoading) {
      return "Live • updating...";
    }

    if (product) {
      const timeLabel = new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
      return `Live • updated at ${timeLabel}`;
    }

    return "Live • waiting for rate";
  }, [isLoading, product]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error("Login to continue");
      navigate("/login");
      return { success: false };
    }
    const { error: logError } = await supabase.from("conversion_logs").insert({
      user_id: user.id,
      amount: amount,
      converted_amount: product?.amount,
      base_currency: sendCurrency.code,
      target_currency: receiveCurrency.code,
      created_at: new Date().toISOString(),
      exchange_rate: amount > 0 ? calcultedAmount / amount : 0,
    });
    if (logError) {
      toast.error("Error inserting log" + logError);
      return;
    }
    toast.success("Log conversion successful");
    if (favorite) {
      const { data: existingFavorite, error } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("base_currency", sendCurrency.code)
        .eq("target_currency", receiveCurrency.code)
        .maybeSingle();

      if (error) {
        console.log("Error checking existing data: " + error);
        return;
      }

      if (existingFavorite) {
        toast.error("Already in the favourite");
        return;
      }
      const { error: favoriteError } = await supabase.from("favorites").insert({
        user_id: user.id,
        base_currency: sendCurrency.code,
        target_currency: receiveCurrency.code,
        created_at: new Date().toISOString(),
      });
      if (favoriteError) {
        toast.error("Error inserting favorites" + favoriteError);
      }
      toast.success("Conversion added to favorites");
    }
  };

  if (isError) {
    toast.error(`Error fetching data: ${error}`);
    return;
  }

  return (
    <section className="w-10/12 md:4/5 mx-auto py-10">
      <h1 className="mb-5 text-gray-200">CHECK THE RATE</h1>
      <form onSubmit={handleSubmit} className="rounded-xl p-4 bg-gray-900">
        <div className="flex gap-4 flex-col md:flex-row items-center justify-between">
          {/* Send Currency Section */}
          <div className="shadow shadow-3xl shadow-gray-600 p-2 rounded-md flex-1 w-full">
            <label htmlFor="send currency" className="text-xs">
              SEND
            </label>
            <div className="flex justify-between items-center relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                className="input w-20 my-2 outline-none border-none bg-transparent"
                min="0"
              />
              <Listbox value={sendCurrency} onChange={setSendCurrency}>
                <ListboxButton className="btn btn-ghost flex items-center gap-2 text-white">
                  <img
                    src={sendCurrency.flag}
                    className="w-6 h-6 rounded-full object-cover"
                    alt=""
                  />
                  {sendCurrency.code}
                </ListboxButton>
                <ListboxOptions className="bg-gray-800 border border-gray-700 rounded-box shadow-xl mt-2 w-64 absolute right-0 top-12 z-20 p-1 overflow-y-scroll max-h-60">
                  {currencies.map((currency) => (
                    <ListboxOption key={currency.code} value={currency}>
                      <div className="flex items-center gap-3 p-2 cursor-pointer rounded-md hover:bg-gray-700 text-white">
                        <img
                          src={currency.flag}
                          className="w-6 h-6 rounded-full object-cover"
                          alt=""
                        />
                        <div>
                          <p className="font-medium">{currency.code}</p>
                          <small className="text-gray-400 block text-xs">
                            {currency.country}
                          </small>
                        </div>
                      </div>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>
          </div>

          {/*Swap Button Section */}
          <button
            type="button"
            onClick={swapCurrencies}
            className="shadow shadow-3xl shadow-gray-600 p-2 rounded-md hidden md:block cursor-pointer active:scale-90 hover:border-primary hover:border transition-all duration-300"
          >
            <img src={ExchangeIcon} alt="Exchange vertical icon" />
          </button>
          <button
            type="button"
            onClick={swapCurrencies}
            className="shadow shadow-3xl shadow-gray-600 p-2 rounded-md md:hidden cursor-pointer active:scale-90 hover:border-primary hover:border transition-all duration-300"
          >
            <img src={ExchangeVerticalIcon} alt="Exchange vertical icon" />
          </button>

          {/* Receive Currency Section */}

          <div className="shadow shadow-3xl shadow-gray-600 p-2 rounded-md flex-1 w-full">
            <label htmlFor="receive currency" className="text-xs uppercase">
              receive
            </label>
            <div className="flex justify-between items-center relative">
              <input
                type="number"
                readOnly
                value={isLoading ? "" : calcultedAmount.toFixed(2)}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                className={`input w-25 my-2 outline-none border-none text-info text-2xl ${isLoading ? "bg-gray-700 animate-pulse" : "bg-transparent"}`}
              />

              <Listbox value={receiveCurrency} onChange={setReceiveCurrency}>
                <ListboxButton className="btn btn-ghost flex items-center gap-2 text-white">
                  <img
                    src={receiveCurrency.flag}
                    className="w-6 h-6 rounded-full object-cover"
                    alt=""
                  />
                  {receiveCurrency.code}
                </ListboxButton>
                <ListboxOptions className="bg-gray-800 border border-gray-700 rounded-box shadow-xl mt-2 w-64 absolute right-0 top-12 z-20 p-1 overflow-y-scroll max-h-60">
                  {currencies.map((currency) => (
                    <ListboxOption key={currency.code} value={currency}>
                      <div className="flex items-center gap-3 p-2 cursor-pointer rounded-md hover:bg-gray-700 text-white">
                        <img
                          src={currency.flag}
                          className="w-6 h-6 rounded-full object-cover"
                          alt=""
                        />
                        <div>
                          <p className="font-medium">{currency.code}</p>
                          <small className="text-gray-400 block text-xs">
                            {currency.country}
                          </small>
                        </div>
                      </div>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>
          </div>
        </div>

        {/* Conversion Result and Buttons Section */}
        <div className="flex flex-col justify-between md:flex-row mt-5 items-center gap-2 border-t border-t-base-100 pt-3">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
              <span>{statusLabel}</span>
            </div>
            <span className="mt-1 block text-sm text-gray-400">
              {amount} {sendCurrency.code} = {isLoading ? "..." : calcultedAmount.toFixed(2)} {receiveCurrency.code}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-accent btn-xs uppercase"
              type="button"
              onClick={() => setFavorite((prev) => !prev)}
            >
              <img
                src={favorite ? FilledStarIcon : StarIcon}
                alt="star Icon"
                className="w-3"
              />
              <span>{favorite ? "favorited" : "favorite"}</span>
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="uppercase btn btn-xs border border-accent"
            >
              log Conversion
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
