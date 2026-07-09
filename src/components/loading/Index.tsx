import { Header } from "../../layouts/Header";

export const LoadingPage = () => {
  return (
    <>
      <Header />
      <main className="h-screen flex justify-center items-center flex-col">
        <div className="loading loading-ring loading-xl w-32"></div>
        <h1 className="animate animate-pulse text-lg">Loading...</h1>
      </main>
    </>
  );
};
