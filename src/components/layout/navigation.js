import { useContext, useState } from "react";
import UserContext from "../../context/user";
import Navigation from "../Navigation";

export default function NavigationLayout({ children }) {
  const userContext = useContext(UserContext);
  const username = userContext.userInfo ? userContext.userInfo.username : null;

  const [isNavMenuActive, setIsNavMenuActive] = useState(false);

  // Make the menu close when clicking on empty space
  const handlePageClick = (event) => {
    if (event.target.dataset.toggleNavMenu) {
      setIsNavMenuActive((prevState) => !prevState);
    } else {
      setIsNavMenuActive(false);
    }
  };

  return (
    <div onClick={handlePageClick}>
      <Navigation isNavMenuActive={isNavMenuActive} username={username} />
      {children}
    </div>
  );
}
