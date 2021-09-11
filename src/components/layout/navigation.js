import { useState } from "react";
import Navigation from "../Navigation";

export default function NavigationLayout({ children }) {
  const [isDropdownMenuActive, setIsDropdownMenuActive] = useState(false);

  // Make the dropdown menu close when clicking on empty space
  const handlePageClick = (event) => {
    if (event.target.dataset.toggleNavMenu) {
      setIsDropdownMenuActive((prevState) => !prevState);
    } else {
      setIsDropdownMenuActive(false);
    }
  };

  return (
    <div onClick={handlePageClick}>
      <Navigation isDropdownMenuActive={isDropdownMenuActive} />
      {children}
    </div>
  );
}
