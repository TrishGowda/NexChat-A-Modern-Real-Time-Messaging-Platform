require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const users = [
  { username: "Pheebe", password: "123456" },
  { username: "KaviPriya", password: "123456" },
  { username: "Swetha", password: "123456" },
  { username: "Samyuktha", password: "123456" },
  { username: "Lawrance", password: "123456" },
  { username: "Puvitha", password: "123456" },
  { username: "Aadhish", password: "123456" },
  { username: "Preethi", password: "123456" },
  { username: "Gomigha", password: "123456" },
  { username: "Monisha", password: "123456" },
];

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");

    await User.deleteMany({});

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      await User.create({
        username: user.username,
        password: hashedPassword,
      });
    }

    console.log("🎉 10 Users Created Successfully");

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedUsers();