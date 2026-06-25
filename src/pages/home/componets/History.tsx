export const History = () => {
  return (
    <section className="w-10/12 md:4/5 mx-auto pb-10">
      <div className="border-b-2 border-b-base-200">
        <button className="uppercase btn btn-ghost border-b btn-sm border-b-yellow-50 rounded-none">
          history
        </button>
        <button className="uppercase btn btn-ghost border-b btn-sm">
          compare
        </button>
        <button className="uppercase btn btn-ghost border-b btn-sm">
          favorites
          <span className="bg-gray-400/30  text-yellow-50 p-1 rounded-full text-[8px]">
            30
          </span>
        </button>
        <button className="uppercase btn btn-ghost border-b btn-sm">
          log
          <span className="bg-gray-400/30  text-yellow-50 px-1.5 py-0.5 rounded-full text-[8px]">
            8
          </span>
        </button>
      </div>
      <div className="my-5 flex flex-col gap-4 md:flex-row justify-between items-center">
        <div className="grid grid-cols-4 gap-2 items-center justify-between">
          <div className="flex flex-col gap-2 bg-gray-900 p-2 md:p-3 md:pr-10 rounded-lg">
            <span className="text-xs uppercase">Open</span>
            <span className="text-gray-300">0.8516</span>
          </div>
          <div className="flex flex-col gap-2 bg-gray-900 p-2 md:p-3 md:pr-10 rounded-lg">
            <span className="text-xs uppercase">Open</span>
            <span className="text-gray-300">0.8516</span>
          </div>
          <div className="flex flex-col gap-2 bg-gray-900 p-2 md:p-3 md:pr-10 rounded-lg">
            <span className="text-xs uppercase">Open</span>
            <span className="text-gray-300">0.8516</span>
          </div>
          <div className="flex flex-col gap-2 bg-gray-900 p-2 md:p-3 md:pr-10 rounded-lg">
            <span className="text-xs uppercase">Open</span>
            <span className="text-gray-300">0.8516</span>
          </div>
        </div>
        <div className="bg-gray-900 rounded-md">
          <button className="btn btn-ghost  btn-sm">1D</button>
          <button className="btn btn-sm btn-ghost">1D</button>
          <button className="btn btn-sm btn-soft">1D</button>
          <button className="btn  btn-sm btn-ghost">1D</button>
          <button className="btn btn-sm btn-ghost">1D</button>
          <button className="btn btn-sm btn-ghost">1D</button>
        </div>
      </div>
      <div className="rounded-xl p-4 bg-gray-900">
        <div className="flex items-center justify-between">
          <span>USD/EUR</span>
          <span className="uppercase text-[10px]">
            6.8538 - May 14 16:00 cet
          </span>
        </div>
        <div className="flex mt-4">
          <div className="flex justify-between pb-6.5">
            <div className="flex flex-col justify-between text-[10px] border-r-2 border-r-base-200 pr-5">
              <span>9.8612</span>
              <span>9.8516</span>
              <span>9.8421</span>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full overflow-x-scroll h-60"></div>
            <div className="flex justify-between border-t-2 border-t-base-200 pt-3">
              <span className="capitalize text-[10px]">Apr 14</span>
              <span className="capitalize text-[10px]">Apr 21</span>
              <span className="capitalize text-[10px]">Apr 28</span>
              <span className="capitalize text-[10px]">May 06</span>
              <span className="capitalize text-[10px]">May 14</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
