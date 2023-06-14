const express = require("express");
const ShoppingCartModule = require("../models/ShoppingCart.js");
const ShoppingCartRouter = express.Router();
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

ShoppingCartRouter.post("/create", async (req, res) => {
  const item = req.body;
  const exist = await ShoppingCartModule.findOne({ id: item.id, selectedColor: item.selectedColor, selectedStorage: item.selectedStorage });

  if (exist) {
    const update = await ShoppingCartModule.findOneAndUpdate(
      { id: item.id },
      { $set: { quantity: exist.quantity + item.quantity } },
      { new: true }
    );
    
    return 
  }

  const resItem = ShoppingCartModule({ ...item });
  await resItem.save();
  res.json(resItem);

});

ShoppingCartRouter.get("/get/:userID", async (req, res) => {
  const { userID } = req.params;
  const response = await ShoppingCartModule.find({ userOwner: userID });
  response ? res.json(response) : res.json([])
});

ShoppingCartRouter.post("/delete", async ( req, res ) => {
  const { id, selectedColor, selectedStorage } = req.body;

  await ShoppingCartModule.deleteOne({ id: id , selectedColor: selectedColor, selectedStorage } )

  res.json("Successful")


})

ShoppingCartRouter.post("/changeQuantity", async ( req, res ) => {
  const { id, selectedColor, selectedStorage, type } = req.body;

  if (type === "Increase") {
     try {
        await ShoppingCartModule.findOneAndUpdate(
        { id, selectedColor, selectedStorage },
        { $inc: { quantity: 1 } }
      );
        res.json({ message: "Successful" });
     } catch (err) {
      console.log(err)
     }
  } else {
         try {
           await ShoppingCartModule.findOneAndUpdate(
             { id, selectedColor, selectedStorage },
             { $inc: { quantity: -1 } }
           );
           res.json({ message: "Successful"})
         } catch (err) {
           console.log(err);
         }
  }




})

module.exports = ShoppingCartRouter;
