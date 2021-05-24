import Base from "../core/Base";

import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();
  const adminLeftSide = () => {
    return (
      <div className="">
        <div className="p-4 bg-custom-shade3">
          <p className="text-center text-xl font-medium text-white">NAVIGATION</p>
        </div>
        <div className="p-4 xs:flex flex-col justify-center">
          <div className="p-1 mx-auto">
            <Link to="/admin/create/category" className="text-xs font-semibold">
              CREATE CATEGORIES
            </Link>
          </div>
          <div className="p-1 mx-auto">
            <Link to="/admin/categories" className="text-xs font-semibold">
              MANAGE CATEGORIES
            </Link>
          </div>
          <div className="p-1 mx-auto">
            <Link to="/admin/create/products" className="text-xs font-semibold">
              CREATE PRODUCT
            </Link>
          </div>
          <div className="p-1 mx-auto">
            <Link to="/admin/products" className="text-xs font-semibold">
              MANAGE PRODUCTS
            </Link>
          </div>
          <div className="p-1 mx-auto">
            <Link to="/admin/orders" className="text-xs font-semibold">
              MANAGE ORDERS
            </Link>
          </div>
        </div>
      </div>
    );
  };
  const adminrightSide = () => {
    return (
      <div className="p-8">
        <div className="font-bold text-xl text-center">ADMIN INFO</div>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <p className="bg-custom-shade2 p-2 rounded-full text-sm font-bold">NAME :</p>
            <p className="ml-2 font-medium text-lg">{name}</p>
          </div>
          <div className="flex items-center">
            <p className="bg-custom-shade2 p-2 rounded-full text-sm font-bold">EMAIL :</p>
            <p className="ml-2 font-medium text-lg">{email}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base
      title="ADMIN DASHBOARD"
      description=""
      className=""
    >
      <div className="font-custom2 sm:flex mx-auto w-max sm:border border-custom-shade3 text-custom-shade4 sm:rounded-lg overflow-hidden">
        <div className="sm:border-r border-custom-shade3 bg-custom-shade2 xs:mb-8 xs:rounded-lg overflow-hidden">{adminLeftSide()}</div>
        <div className="sm:border-l border-custom-shade3 bg-white xs:rounded-lg">{adminrightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
