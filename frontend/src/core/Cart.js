import React, { useState, useEffect } from "react";
// import "../styles.css";
import Base from "./Base";
import CardIND from "./Card";
import { loadCart } from "./helper/CartHelper";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);
  const loadAllProducts = () => {
    // console.log(products);
    return (
      <>
        <p className="font-custom2 text-lg p-2 text-custom-shade3 text-center underline">PRODUCTS IN YOUR CART</p>
        <div className="grid justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  auto-rows-auto gap-6">
          {products.map((product, index) => {
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
          })}
        </div>
      </>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2>this section for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="CART" description="">
      {/* <div className="row text-center">
        <div className="col-6">{loadCheckout()}</div>
      </div> */}
      <div>{loadAllProducts()}</div>
    </Base>
  );
};
export default Cart;
