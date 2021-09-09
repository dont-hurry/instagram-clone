import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getUserInfoByUsername } from "../services/firebase";
import NavigationLayout from "../components/layout/navigation";
import Loading from "../components/icons/Loading";
import NotFound from "../components/NotFound";

export default function Profile() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(true);

  useEffect(() => {
    (async () => {
      const returnedUserInfo = await getUserInfoByUsername(username);
      setUserInfo(returnedUserInfo);
      setIsLoadingUserInfo(false);
    })();
  }, [username]);

  useEffect(() => {
    if (isLoadingUserInfo) return;

    const title = userInfo
      ? `${userInfo.fullName} (@${userInfo.username})`
      : "Page Not Found";
    document.title = `${title} - Instagram`;
  }, [isLoadingUserInfo, userInfo]);

  if (isLoadingUserInfo) {
    return <Loading />;
  }

  if (!userInfo) {
    return (
      <NavigationLayout>
        <NotFound />
      </NavigationLayout>
    );
  }

  return (
    <div>
      <div>
        <div>Avatar</div>
        <div>{JSON.stringify(userInfo)}</div>
      </div>
      <div>Posts</div>
    </div>
  );
}
