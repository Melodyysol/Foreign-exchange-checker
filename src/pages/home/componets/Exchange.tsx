import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import { fetchCurrency } from "../../../service/fetchCurrency";

import Images from "../../../assets/images/flags/ae.webp";
import ExchangeIcon from "../../../assets/icons/icon-exchange.svg";
import ExchangeVerticalIcon from "../../../assets/icons/icon-exchange-vertical.svg";
import StarIcon from "../../../assets/icons/icon-star.svg";
import FilledStarIcon from "../../../assets/icons/icon-star-filled.svg";
import { supabase } from "../../../lib/supabase";
import useAuth from "../../../custom-hook/UseAuth";
import { useNavigate } from "react-router-dom";

const currencies = [
  {
    code: "USD",
    country: "United States",
    flag: Images,
  },
  {
    code: "EUR",
    country: "Europe",
    flag: Images,
  },
  {
    code: "GBP",
    country: "United Kingdom",
    flag: Images,
  },
];

export const Exchange = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState(1000);
  const [sendCurrency, setSendCurrency] = useState(currencies[0]);
  const [receiveCurrency, setReceiveCurrency] = useState(
    currencies[currencies.length - 1],
  );
  const [favorite, setFavorite] = useState(false);

  const { user } = useAuth();

  // TanStack Query using amount directly
  const { data: product, isLoading } = useQuery({
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      alert("Login to continue");
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
      alert("Error inserting log" + logError);
    }
    if (favorite) {
      const { error: favoriteError } = await supabase.from("favorites").insert({
        user_id: user.id,
        base_currency: sendCurrency.code,
        target_currency: receiveCurrency.code,
        created_at: new Date().toISOString(),
      });
      if (favoriteError) {
        alert("Error inserting favorites" + favoriteError);
      }
    }
  };

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
                <ListboxOptions className="bg-gray-800 border border-gray-700 rounded-box shadow-xl mt-2 w-64 absolute right-0 top-12 z-20 p-1">
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
                <ListboxOptions className="bg-gray-800 border border-gray-700 rounded-box shadow-xl mt-2 w-64 absolute right-0 top-12 z-20 p-1">
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
            <span>
              {amount} {sendCurrency.code} ={" "}
              {isLoading ? "..." : calcultedAmount.toFixed(2)}{" "}
              {receiveCurrency.code}
            </span>
            <small className="text-[8px] text-secondary ml-2">
              Updated 2 minutes ago
            </small>
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
