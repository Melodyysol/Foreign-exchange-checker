import Images from "../../../assets/images/flags/ae.webp";
import ExchangeIcon from "../../../assets/icons/icon-exchange.svg";
import ExchangeVerticalIcon from "../../../assets/icons/icon-exchange-vertical.svg";
import StarIcon from "../../../assets/icons/icon-star.svg";
import FilledStarIcon from "../../../assets/icons/icon-star-filled.svg";
import { useState } from "react";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { fetchCurrency } from "../../../service/fetchCurrency";

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
  const [amount, setAmount] = useState(1000);
  const [sendCurrency, setSendCurrency] = useState(currencies[0]);
  const [receiveCurrency, setReceiveCurrency] = useState(
    currencies[currencies.length - 1],
  );
  const [favorite, setFavorite] = useState(false);

  const swapCurrencies = () => {
    setSendCurrency(receiveCurrency);
    setReceiveCurrency(sendCurrency);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchCurrency(sendCurrency.code, receiveCurrency.code);
  };

  return (
    <section className="w-10/12 md:4/5 mx-auto py-10">
      <h1 className="mb-5 text-gray-200">CHECK THE RATE</h1>
      <section className="rounded-xl p-4 bg-gray-900">
        <div className="flex gap-4 flex-col md:flex-row items-center justify-between">
          <div className="shadow shadow-3xl shadow-gray-600 p-2 rounded-md flex-1 w-full">
            <label htmlFor="send currency" className="text-xs">
              SEND
            </label>
            <div className="flex justify-between items-center relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="input w-20 my-2 outline-none border-none"
              />
              <Listbox value={sendCurrency} onChange={setSendCurrency}>
                <ListboxButton className="btn btn-ghost">
                  <img src={sendCurrency.flag} className="w-6 rounded-full" />
                  {sendCurrency.code}
                </ListboxButton>
                <ListboxOptions className="menu bg-base-100 rounded-box shadow-lg mt-2 w-64 absolute right-0 top-12 z-20">
                  {currencies.map((currency) => (
                    <ListboxOption key={currency.code} value={currency}>
                      <div className="flex items-center gap-3 p-2 cursor-pointer hover:bg-base-200">
                        <img src={currency.flag} className="w-6 rounded-full" />
                        <div>
                          <p>{currency.code}</p>
                          <small>{currency.country}</small>
                        </div>
                      </div>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>
          </div>
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
          <div className="shadow shadow-3xl shadow-gray-600 p-2 rounded-md flex-1 w-full">
            <label htmlFor="receive currency" className="text-xs uppercase">
              receive
            </label>
            <div className="flex justify-between items-center relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="input w-20 my-2 outline-none border-none bg-transparent text-info text-2xl"
              />

              <Listbox value={receiveCurrency} onChange={setReceiveCurrency}>
                <ListboxButton className="btn btn-ghost z-10">
                  <img
                    src={receiveCurrency.flag}
                    alt={receiveCurrency.country}
                    className="w-6 rounded-full"
                  />
                  {receiveCurrency.code}
                </ListboxButton>
                <ListboxOptions className="menu bg-base-100 rounded-box shadow-lg mt-2 w-64 absolute right-0 top-10">
                  {currencies.map((currency) => (
                    <ListboxOption key={currency.code} value={currency}>
                      <div className="flex items-center gap-3 p-2 cursor-pointer hover:bg-base-200">
                        <img src={currency.flag} className="w-6 rounded-full" />
                        <div>
                          <p>{currency.code}</p>
                          <small>{currency.country}</small>
                        </div>
                      </div>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between md:flex-row mt-5 items-center gap-2 border-t border-t-base-100 pt-3">
          <div>
            <span>
              {amount} {sendCurrency.code} = 0.8538 {receiveCurrency.code}
            </span>
            <small className="text-[8px] text-secondary ml-2">
              Updated 2 minutes ago
            </small>
          </div>
          <form className="flex gap-2" onSubmit={handleSubmit}>
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
              className="uppercase btn btn-xs border border-accent"
            >
              log Conversion
            </button>
          </form>
        </div>
      </section>
    </section>
  );
};
