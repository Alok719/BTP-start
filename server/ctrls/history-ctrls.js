import mongoose from "mongoose";
import { History } from "../models.js";

export const get_history = async (req, res) => {
  try {
    // identify user
    const user = req.user;
    // check if user exists
    if (!user) {
      res.status(401);
      throw new Error("unauthorized");
    } else {
      // get histories
      const query = JSON.parse(req.query.query) || {};
      // check if _id is present and convert it to ObjectId
      if (typeof query._id === "string")
        query._id = new mongoose.Types.ObjectId(query._id);
      else if (typeof query._id === "object")
        Object.keys(query._id).forEach(
          (key) =>
            (query._id[key] = query._id[key].map(
              (_id) => new mongoose.Types.ObjectId(_id)
            ))
        );
      const histories = await History.find(query);
      res.status(200).send({ data: histories, message: "histories found" });
    }
  } catch (err) {
    if (res.statusCode < 400) res.status(500);
    res.send({ message: err.message || "something went wrong" });
  }
};

export const new_history = async (req, res) => {
  try {
    // identify user
    const user = req.user;
    if (!user) {
      res.status(401);
      throw new Error("unauthorized");
    } else {
      // create history
      const data = req.body;
      const result = await new History(data).save({ new: true });
      // check if history created
      if (!result) {
        res.status(403);
        throw new Error("history not created");
      } else {
        res.status(201).send({ data: result, message: "history created" });
      }
    }
  } catch (err) {
    if (res.statusCode < 400) res.status(500);
    res.send({ message: err.message || "something went wrong" });
  }
};

export const edit_history = async (req, res) => {
  try {
    // identify user
    const user = req.user;
    // check if user exists
    if (!user) {
      res.status(401);
      throw new Error("unauthorized");
    } else {
      // update histories
      const { query, edits } = req.body;
      if (query) {
        // check if _id is present and convert it to ObjectId
        if (typeof query._id === "string")
          query._id = new mongoose.Types.ObjectId(query._id);
        else if (typeof query._id === "object")
          Object.keys(query._id).forEach(
            (key) =>
              (query._id[key] = query._id[key].map(
                (_id) => new mongoose.Types.ObjectId(_id)
              ))
          );
        const result = await History.updateMany(query, edits, { new: true });
        // check if history updated
        if (!result) {
          res.status(404);
          throw new Error("history not found");
        } else {
          const history = await History.findById(query._id);
          res
            .status(201)
            .send({ data: result, message: "history updated", history });
        }
      } else {
        res.status(404);
        throw new Error("history not found");
      }
    }
  } catch (err) {
    if (res.statusCode < 400) res.status(500);
    res.send({ message: err.message || "something went wrong" });
  }
};

export const delete_history = async (req, res) => {
  try {
    // identify user
    const user = req.user;
    // check if user exists
    if (!user) {
      res.status(401);
      throw new Error("unauthorized");
    } else {
      // delete histories
      const { query } = req.body;
      if (query) {
        // check if _id is present and convert it to ObjectId
        if (typeof query._id === "string")
          query._id = new mongoose.Types.ObjectId(query._id);
        else if (typeof query._id === "object")
          Object.keys(query._id).forEach(
            (key) =>
              (query._id[key] = query._id[key].map(
                (_id) => new mongoose.Types.ObjectId(_id)
              ))
          );
        const result = await History.deleteMany(query);
        // check if history deleted
        if (!result) {
          res.status(404);
          throw new Error("history not found");
        } else {
          res.status(202).send({ data: result, message: "history deleted" });
        }
      } else {
        res.status(404);
        throw new Error("history not found");
      }
    }
  } catch (err) {
    if (res.statusCode < 400) res.status(500);
    res.send({ message: err.message || "something went wrong" });
  }
};
