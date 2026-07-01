import App from "../App";
import AuthProvider from "../context/AuthContext";
import { SectionProvider } from "../context/SectionContext";

const ContextProvider = () => {
  return (
    <AuthProvider>
      <SectionProvider>
        <App />
      </SectionProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
