import app from "./app";
import config from "./config";
import mongoose from "mongoose";

//server function
async function server() {
  try {
    await mongoose.connect(config.database_url!);

    console.log(`server connnected with mongodb`);


    // test 
    app.get("/", (req, res) => {
      res.send("Hello world");
    });

    //listening example
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

//SERVER function call
server();
