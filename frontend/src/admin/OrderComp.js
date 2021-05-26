import React from "react";

const OrderComp = ({ profile }) => {
  console.log(profile.purchases.length);
  if(profile.purchases.length > 0) {
    return (
      <div className="border-2 border-custom-shade2 rounded-lg mb-4 overflow-hidden">
        <div className="bg-custom-shade2 p-2 uppercase font-bold text-xl">{profile.name}</div>
        <div className="bg-white p-4">
          {profile?.purchases.map((products, index) => (
            <li key={index}>{products.name}</li>
          ))}
        </div>
      </div>
    );
  }
  else {
    return (<></>)
  }
};

export default OrderComp;
