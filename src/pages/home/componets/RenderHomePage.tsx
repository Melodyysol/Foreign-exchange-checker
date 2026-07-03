import { useState } from "react";
import { currencies } from "../../../utilities/currency";
import { Exchange } from "./Exchange";
import History from "../../history/History";

export const RenderHomePage = () => {
  const [sendCurrency, setSendCurrency] = useState(currencies[0]);
  const [receiveCurrency, setReceiveCurrency] = useState(
    currencies[currencies.length - 1],
  );
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
