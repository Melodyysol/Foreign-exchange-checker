import { Header } from "../../layouts/Header";
import ErrorImage from "../../assets/images/notFound.avif";

const ErrorUrl = () => {
  return (
    <>
      <Header />
      <main className="flex items-center justify-center h-screen">
        <div>
          <img src={ErrorImage} alt="error Image" className="rounded-full max-w-96 max-h-96" />
        </div>
      </main>
    </>
  );
};

export default ErrorUrl;
