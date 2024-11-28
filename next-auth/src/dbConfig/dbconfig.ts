import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    
 
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    connection.on("error", (err) => {
      console.log("MongoDB connection error", err);
      process.exit();
    });

  } catch (error) {
    console.log(error);
  }
}

export default connectToDB;

