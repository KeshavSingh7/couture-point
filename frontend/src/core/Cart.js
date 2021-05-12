import userEvent from "@testing-library/user-event";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { isAuthenticated } from "../auth/helper";
// import "../styles.css";
import Base from "./Base";
import CardIND from "./Card";
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
    // console.log(products);
    return (
      <>
        {/* <h2>Products availabble in your cart are</h2> */}
        <div className="text-center">
          {products && (
            <div
              className="flex justify-end bg-green-500 cursor-pointer "
              onClick={handleClick}
            >
              {price}
            </div>
          )}
          <div className="flex flex-row justify-center flex-wrap">
            {products ? (
              products.map((product, index) => {
                return (
                  <div key={index}>
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
            ) : (
              <div className="">
                Your Cart is empty Please add some Products
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <Base title="Cart page" description="Ready to checkout">
      {/* <div className="row text-center">
        <div className="col-6">{loadCheckout()}</div>
      </div> */}
      {getAredirect(success)}

      <div>{loadAllProducts()}</div>
    </Base>
  );
};
export default Cart;
