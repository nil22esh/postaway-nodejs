import mongoose from "mongoose";

const dbConnect = () => {
  mongoose
    .connect(process.env.DB_URL, { dbName: "Postaway" })
    .then(() => {
      console.log(`MongoDB Connected to Postaway Database!`.bgMagenta);
    })
    .catch((error) => {
      console.error(`Failed to connect to MongoDB: ${error.message}`.bgRed);
    });
};

export default dbConnect;
