import "./Header.scss";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import MillyMoney from "/images/logos/MillyMoney.png";

import { NavLinks } from "../../../data/navLinks";

const Header = () => {
  const [activeTab, setActiveTab] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="container header-container mt">
      <Link onClick={() => setActiveTab("")} to="/">
        <img src={MillyMoney} alt="Fannos Logo" />
      </Link>
      <div className="d-flex p-2 align-items-center  gap-3">
        <nav className="d-none d-md-flex header-nav-links gap-3">
          {NavLinks.map(({ id, name, route }) => (
            <Link key={id} onClick={() => setActiveTab(name)} to={route}>
              <span
                className={
                  activeTab == name
                    ? "activeTab nav-links mx-1"
                    : "nav-links mx-1"
                }
              >
                {name}
              </span>
            </Link>
          ))}
        </nav>
        <div className="d-flex gap-3 align-items-center justify-content-center">
          <FontAwesomeIcon
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="d-md-none cursor-pointer"
            icon={showMobileMenu ? faClose : faBars}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
