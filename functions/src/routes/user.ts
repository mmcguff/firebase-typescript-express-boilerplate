// PACKAGES
import * as express from "express";
import {dbService} from "../services/db";

// MODELS
import {User} from "../models/User";

// eslint-disable-next-line
export const userRouter = express.Router();

// Create new user
userRouter.post("/", async (req, res) => {
  try {
    const user: User = {
      firstName: req.body["firstName"],
      lastName: req.body["lastName"],
      email: req.body["email"],
      areaNumber: req.body["areaNumber"],
      department: req.body["department"],
      id: req.body["id"],
      contactNumber: req.body["contactNumber"],
    };
    await dbService.createOrUpdate("users", user.id, user, true);
    res.status(201).send(dbService._sortObject(user));
  } catch (error) {
    res.status(400).send("input bad");
  }
});

// get all users
userRouter.get("/", async (req, res) => {
  try {
    const users = await dbService.readAllDocuments("users");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get a single contact
userRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await dbService.readDocument("users", userId);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a user
userRouter.delete("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    await dbService.deleteDocument("users", userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

