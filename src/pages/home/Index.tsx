import { LoadingPage } from "../../components/loading/Index";
import useAuth from "../../custom-hook/UseAuth";
import { Header } from "../../layouts/Header";
import { RenderHomePage } from "./components/RenderHomePage";

const Index = () => {
  const { loading } = useAuth();
  if (loading) {
    return <LoadingPage />;
  }
  return (
    <>
      <Header />
      <RenderHomePage />
    </>
  );
};
export default Index;
