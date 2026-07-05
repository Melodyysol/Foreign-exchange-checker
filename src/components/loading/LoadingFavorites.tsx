const LoadingFavorites = () => {
  return (
    <>
      <section className="w-11/12 md:w-4/5 mx-auto py-8 md:py-12 space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="bg-gray-700 w-60 rounded-full h-3 animate-pulse mb-5"></p>
            <h1 className="bg-gray-700 w-72 rounded-full h-3 animate-pulse"></h1>
            <p className="bg-gray-700 w-32 rounded-full h-3 animate-pulse mt-5"></p>
          </div>
          <button
            type="button"
            className="btn btn-outline btn-sm animate-pulse bg-gray-700 w-40"
          ></button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-5 shadow-lg shadow-black/20">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.25em] text-accent">
                Saved pair
              </p>
              <div className="text-gray-500 loading loading-spinner"></div>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-white flex items-center gap-2">
              <p className="bg-gray-600 animate-pulse w-20 h-10 rounded-full"></p>{" "}
              →{" "}
              <p className="bg-gray-600 animate-pulse w-20 h-10 rounded-full"></p>
            </h2>
            <p className="mt-2 bg-gray-700 animate-pulse rounded-full w-64 h-8"></p>
            <button
              type="button"
              className="btn btn-sm btn-outline mt-4 bg-gray-700 animate-pulse w-full"
            ></button>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoadingFavorites;
