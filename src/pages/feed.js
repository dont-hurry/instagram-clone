import { useState } from "react";
import Navigation from "../components/Navigation";

export default function Feed() {
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
      <Navigation isNavMenuActive={isNavMenuActive} />
    </div>
  );
}
