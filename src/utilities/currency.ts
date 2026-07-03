import AEFlag from "../assets/images/flags/ae.webp";
import ARFlag from "../assets/images/flags/ar.webp";
import AUFlag from "../assets/images/flags/au.webp";
import BDFlag from "../assets/images/flags/bd.webp";
import BGFlag from "../assets/images/flags/bg.webp";
import BHFlag from "../assets/images/flags/bh.webp";
import BRFlag from "../assets/images/flags/br.webp";
import CAFlag from "../assets/images/flags/ca.webp";
import CHFlag from "../assets/images/flags/ch.webp";
import CLFlag from "../assets/images/flags/cl.webp";
import CNFlag from "../assets/images/flags/cn.webp";
import COFlag from "../assets/images/flags/co.webp";
import CYFlag from "../assets/images/flags/cy.webp";
import CZFlag from "../assets/images/flags/cz.webp";
import DKFlag from "../assets/images/flags/dk.webp";
import EGFlag from "../assets/images/flags/eg.webp";
import EURFlag from "../assets/images/flags/eu.webp";
import GBPFlag from "../assets/images/flags/gb.webp";
import HKFlag from "../assets/images/flags/hk.webp";
import HMFlag from "../assets/images/flags/hm.webp";
import HNFlag from "../assets/images/flags/hn.webp";
import HRFlag from "../assets/images/flags/hr.webp";
import HTFlag from "../assets/images/flags/ht.webp";
import HUFlag from "../assets/images/flags/hu.webp";
import IDFlag from "../assets/images/flags/id.webp";
import INFlag from "../assets/images/flags/in.webp";
import ISFlag from "../assets/images/flags/is.webp";
import JOFlag from "../assets/images/flags/jo.webp";
import JPFlag from "../assets/images/flags/jp.webp";
import KEFlag from "../assets/images/flags/ke.webp";
import KRFlag from "../assets/images/flags/kr.webp";
import KWFlag from "../assets/images/flags/kw.webp";
import LBFlag from "../assets/images/flags/lb.webp";
import LCFlag from "../assets/images/flags/lc.webp";
import LKFlag from "../assets/images/flags/lk.webp";
import MAFlag from "../assets/images/flags/ma.webp";
import MXFlag from "../assets/images/flags/mx.webp";
import MYFlag from "../assets/images/flags/my.webp";
import NGNFlag from "../assets/images/flags/ng.webp";
import NOFlag from "../assets/images/flags/no.webp";
import NPFlag from "../assets/images/flags/np.webp";
import NZFlag from "../assets/images/flags/nz.webp";
import OMFlag from "../assets/images/flags/om.webp";
import PEFlag from "../assets/images/flags/pe.webp";
import PHFlag from "../assets/images/flags/ph.webp";
import PKFlag from "../assets/images/flags/pk.webp";
import PLFlag from "../assets/images/flags/pl.webp";
import QAFlag from "../assets/images/flags/qa.webp";
import ROFlag from "../assets/images/flags/ro.webp";
import RUFlag from "../assets/images/flags/ru.webp";
import SAFlag from "../assets/images/flags/sa.webp";
import SEFlag from "../assets/images/flags/se.webp";
import SGFlag from "../assets/images/flags/sg.webp";
import THFlag from "../assets/images/flags/th.webp";
import TRFlag from "../assets/images/flags/tr.webp";
import TWFlag from "../assets/images/flags/tw.webp";
import UAFlag from "../assets/images/flags/ua.webp";
import USDFlag from "../assets/images/flags/us.webp";
import VNFlag from "../assets/images/flags/vn.webp";
import ZAFlag from "../assets/images/flags/za.webp";


// Import the currency data from the JSON file
export const currencies = [
  { code: "AED", country: "United Arab Emirates", flag: AEFlag },
  { code: "ARS", country: "Argentina", flag: ARFlag },
  { code: "AUD", country: "Australia", flag: AUFlag },
  { code: "BDT", country: "Bangladesh", flag: BDFlag },
  { code: "BGN", country: "Bulgaria", flag: BGFlag },
  { code: "BHD", country: "Bahrain", flag: BHFlag },
  { code: "BRL", country: "Brazil", flag: BRFlag },
  { code: "CAD", country: "Canada", flag: CAFlag },
  { code: "CHF", country: "Switzerland", flag: CHFlag },
  { code: "CLP", country: "Chile", flag: CLFlag },
  { code: "CNY", country: "China", flag: CNFlag },
  { code: "COP", country: "Colombia", flag: COFlag },
  { code: "CYP", country: "Cyprus", flag: CYFlag },
  { code: "CZK", country: "Czech Republic", flag: CZFlag },
  { code: "DKK", country: "Denmark", flag: DKFlag },
  { code: "EGP", country: "Egypt", flag: EGFlag },
  { code: "EUR", country: "Europe", flag: EURFlag },
  { code: "GBP", country: "United Kingdom", flag: GBPFlag },
  { code: "HKD", country: "Hong Kong", flag: HKFlag },
  { code: "AUD", country: "Heard Island", flag: HMFlag },
  { code: "HNL", country: "Honduras", flag: HNFlag },
  { code: "HRK", country: "Croatia", flag: HRFlag },
  { code: "HTG", country: "Haiti", flag: HTFlag },
  { code: "HUF", country: "Hungary", flag: HUFlag },
  { code: "IDR", country: "Indonesia", flag: IDFlag },
  { code: "INR", country: "India", flag: INFlag },
  { code: "ISK", country: "Iceland", flag: ISFlag },
  { code: "JOD", country: "Jordan", flag: JOFlag },
  { code: "JPY", country: "Japan", flag: JPFlag },
  { code: "KES", country: "Kenya", flag: KEFlag },
  { code: "KRW", country: "South Korea", flag: KRFlag },
  { code: "KWD", country: "Kuwait", flag: KWFlag },
  { code: "LBP", country: "Lebanon", flag: LBFlag },
  { code: "XCD", country: "Saint Lucia", flag: LCFlag },
  { code: "LKR", country: "Sri Lanka", flag: LKFlag },
  { code: "MAD", country: "Morocco", flag: MAFlag },
  { code: "MXN", country: "Mexico", flag: MXFlag },
  { code: "MYR", country: "Malaysia", flag: MYFlag },
  { code: "NGN", country: "Nigeria", flag: NGNFlag },
  { code: "NOK", country: "Norway", flag: NOFlag },
  { code: "NPR", country: "Nepal", flag: NPFlag },
  { code: "NZD", country: "New Zealand", flag: NZFlag },
  { code: "OMR", country: "Oman", flag: OMFlag },
  { code: "PEN", country: "Peru", flag: PEFlag },
  { code: "PHP", country: "Philippines", flag: PHFlag },
  { code: "PKR", country: "Pakistan", flag: PKFlag },
  { code: "PLN", country: "Poland", flag: PLFlag },
  { code: "QAR", country: "Qatar", flag: QAFlag },
  { code: "RON", country: "Romania", flag: ROFlag },
  { code: "RUB", country: "Russia", flag: RUFlag },
  { code: "SAR", country: "Saudi Arabia", flag: SAFlag },
  { code: "SEK", country: "Sweden", flag: SEFlag },
  { code: "SGD", country: "Singapore", flag: SGFlag },
  { code: "THB", country: "Thailand", flag: THFlag },
  { code: "TRY", country: "Turkey", flag: TRFlag },
  { code: "TWD", country: "Taiwan", flag: TWFlag },
  { code: "UAH", country: "Ukraine", flag: UAFlag },
  { code: "USD", country: "United States", flag: USDFlag },
  { code: "VND", country: "Vietnam", flag: VNFlag },
  { code: "ZAR", country: "South Africa", flag: ZAFlag },
];
