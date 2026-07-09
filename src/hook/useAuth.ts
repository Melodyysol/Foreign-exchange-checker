import { createContext } from "react";
import type { AuthContextType } from "../type/auth";


export const AuthContext = createContext<undefined | AuthContextType>(
  undefined,
);
