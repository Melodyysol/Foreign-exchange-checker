const LoadingCompare = () => {
  return (
    <>
      <section className="w-11/12 md:w-4/5 mx-auto py-8 md:py-12 space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">
              Compare rates
            </p>
            <h1 className="animate-pulse bg-gray-700 w-72 h-10 my-5 rounded-full"></h1>
            <p className="my-2 animate-pulse bg-gray-500 w-40 h-5 rounded-full"></p>
          </div>
          <button
            type="button"
            className="btn btn-outline btn-sm animate-pulse bg-gray-700 md:w-40"
          ></button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5 shadow-2xl shadow-black/20">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-gray-400">
                <span className="uppercase tracking-[0.25em]">Amount</span>
                <input
                  type="number"
                  min="1"
                  disabled
                  className="input input-bordered w-full bg-gray-600/70 text-white animate-pulse"
                />
              </label>

              <label className="space-y-2 text-sm text-gray-400">
                <span className="uppercase tracking-[0.25em]">From</span>
                <select
                  disabled
                  className="select select-bordered w-full bg-gray-600 text-white animate-pulse"
                ></select>
              </label>

              <label className="space-y-2 text-sm text-gray-400 md:col-span-2">
                <span className="uppercase tracking-[0.25em]">To</span>
                <select disabled className="select select-bordered w-full bg-gray-600 text-white animate-pulse"></select>
              </label>
            </div>

            <div className="mt-6 rounded-xl border border-accent/20 bg-accent/10 p-4">
              <p className="text-sm uppercase tracking-[0.3em] text-accent">
                Preview
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white"></h2>
              <p className="mt-2 text-sm text-gray-300"></p>
            </div>
          </div>

          <div className="space-y-4"></div>
        </div>
      </section>
    </>
  );
};
export default LoadingCompare;
