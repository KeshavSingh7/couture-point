import React, { useState, useEffect } from "react";

import "../Assets/CSS/Main.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { motion } from 'framer-motion';

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
    <Base title="HOME" description="WELCOME TO THE PERFECT FASHION DESTINATION">
        <motion.div layout className="flex flex-row justify-around lg:justify-between flex-wrap">
          {products.map((product) => {
            return (
              <div className="" key={product._id}>
                <Card product={product} />
              </div>
            );
          })}
        </motion.div>
    </Base>
  );
};
export default Home;