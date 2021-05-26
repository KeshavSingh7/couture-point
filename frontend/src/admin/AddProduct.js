import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, create_a_product } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { motion } from 'framer-motion'

const AddProduct = () => {
  const { user, token } = isAuthenticated();
  const [file, setFile] = useState(null); 

  const [values, setValues] = useState({
    name: "",
    discription: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: "",
    formData: "",
  });

  const {
    name,
    discription,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: "", loading: true });
    create_a_product(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          discription: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleUpload = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
    setFile(event.target.files[0]);
  };

  const successMessaasge = () => (
    <motion.div layout className="row">
        <div className="sm:offset-2 md:offset-3 lg:offset-4 xl:offset-4 sm:col-8 md:col-6 lg:col-5 xl:col-4">
          <div
            className="bg-custom-shade2 p-2 rounded-md flex justify-between mb-4"
            style={{ display: createdProduct ? "" : "none" }}
          >
            PODUCT CREATED SUCCESSFULLY
            <span className="cursor-pointer" onClick={(closeAlert)}>X</span>
          </div>
        </div>
      </motion.div>
  );

  const erorrMessage = () => {
    if (error) {
      return (<motion.div layout className="row">
      <div className="sm:offset-2 md:offset-3 lg:offset-4 xl:offset-4 sm:col-8 md:col-6 lg:col-5 xl:col-4">
        <div
          className="bg-custom-shade2 p-2 rounded-md flex justify-between mb-4"
          style={{ display: error ? "" : "none" }}
        >
          {error}
          <span className="cursor-pointer" onClick={(closeAlert)}>X</span>
        </div>
      </div>
    </motion.div>)
    }    
  };

  const closeAlert = (e) => {
    e.target.parentElement.style.display = "none";
  }

  const createProductForm = () => (
    <div className="w-max mx-auto p-4 border border-custom-shade4 rounded-lg bg-white">
      <div className="mb-6 flex flex-col items-center">
        <label htmlFor="upload" className="upload-img text-custom-shade3 mb-2">+</label>
        <input
          onChange={handleUpload("photo")}
          type="file"
          accept="image"
          placeholder="choose a file"
          className="hidden"
          id="upload"
        />
        {file && <p className="text-sm">{file.name}</p>}
      </div>
      <div className="mb-4 grid grid-cols-2 xs:flex xs:flex-col">
        <label htmlFor="nm" className="text-sm font-semibold p-1 mr-4">NAME : </label>
        <input
          onChange={handleChange("name")}
          className="border border-custom-shade3 rounded-md p-1 outline-none"
          id="nm"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="grid grid-cols-2 xs:flex xs:flex-col mb-4">
        <label htmlFor="desc" className="text-sm font-semibold p-1 mr-4">DESCRIPTION : </label>
        <textarea
          id="desc"
          onChange={handleChange("discription")}
          className="no-scrollbar border border-custom-shade3 rounded-md p-1 outline-none"
          placeholder="description"
          value={discription}
        />
      </div>
      <div className="mb-4 grid grid-cols-2 xs:flex xs:flex-col">
        <label htmlFor="price" className="text-sm font-semibold p-1 mr-4">PRICE : </label>
        <input
          id="price"
          onChange={handleChange("price")}
          type="number"
          className="border border-custom-shade3 rounded-md p-1 outline-none"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="grid grid-cols-2 xs:flex xs:flex-col mb-4">
        <label htmlFor="category" className="text-sm font-semibold p-1 mr-4">CATEGORY : </label>
        <select
          id="category"
          onChange={handleChange("category")}
          className="border border-custom-shade3 rounded-md p-1 outline-none"
          placeholder="Category"
        >
          <option>N/A</option>
          {categories &&
            categories.map((cate, index) => {
              return (
                <option key={index} value={cate._id}>
                  {cate.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="grid grid-cols-2 xs:flex xs:flex-col mb-6">
        <label htmlFor="quantity" className="text-sm font-semibold p-1 mr-4">QUANTITY : </label>
        <input
          id="quantity"
          onChange={handleChange("stock")}
          type="number"
          className="border border-custom-shade3 rounded-md p-1 outline-none"
          placeholder="Quantity"
          value={stock}
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          onClick={onSubmit}
          className="btn"
          >
          CREATE PRODUCT
        </button>
      </div>
    </div>
  );

  return (
    <Base
      title="ADD PRODUCT"
      discription=""
    >
      <div className="font-custom2">
        <div className="mb-4">
          <Link className="" to="/admin/dashboard">
            <div className="w-max border border-custom-shade3 rounded-md flex items-center bg-white p-2 hover:bg-custom-shade3 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
                <p className="text-xs ml-2 font-semibold">ADMIN HOME</p>
            </div>
          </Link>
        </div>
        <div className="">
            {successMessaasge()}
            {erorrMessage()}
          <div className="">
            {createProductForm()}
          </div>
        </div>
      </div>
    </Base>
  );
};
export default AddProduct;
