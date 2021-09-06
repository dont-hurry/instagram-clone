import { createContext } from "react";

const UserContext = createContext({ status: null, uid: null, userInfo: null });

export default UserContext;
