import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("DB is already connected");

    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "promptopia_share_prompts",
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("databse connected");
  } catch (error) {
    console.log("Error while connecting to the database: ", error);
  }
};
