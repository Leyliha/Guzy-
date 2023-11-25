import { BiLogoTwitter } from "react-icons/bi";
import { FiFacebook, FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
 <footer className="footer section bd-container">
            <div className="footer__container bd-grid">
                <div className="footer__content">
                    <a href="#" className="footer__logo">Turkmen food</a>
                    <span className="footer__description">Restaurant</span>
                    <div className="flex">
                        <a href="#" className="footer__social"><FiFacebook color="black" size={19}/></a>
                        <a href="#" className="footer__social"><FiInstagram color="black" size={20}/></a>
                        <a href="#" className="footer__social"><BiLogoTwitter  color="black" size={22}/></a>
                    </div>
                </div>

                <div className="footer__content">
                    <h3 className="footer__title">Services</h3>
                    <ul>
                        <li><a href="#" className="footer__link">Delivery</a></li>
                        <li><a href="#" className="footer__link">Pricing</a></li>
                        <li><a href="#" className="footer__link">Fast food</a></li>
                        <li><a href="#" className="footer__link">Reserve your spot</a></li>
                    </ul>
                </div>

                <div className="footer__content">
                    <h3 className="footer__title">Information</h3>
                    <ul>
                        <li><a href="#" className="footer__link">Event</a></li>
                        <li><a href="#" className="footer__link">Contact us</a></li>
                        <li><a href="#" className="footer__link">Privacy policy</a></li>
                        <li><a href="#" className="footer__link">Terms of services</a></li>
                    </ul>
                </div>

                <div className="footer__content">
                    <h3 className="footer__title">Adress</h3>
                    <ul className="flex flex-col gap-2">
                        <li>Turkmenistan - Ashgabat</li>
                        <li>T.Tayliyev</li>
                        <li>36-36-01</li>
                        <li>turkmenfood@email.com</li>
                    </ul>
                </div>
            </div>

            <p className="footer__copy">&#169; 2022 Annageldiyeva Leyli. Bon Appetite</p>
        </footer>
  );
};

export default Footer;
