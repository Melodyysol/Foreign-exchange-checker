import { useState } from "react";
import { currencies } from "../../../utilities/currency";
import { Exchange } from "../../converter/Exchange";
import History from "../../history/History";

export const RenderHomePage = () => {
  const fromCurrency =
    currencies.find((currency) => currency.code === "USD") || currencies[0];
  const toCurrency =
    currencies.find((currency) => currency.code === "EUR") ||
    currencies[currencies.length - 1];

  const [sendCurrency, setSendCurrency] = useState(fromCurrency);
  const [receiveCurrency, setReceiveCurrency] = useState(toCurrency);
  return (
    <main className="text-sm text-gray-400">
      <Exchange
        sendCurrency={sendCurrency}
        setSendCurrency={setSendCurrency}
        receiveCurrency={receiveCurrency}
        setReceiveCurrency={setReceiveCurrency}
      />
      <History sendCurrency={sendCurrency} receiveCurrency={receiveCurrency} />
    </main>
  );
};
