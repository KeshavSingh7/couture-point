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
  // const show_alert = () => {};
  const cardTitle = product ? product.name : "a photoo from pexels";
  const cardDescription = product
    ? product.discription
    : "a photoo from pexels";
  const cardPrice = product ? product.price : "a photo from pexels";

  const ShowAddToCart = (addToCart) => {
    return (
      addToCart && (
          <button
            onClick={addtoCart}
            className="btn"
          >
            Add to Cart
          </button>
      )
    );
  };

  const ShowRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
          <button
            onClick={() => {
              removeItemFromCart(product._id);
              setReload(!reload);
            }}
            className="btn"
          >
            Remove from cart
          </button>
      )
    );
  };
  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-lg my-4 font-custom2">
        <ImageHelper product={product} />
        {getAredirect(redirect)}
        <div className="product-description p-2">
          <p className="text-custom-shade4 text-2xl font-custom1 font-semibold">{cardTitle}</p>
          <p className="text-custom-shade3">{cardDescription}</p>
          <p className="text-custom-shade3">Price : ${cardPrice}</p>
        </div>
        <div className="p-2 text-center">
          {ShowAddToCart(addToCart)}
          {ShowRemoveFromCart(removeFromCart)}
        </div>
      </div>
    </>
  );
};

export default CardIND;
