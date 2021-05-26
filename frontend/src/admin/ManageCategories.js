import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getCategories, deleteCategory } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories(token).then((data) => {
      if (data.error) {
        console.log(data?.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data?.error) {
        console.log(data?.error);
      } else {
        preload();
      }
    });
  };
  return (
    <Base title="PRODUCT CATEGORIES" description="">
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
        <div className="w-max mx-auto border-2 border-custom-shade2 rounded-lg bg-white">
          {categories.map((category, index) => {
            return (
              <div className="grid grid-cols-3 p-3 gap-20 items-center">
                  <div className="mr-4">
                    <p className="font-semibold" key={index}>
                      {category.name}
                    </p>
                  </div>
                  <div className="">
                      <Link
                        className=""
                        to={`/admin/category/update/${category._id}`}
                      >
                        <div className="text-sm btn">
                          UPDATE
                        </div>
                      </Link>
                  </div>
                  <div className="">
                    <button
                      onClick={() => {
                        deleteThisCategory(category._id);
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
export default ManageCategories;
