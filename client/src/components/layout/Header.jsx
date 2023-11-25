import { FiMoon } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import tfodd from "../../assets/tfodd.png"

const Header = () => {
  return (
    <header className="l-header" id="header">
      <nav className="nav bd-container">
        <Link href="/" className="nav__logo flex items-center">
          <img src={tfodd} alt="" className="h-20 w-20" />
        </Link>

        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/" className="nav__link active-link">
                Home
              </Link>
            </li>
            <li className="nav__item">
              <a href="#about" className="nav__link">
                About
              </a>
            </li>
            <li className="nav__item">
              <a href="#menu" className="nav__link">
                Menu
              </a>
            </li>
            <li className="nav__item">
              <a href="#reservation" className="nav__link">
                Reservations
              </a>
            </li>

            {/* <li className="nav__item">
              <FiMoon/>
            </li> */}
          </ul>
        </div>

        <div className="nav__toggle" id="nav-toggle">
          <GiHamburgerMenu/>
        </div>
      </nav>
    </header>
  );
};

export default Header;
