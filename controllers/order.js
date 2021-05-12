const { Order, ProductCart } = require("../models/order");
const order = require("../models/order");
const user = require("../models/user");
exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "no order found in db",
        });
      }
      req.order = order;
      next();
    });
};
exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "failed to save data in DB",
      });
    }

    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  user
    .find()
    .populate("user", "_id name")
    .exec((err, o) => {
      if (err) {
        return res.status(400).json({
          error: "No orders found in the database",
        });
      }
      for (var i = 0; i < o.length; i++) {
        o[i].salt = undefined;
        o[i].encry_password = undefined;
        o[i].createdAt = undefined;
        o[i].updatedAt = undefined;
      }
      return res.json(o);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "cannnot update order status",
        });
      }
      res.json(order);
    }
  );
};
