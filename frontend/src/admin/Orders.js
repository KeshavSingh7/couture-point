import { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllOrders } from "../core/helper/orderHelper";
import OrderComp from "./OrderComp";
import { Link } from "react-router-dom";

const Orders = () => {
  useEffect(() => {
    preload();
  }, []);
  const [data, setData] = useState([]);
  const preload = () => {
    const { user, token } = isAuthenticated();
    getAllOrders(user._id, token).then((data) => {
      data.sort(function (a, b) {
        return b.name - a.name;
      });
      console.log(data);
      setData(data);
    });
  };
  return (
    <Base title="ORDERS" description="">
      {/* <h1 className="">orders are working</h1> */}
      <div className="mb-6">
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
        {data.map((profile, index) => (
          <OrderComp key={index} profile={profile} />
        ))}
      </div>
    </Base>
  );
};
export default Orders;
