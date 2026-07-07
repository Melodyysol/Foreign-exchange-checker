import { Header } from "../layouts/Header";
import ErrorImage from "../assets/images/flags/ng.webp";

const ErrorPage = () => {
  return (
    <>
      <Header />
      <main className="flex items-center justify-center h-screen">
        <div>
          <img src={ErrorImage} alt="error Image" className="rounded-full" />
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
