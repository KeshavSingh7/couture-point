import React, { useState, useEffect } from "react";

import Base from "./Base";
import CardIND from "./Card";
import { motion } from "framer-motion";
import { Redirect } from "react-router";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, cartPrice, loadCart } from "./helper/CartHelper";
import { createOrder } from "./helper/orderHelper";
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [success, setSuccess] = useState(false);
  const price = cartPrice();
  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const handleClick = () => {
    const { user, token } = isAuthenticated();
    Object.values(products);
    console.log(products);
    if (user === undefined || token === undefined) {
      console.log("token expired please login again!");
      return;
    }
    createOrder(user._id, token, products)
      .then((data) => {
        setSuccess(true);
        cartEmpty();
      })
      .catch((err) => console.log(err));
  };
  const getAredirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };

  const loadAllProducts = () => {
    return (
      <>
        {products && isAuthenticated() && (
          <div className="flex justify-end ">
            <div
              className=" p-3 bg-green-500 cursor-pointer rounded-md"
              onClick={handleClick}
            >
              Proceed to checkout : &#8377; {price}
            </div>
          </div>
        )}
        <div className="grid justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  auto-rows-auto gap-6">
          {products
            ? products.map((product, index) => {
                return (
                  <div key={index} className="w-max mx-auto">
                    <CardIND
                      product={product}
                      addToCart={false}
                      removeFromCart={true}
                      setReload={setReload}
                      reload={reload}
                    />
                  </div>
                );
              })
            : "No Products Availabe Here "}
        </div>
      </>
    );
  };

  return (
    <Base title="CART" description="">
      <p className="font-custom2 text-lg p-2 text-custom-shade3 text-center underline">
        PRODUCTS IN YOUR CART
      </p>
      {getAredirect(success)}
      <motion.div layout>{loadAllProducts()}</motion.div>
    </Base>
  );
};
export default Cart;
