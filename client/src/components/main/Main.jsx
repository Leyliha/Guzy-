import taamdyr from "../../assets/taamdyr.jpg";
import corek from "../../assets/corek.png";
import "../../index.css";
import { useEffect, useState } from "react";
import { publicRequest } from "../../utilities/request";
import { Link } from "react-router-dom";
import Slider from "../slider/Slider";

import Book from "../book/Book";
import NewReview from "../review/NewReview";
import GetReservation from "../book/GetReservation";

const Main = () => {
  const [dishes, setDishes] = useState([]);
  const [modal, setModal] = useState(false);
  const [review, setReview] = useState(false);
  const [reserve, setReserve] = useState(false);
  useEffect(() => {
    async function getDishes() {
      try {
        const res = await publicRequest.get("/api/product/find?new=new");
        setDishes(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDishes();
  }, []);
  return (
    <main className="l-main">
      <section className="home" id="home">
        <div className="home__container bd-container bd-grid">
          <div className="home__data">
            <h1 className="home__title"> Guzy </h1>
            <h2 className="home__subtitle">
              Try the best food of <br /> Turkmen cuisine.
            </h2>
            <div className=" grid grid-cols-2 grid-flow-row gap-2">
              <Link to="/menu" className="button">
                View Menu
              </Link>
              <a href="#" onClick={() => setModal(true)} className="button">
                Book a Table
              </a>
              <a href="#" className="button" onClick={() => setReview(true)}>
                Leave a Review
              </a>
              <a href="#menu" className="button">
                Order
              </a>
            </div>
          </div>

          <img src={taamdyr} alt="" className="home__img" />
        </div>
      </section>
      <hr className="h-1 bg-[#29ab87] w-[960px] mx-auto" />
      <section className="about section bd-container" id="about">
        <div className="about__container  bd-grid">
          <div className="about__data">
            <h2 className="section-title about__initial">
              We cook the best <br /> Turkmen food
            </h2>
            <p className="about__description">
            Welcome to Guzy, where culinary excellence meets cultural richness. Immerse yourself in a gastronomic journey that celebrates the vibrant flavors of Tnurkmen food, curated with care and passion.  
            </p>
            <a href="/reviews" className="button">
              See reviews
            </a>
          </div>
          <img src={corek} alt="" className="about__img" />
        </div>
      </section>
      <hr className="h-1 bg-[#29ab87] w-[960px] mx-auto" />
      <section
        className="menu section bd-container flex items-center flex-col"
        id="menu"
      >
        
        <h2 className="section-title">Menu </h2>
        <Slider slides={dishes} />
      </section>
      <hr className="h-1 bg-[#29ab87] w-[960px] mx-auto" />
      <section className="contact section bd-container" id="reservation">
        <div className="contact__container bd-grid">
          <div className="contact__data">
            <span className="section-subtitle contact__initial">
              See your reservations !
            </span>
            <h2 className="section-title contact__initial">Send the code!</h2>
            <p className="contact__description">
              If you want to see your reservation information in our restaurant,
              send us the code you get when booked a table and we will attend
              you quickly.
            </p>
          </div>

          <div className="contact__button">
            <a href="#" onClick={() => setReserve(true)} className="button">
              See reservations now
            </a>
          </div>
        </div>
      </section>
      <hr className="h-1 bg-[#29ab87] w-[960px] mx-auto" />
      {modal ? <Book setModal={setModal} /> : null}
      {review ? <NewReview setModal={setReview} /> : null}
      {reserve ? <GetReservation setModal={setReserve} /> : null}
    </main>
  );
};

export default Main;
