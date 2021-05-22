import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getUser } from "./helper/userapicalls";


const UserDashboard = () => {
  const { user, token } = isAuthenticated();


  const [values, setValues] = useState({

    name: "",
    email: "",

  });
  const { name, email, } = values;
  useEffect(() => {
    preload();
  })

  const preload = () => {
    getUser(user, token)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, id: data._id, name: data.name, email: data.email })
        }
      })
      .catch(e => console.log(e))
  }


  /*const UserLeftSide = () => {
    return (
      <div className="">
        <h4 className="">Navigation</h4>
        <ul className="">
          <li className="">
            
          </li>
        </ul>
      </div>
    );
  };*/

  const UserrightSide = () => {
    return (
      <div>
          <h4 className=" text-center text-lg font-semibold mb-4">USER INFO</h4>
          <div className="border border-custom-shade2 p-4">
            <div className="flex items-center mb-4">
              <p className="bg-custom-shade2 p-2 rounded-full text-xs font-bold">NAME : </p> 
              <p className="ml-2 font-medium">{name}</p>
            </div>
            <div className="flex items-center">
              <p className="bg-custom-shade2 p-2 rounded-full text-xs font-bold">EMAIL : </p>
              <p className="ml-2 font-medium">{email}</p>    
            </div>
          </div>
      </div>
    );
  };



  return (
    <Base title="USER DASHBOARD" className="">
      {/* //TODO: purchase List!  */}

      <div className="mx-auto max-w-lg text-custom-shade4 font-custom2 border border-custom-shade2">
        <div className="bg-custom-shade2 flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">WELCOME {name}</h1>
          <Link to="/user/update" className="">
            <div className="flex p-2 rounded-md border border-custom-shade3 hover:bg-custom-shade3 hover:text-white">
              <p className=" text-xs font-bold mr-2">EDIT PROFILE</p>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
              </svg>
            </div>
          </Link>
        </div>
        <div className="bg-white p-4">
          {UserrightSide()}
        </div>
        {/*<div className="col-md-3">{UserLeftSide()}</div>
        <div className="offset-1 col-md-8">{UserrightSide()}</div>*/}
      </div>
    </Base>
  );
};

export default UserDashboard;

