import { createContext } from "react";

export const UserContext = createContext({
  status: null,
  uid: null,
  userInfo: null,
});

export default function UserContextProvider({
  status,
  uid,
  userInfo,
  setUserInfo,
  children,
}) {
  return (
    <UserContext.Provider value={{ status, uid, userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
