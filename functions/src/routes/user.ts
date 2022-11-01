// PACKAGES
import * as express from "express";

// LOCAL IMPORTS
import {db, userCollection} from "../configs/firebase";
import {utils} from "../services/utils";


// MODELS
import {User} from "../models/User";

// eslint-disable-next-line
export const userRouter = express.Router();

userRouter.get("/test", async (req, res) => {
  utils.testConnection();
  res.status(200).send(utils.getGreeting("cat"));
});

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

    const newDoc = await db.collection(userCollection).add(user);
    res.status(201).send(`Created a new user: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send("input bad");
  }
});

// get all users
userRouter.get("/", async (req, res) => {
  try {
    const userQuerySnapshot = await db.collection(userCollection).get();
    const users: any[] = [];
    userQuerySnapshot.forEach(
        (doc)=>{
          users.push({
            id: doc.id,
            data: doc.data(),
          });
        }
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get a single contact
userRouter.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  db.collection(userCollection).doc(userId).get()
      .then((user) => {
        if (!user.exists) throw new Error("User not found");
        res.status(200).json({id: user.id, data: user.data()});
      })
      .catch((error) => res.status(500).send(error));
});

// Delete a user
userRouter.delete("/:userId", (req, res) => {
  db.collection(userCollection).doc(req.params.userId).delete()
      .then(()=>res.status(204).send("Document successfully deleted!"))
      .catch(function(error) {
        res.status(500).send(error);
      });
});

// Update user
userRouter.put("/:userId", async (req, res) => {
  await db.collection(userCollection)
      .doc(req.params.userId)
      .set(req.body, {merge: true})
      .then(()=> res.json({id: req.params.userId}))
      .catch((error)=> res.status(500).send(error));
});
