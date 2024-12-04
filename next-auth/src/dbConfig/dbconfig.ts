import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    
 
    await mongoose.connect(process.env.MONGODB_URI!);
    
   

  } catch (error) {
    console.log(error);
  }
}

export default connectToDB;

