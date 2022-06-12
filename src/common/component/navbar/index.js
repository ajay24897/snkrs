import React from "react";
import DesktopNav from "./desktop";
import MobileNavigation from "./mobile";

function Navbar() {
  return (
    <div>
      <DesktopNav />
      <MobileNavigation />
    </div>
  );
}

export default Navbar;
