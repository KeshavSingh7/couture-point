import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { UpdateCategory, getCategory } from "./helper/adminapicall";
import { useEffect } from "react";

const UpdateCategoory = ({ match }) => {
  const [name, setName] = useState("");

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const { user, token } = isAuthenticated();
  const goBack = () => (
    <div className="bg-custom-shade2 p-2 sm:p-4 flex justify-center">
      <Link className="" to="/admin/dashboard">
        <div className="w-max border border-custom-shade3 rounded-md flex items-center bg-white p-2 hover:bg-custom-shade3 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
            <p className="text-xs ml-2 font-semibold">BACK TO ADMIN DASHBOARD</p>
        </div>
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    // backend req fired

    UpdateCategory(match.params.categoryId, user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeAlert = (e) => {
    setSuccess(false);
    setError(false);
  }

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">category created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-danger">{error}</h4>;
    }
  };

  const myCategoryForm = () => (
    <div className="p-4 sm:p-8 bg-white">
      <div className="flex xs:flex-col items-center mb-6">
        <label htmlFor="cat" className="p-1 mr-4 text-sm font-semibold">ENTER CATEGORY</label>
        <input
          type="text"
          id="cat"
          className="p-1 outline-none border border-custom-shade3 rounded-md"
          autoFocus
          required
          value={name}
          onChange={handleChange}
          placeholder="ex. summer"
        />
      </div>
      <div className="text-center">
        <button onClick={onSubmit} className="btn text-sm">
          UPDATE CATEGORY
        </button>
      </div>
    </div>
  );

  return (
    <Base
      title="UPDATE CATEGORY"
      description=""
      className="container bg-info p-4"
    >
      <div className="w-max mx-auto items-center">
        {(success || error) && <div className="bg-custom-shade2 p-2 rounded-md flex justify-between mb-4">
          {success && successMessage()}
          {error && warningMessage()}
          <span className="cursor-pointer ml-8 p-1" onClick={(closeAlert)}>X</span>
        </div>}
      </div>
      <div className="w-max mx-auto rounded-lg overflow-hidden border-2 border-custom-shade2">
          {goBack()}
          {myCategoryForm()}
      </div>
    </Base>
  );
};

export default UpdateCategoory;
