import App from "../App";
import AuthProvider from "../context/AuthContext";
import { SectionProvider } from "../context/SectionContext";
import { Toaster } from "sonner";

const ContextProvider = () => {
  return (
    <AuthProvider>
      <SectionProvider>
        <App />
        <Toaster
          position="top-right"
          richColors
          closeButton
          expand
          visibleToasts={4}
        />
      </SectionProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
