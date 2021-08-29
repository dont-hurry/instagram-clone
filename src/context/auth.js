import { createContext } from "react";

const AuthContext = createContext({ status: null, uid: null });

export default AuthContext;
