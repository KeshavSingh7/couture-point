const User = require("../models/user");
const Order = require("../models/order");
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "no user was found in the databasse",
      });
    }
    req.profile = user;
    next();
  });
};
exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

// exports.getAllUsers=(req,res)=>{
//   User.find().exec((err,users)=>{
//     if(err ||!users){
//       return res.status(400).json({
//         error:"no user found"
//       })
//     }
//     return res.json(users)

//   })
// }

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "you are not authorized to update the user",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      res.json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status().json({
          err: "No purchases found in this account",
        });
      }
      return res.json(order);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  console.log(req.body.order.products);
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.discription,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transactiion_id: req.body.order.transactiion_id,
    });
  });
  //storeingt data in data base\findOneAndUpdate()
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unabe to save the purchasee list",
        });
      }
    }
  );

  next();
};
