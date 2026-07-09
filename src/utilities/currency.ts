import AUFlag from "../assets/images/flags/au.webp";
import BGFlag from "../assets/images/flags/bg.webp";
import BRFlag from "../assets/images/flags/br.webp";
import CAFlag from "../assets/images/flags/ca.webp";
import CHFlag from "../assets/images/flags/ch.webp";
import CNFlag from "../assets/images/flags/cn.webp";
import CZFlag from "../assets/images/flags/cz.webp";
import DKFlag from "../assets/images/flags/dk.webp";
import EURFlag from "../assets/images/flags/eu.webp";
import GBPFlag from "../assets/images/flags/gb.webp";
import HKFlag from "../assets/images/flags/hk.webp";
import HUFlag from "../assets/images/flags/hu.webp";
import IDFlag from "../assets/images/flags/id.webp";
import INFlag from "../assets/images/flags/in.webp";
import ISFlag from "../assets/images/flags/is.webp";
import JPFlag from "../assets/images/flags/jp.webp";
import KRFlag from "../assets/images/flags/kr.webp";
import MXFlag from "../assets/images/flags/mx.webp";
import MYFlag from "../assets/images/flags/my.webp";
import NOFlag from "../assets/images/flags/no.webp";
import NZFlag from "../assets/images/flags/nz.webp";
import PHFlag from "../assets/images/flags/ph.webp";
import PLFlag from "../assets/images/flags/pl.webp";
import ROFlag from "../assets/images/flags/ro.webp";
import SEFlag from "../assets/images/flags/se.webp";
import SGFlag from "../assets/images/flags/sg.webp";
import THFlag from "../assets/images/flags/th.webp";
import TRFlag from "../assets/images/flags/tr.webp";
import USDFlag from "../assets/images/flags/us.webp";
import ZAFlag from "../assets/images/flags/za.webp";

// Only currencies actually supported by the Frankfurter API (ECB reference rates).
// See: https://frankfurter.dev/currencies/
export const currencies = [
  { code: "AUD", country: "Australia", flag: AUFlag },
  { code: "BGN", country: "Bulgaria", flag: BGFlag },
  { code: "BRL", country: "Brazil", flag: BRFlag },
  { code: "CAD", country: "Canada", flag: CAFlag },
  { code: "CHF", country: "Switzerland", flag: CHFlag },
  { code: "CNY", country: "China", flag: CNFlag },
  { code: "CZK", country: "Czech Republic", flag: CZFlag },
  { code: "DKK", country: "Denmark", flag: DKFlag },
  { code: "EUR", country: "Europe", flag: EURFlag },
  { code: "GBP", country: "United Kingdom", flag: GBPFlag },
  { code: "HKD", country: "Hong Kong", flag: HKFlag },
  { code: "HUF", country: "Hungary", flag: HUFlag },
  { code: "IDR", country: "Indonesia", flag: IDFlag },
  { code: "INR", country: "India", flag: INFlag },
  { code: "ISK", country: "Iceland", flag: ISFlag },
  { code: "JPY", country: "Japan", flag: JPFlag },
  { code: "KRW", country: "South Korea", flag: KRFlag },
  { code: "MXN", country: "Mexico", flag: MXFlag },
  { code: "MYR", country: "Malaysia", flag: MYFlag },
  { code: "NOK", country: "Norway", flag: NOFlag },
  { code: "NZD", country: "New Zealand", flag: NZFlag },
  { code: "PHP", country: "Philippines", flag: PHFlag },
  { code: "PLN", country: "Poland", flag: PLFlag },
  { code: "RON", country: "Romania", flag: ROFlag },
  { code: "SEK", country: "Sweden", flag: SEFlag },
  { code: "SGD", country: "Singapore", flag: SGFlag },
  { code: "THB", country: "Thailand", flag: THFlag },
  { code: "TRY", country: "Turkey", flag: TRFlag },
  { code: "USD", country: "United States", flag: USDFlag },
  { code: "ZAR", country: "South Africa", flag: ZAFlag },
];
