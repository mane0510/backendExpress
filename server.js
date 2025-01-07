const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const newuser = require("./models/newuser"); // Ensure the model is correctly defined in this file

const MyApp = express();
const port = 5001;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

MyApp.use(express.json());
MyApp.use(cors());


MyApp.post("/postNewUser", async (req, res) => {
  try {
    const { firstName, middleName, lastName, age } = req.body;

    if (!firstName || !lastName || !age) {
      return res
        .status(400)
        .send({ message: "First name, last name, and age are required." });
    }

    const newUserDocument = new newuser({ firstName, middleName, lastName, age });
    const savedUser = await newUserDocument.save();

    res.status(201).send({
      message: "New User Created Successfully!",
      newUser: savedUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

// Start the server
MyApp.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
