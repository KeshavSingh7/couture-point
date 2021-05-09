import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";

const CardIND = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);

  const addtoCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getAredirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const show_alert = () => {};
  const cardTitle = product ? product.name : "a photoo from pexels";
  const cardDescription = product
    ? product.discription
    : "a photoo from pexels";
  const cardPrice = product ? product.price : "a photoo from pexels";

  const ShowAddToCart = (addToCart) => {
    return (
      addToCart && (
        <div className="col-12">
          <button
            onClick={addtoCart}
            className="btn btn-outline-success mt-2 mb-2"
          >
            Add to Cart
          </button>
        </div>
      )
    );
  };

  const ShowRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <div className="">
          <button
            onClick={() => {
              removeItemFromCart(product._id);
              setReload(!reload);
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-5"
          >
            Remove from cart
          </button>
        </div>
      )
    );
  };
  return (
    <>
      <div style={{ width: "auto", marginBottom: "3em" }}>
        <ImageHelper product={product} />
        {getAredirect(redirect)}
        <div>
          <div>{cardTitle}</div>
          <div>{cardDescription}</div>
          <div>Price : ${cardPrice}</div>

          {ShowAddToCart(addToCart)}
          {ShowRemoveFromCart(removeFromCart)}
        </div>
      </div>
    </>
  );
};

export default CardIND;
