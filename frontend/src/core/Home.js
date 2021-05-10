import React, { useState, useEffect } from "react";

import "../Assets/CSS/Main.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base title="HOME" description="welcome to the Brand new Tshirt store">
      <div className=" ">
        <div className="flex flex-row justify-center flex-wrap">
          {products.map((product) => {
            return (
              <div key={product._id}>
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};
export default Home;
