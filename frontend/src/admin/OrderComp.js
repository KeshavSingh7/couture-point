import React from "react";

const OrderComp = ({ profile }) => {
  return (
    <div>
      <div className="bg-white">{profile.name}</div>
      <div>
        {profile?.purchases.map((products, index) => (
          <li key={index}>{products.name}</li>
        ))}
      </div>
    </div>
  );
};

export default OrderComp;
