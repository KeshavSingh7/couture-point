import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getProducts, deleteProduct } from "./helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getProducts(token).then((data) => {
      if (data?.error) {
        console.log(data?.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };
  return (
    <Base title="MANAGE PRODUCTS" description="">
      <div className="font-custom2 text-custom-shade4">
        <div className="p-8">
          <Link className="" to="/admin/dashboard">
            <div className="w-max border border-custom-shade3 rounded-md flex items-center bg-white p-2 hover:bg-custom-shade3 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
                <p className="text-xs ml-2 font-semibold">ADMIN HOME</p>
            </div>
          </Link>
        </div>
        {/*<div className="row">
          <div className="col-12">
            {products.map((product, index) => {
              return (
                <div key={index} className="row text-center mb-2 ">
                  <div className="col-4">
                    <h3 className="text-dark text-left">{product.name}</h3>
                  </div>
                  <div className="col-4">
                    <Link
                      className="btn btn-success"
                      to={`/admin/product/update/${product._id}`}
                    >
                      <span className="">Update</span>
                    </Link>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={() => {
                        deleteThisProduct(product._id);
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          </div>*/}
        <div className="w-max mx-auto border-2 border-custom-shade2 rounded-lg bg-white">
          {products.map((product, index) => {
            return (
              <div className="grid grid-cols-3 p-3 gap-20 items-center">
                  <div className="mr-4">
                    <p className="font-semibold" key={index}>
                      {product.name}
                    </p>
                  </div>
                  <div className="">
                      <Link
                        className=""
                        to={`/admin/product/update/${product._id}`}
                      >
                        <div className="w-max text-sm btn">
                          UPDATE
                        </div>
                      </Link>
                  </div>
                  <div className="">
                    <button
                      onClick={() => {
                        deleteThisProduct(product._id);
                      }}
                      className="text-sm btn"
                    >
                      DELETE
                    </button>
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
