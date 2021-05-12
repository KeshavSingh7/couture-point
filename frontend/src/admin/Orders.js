import { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllOrders } from "../core/helper/orderHelper";
import OrderComp from "./OrderComp";

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
    <Base title="Orders" description="managemnt orders">
      {/* <h1 className="">orders are working</h1> */}
      <div>
        {data.map((profile, index) => (
          <OrderComp key={index} profile={profile} />
        ))}
      </div>
    </Base>
  );
};
export default Orders;
