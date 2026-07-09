import App from "../App";
import AuthProvider from "../context/AuthContext";
import { Toaster } from "sonner";

const ContextProvider = () => {
  return (
    <AuthProvider>
      <App />
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand
        visibleToasts={4}
      />
    </AuthProvider>
  );
};

export default ContextProvider;
