import App from "../App";
import AuthProvider from "../context/AuthContext";

const ContextProvider = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default ContextProvider;
