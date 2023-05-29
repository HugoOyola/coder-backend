import mongoose from "mongoose";

const url = "mongodb+srv://hugo29h:eN8xNDCYsEwjkaDL@e-commerce.vh8g3ls.mongodb.net/ecommerce?retryWrites=true&w=majority";
const connectToDB = () => {
  try {
    mongoose.connect(url);
    console.log("Conexion a BD E-commerce");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
