import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"

const app = express()

dotenv.config()

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to MONGO DB");
  } catch (error) {
    throw error;
  }
}

mongoose.connection.on('disconnected', () => {
  console.log("DB Disconnected!!!")
})

mongoose.connection.on('connected', () => {
  console.log("DB Connected!!!")
})

//middlewares

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);


app.listen(8800, async () => {
  await connect();
  console.log("connected to server");
})