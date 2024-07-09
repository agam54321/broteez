const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose.set('debug', true); // Enable mongoose debugging

mongoose
  .connect("mongodb+srv://agammunet0:agamM@cluster0.ldnwukr.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 10000
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

const User = require("./models/user");
const Order = require("./models/order");

// Function to send verification email to the user
const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "broteezhelp@gmail.com",
      pass: "oghxoujnkzoaimts"
    }
  });

  //compose the mail
  const mailOptions = {
    from: "broteez.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify the email: http://192.168.0.123:8000/verify/${verificationToken}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", email);
  } catch (error) {
    console.log("Error sending verification email", error);
  }
}

// Endpoint to register in app
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Received registration request for:", email);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered:", email);
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    await newUser.save();
    console.log("New user saved:", newUser);

    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(200).json({ message: "Registration successful, please check your email to verify" });
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({ message: "Registration Failed" });
  }
});

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    console.log("Received verification request with token:", token);

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      console.log("Invalid verification token:", token);
      return res.status(404).json({ message: "Invalid verification token" });
    }

    user.verified = true;
    user.verificationToken = undefined;

    await user.save();
    console.log("User verified:", user.email);

    res.status(200).json({ message: "Email Verification successful" });
  } catch (error) {
    console.log("Error verifying email", error);
    res.status(500).json({ message: "Email Verification failed" });
  }
});

