import { useContext } from "react";
import { UserContext } from "../context/user";
import NavigationLayout from "../components/layout/navigation";
import Settings from "../components/Settings";

export default function Setting() {
  const userContext = useContext(UserContext);

  return (
    <NavigationLayout>
      {userContext.userInfo && (
        <Settings
          userInfo={userContext.userInfo}
          setUserInfo={userContext.setUserInfo}
        />
      )}
    </NavigationLayout>
  );
}
