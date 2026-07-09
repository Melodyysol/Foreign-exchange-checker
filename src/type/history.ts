import type { currencies } from "../utilities/currency";

export type Currency = (typeof currencies)[number];

export type CurrencyProps = {
  sendCurrency: Currency;
  receiveCurrency: Currency;
};
