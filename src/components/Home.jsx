import React from "react";
import "./home.css";
import Product from "./Product";

const Home = () => {
  return (
    <div className="home">
      <div className="home_container">
        <img
          className="home_image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />

        <div className="home_row">
          <Product
            id="1"
            title="dog"
            image="https://picsum.photos/id/237/200/300"
            price={50}
            rating={5}
          />
          <Product
            id="2"
            title="dog"
            image="https://picsum.photos/id/237/200/300"
            price={50}
            rating={1}
          />
        </div>

        <div className="home_row">
          <Product
            id="13"
            title="dog"
            image="https://picsum.photos/id/237/200/300"
            price={50}
            rating={5}
          />
          <Product
            id="14"
            title="dog"
            image="https://picsum.photos/id/237/200/300"
            price={50}
            rating={5}
          />
          <Product
            id="15"
            title="dog"
            image="https://picsum.photos/id/237/200/300"
            price={50}
            rating={5}
          />
        </div>

        <div className="home_row">
          <Product
            id="16"
            title="dog"
            image="https://picsum.photos/id/237/200/300"
            price={50}
            rating={5}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
