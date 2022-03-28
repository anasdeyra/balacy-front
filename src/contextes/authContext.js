import useLocalstorage from "../hooks/useLocalstorage";
import { createContext } from "react";

export default authcontext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalstorage("user", null);
  function logout() {
    setUser(null);
  }
  return (
    <authcontext.Provider
      value={{ user, setUser, logout }}
      children={children}
    />
  );
}
