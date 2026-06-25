import Images from "../../../assets/images/flags/ae.webp";
import ExchangeIcon from "../../../assets/icons/icon-exchange.svg";
import ExchangeVerticalIcon from "../../../assets/icons/icon-exchange-vertical.svg";
import StarIcon from "../../../assets/icons/icon-star.svg";

export const Exchange = () => {
  return (
    <section className="w-10/12 md:4/5 mx-auto py-10">
      <h1 className="mb-5 text-gray-200">CHECK THE RATE</h1>
      <section className="rounded-xl p-4 bg-gray-900">
        <div className="flex gap-4 flex-col md:flex-row items-center justify-between">
          <div className="shadow shadow-3xl shadow-gray-600 p-2 rounded-md flex-1 w-full">
            <span className="text-xs">SEND</span>
            <div className="flex justify-between items-center">
              <span>1,000</span>
              <select
                name="send-currency"
                id="send-currency"
                className="select select-sm cursor-pointer w-18"
              >
                {Array.from({ length: 20 }, () => (
                  <option>
                    <img
                      src={Images}
                      alt="currency"
                      className="w-5 rounded-full"
                    />
                    <span className="text-xs uppercase">USD</span>
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="shadow shadow-3xl shadow-gray-600 p-2 rounded-md hidden md:block">
            <img src={ExchangeIcon} alt="Exchange vertical icon" />
          </div>
          <div className="shadow shadow-3xl shadow-gray-600 p-2 rounded-md md:hidden">
            <img src={ExchangeVerticalIcon} alt="Exchange vertical icon" />
          </div>
          <div className="shadow shadow-3xl shadow-gray-600 p-2 rounded-md flex-1 w-full">
            <span className="text-xs uppercase">receive</span>
            <div className="flex justify-between items-center">
              <span className="text-yellow-200 text-2xl md:text-3xl">
                853.02
              </span>
              <select
                name="send-currency"
                id="send-currency"
                className="select select-sm cur w-18 cursor-pointer"
              >
                {Array.from({ length: 20 }, () => (
                  <option>
                    <img
                      src={Images}
                      alt="currency"
                      className="w-5 rounded-full"
                    />
                    <span className="text-xs uppercase">EUR</span>
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between md:flex-row mt-5 items-center gap-2 border-t border-t-base-100 pt-3">
          <div>
            <span>1 USD = 0.8538 EUR</span>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-accent btn-xs">
              <img src={StarIcon} alt="star Icon" className="w-3" />
              <span>FAVORITED</span>
            </button>
            <button className="uppercase btn btn-xs border border-accent">
              log Conversation
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};
